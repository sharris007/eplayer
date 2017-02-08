import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Viewer } from '@pearson-incubator/viewer';
import find from 'lodash/find';
import WidgetManager from '../../../components/widget-integration/widgetManager';
import Header from '../../../components/Header';
import { BookList } from '../../../../const/MockData';
import { booksdata, pageDetails, tocData } from '../../../../const/Mocdata';

import './Book.scss';

import { PageViewer } from '@pearson-incubator/pxe-pageviewer'
import { Annotation } from '@pearson-incubator/pxe-annotation'
import { getAnnCallService, postAnnCallService, deleteAnnCallService } from '../../../actions/annotation'

export class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classname: 'headerBar',
      viewerContent: true,
      currentPageDetails: "",
      pageDetails:pageDetails
    };
    this.onPageChange.bind(this);
    this.nodesToUnMount = [];
    document.body.addEventListener('contentLoaded', this.parseDom);
    document.body.addEventListener('navChanged', this.navChanged);

  }

  componentDidMount() {
    const bookImageAndTitle = find(this.context.store.getState().bookshelf
      .books.data.bookshelf, bookshelf => bookshelf.manifestId === this.props.params.bookId);
    const tocImageAndTitle = {
      image: bookImageAndTitle ? bookImageAndTitle.thumbnail.src : '',
      title: bookImageAndTitle ? bookImageAndTitle.title : '',
      author: bookImageAndTitle ? bookImageAndTitle.author : ''
    };
    if (this.props.params.pageId) {
      this.props.fetchTocAndViewer(this.props.params.bookId, tocImageAndTitle, this.props.params.pageId);
    } else {
      this.props.fetchTocAndViewer(this.props.params.bookId, tocImageAndTitle);
    }
    this.props.fetchAnnotations(this.props.params.bookId);
    this.props.fetchBookmarks(this.props.params.bookId);
    this.props.fetchPreferences();

    this.setState({
      currentPageDetails : this.state.pageDetails.urlsJson.playList[0]
    });

    let pageUrl = this.state.currentPageDetails.playOrder;
    this.props.dispatch(getAnnCallService(1));
  }

  componentWillUnmount() {
    WidgetManager.navChanged(this.nodesToUnMount);
  }

  parseDom = () => {
    WidgetManager.loadComponents(this.nodesToUnMount, this.context);
  };

  navChanged = () => {
    WidgetManager.navChanged(this.nodesToUnMount);
    this.nodesToUnMount = [];
    WidgetManager.loadComponents(this.nodesToUnMount, this.context);
  }

  removeAnnotationHandler = (annotationId) => {
    // TODO: Should not need to look up currentPageId manually; bookmark-component should have currentPageId
    // to be used in its removeBookmarkHandler call
    const currentPageId = this.props.book.viewer.currentPageId;
    const targetAnnotation = find(this.props.book.annotations, annotation => annotation.pageId === currentPageId);
    const targetAnnotationId = annotationId || targetAnnotation.id;
    this.props.removeAnnotation(this.props.params.bookId, targetAnnotationId);
  };

  addBookmarkHandler = () => {
    const currentPageId = this.props.book.viewer.currentPageId;
    const targetPage = find(this.props.book.viewer.pages, pages => pages.id === currentPageId);
    const bookmark = {
      jsonData: {
        uri: currentPageId,
        data: {
          //eslint-disable-next-line
          baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'
        },
        title: targetPage.title,
        labels: [targetPage.title]
      },
      createdBy: 'cite_qauser1'
    };
    this.props.addBookmark(this.props.params.bookId, bookmark);
  }

  removeBookmarkHandler = (bookmarkId) => {
    // TODO: Should not need to look up currentPageId manually; bookmark-component should have currentPageId
    // to be used in its removeBookmarkHandler call
    const currentPageId = this.props.book.viewer.currentPageId;
    const targetBookmark = find(this.props.book.bookmarks, bookmark => bookmark.uri === currentPageId);
    const targetBookmarkId = bookmarkId || targetBookmark.id;
    this.props.removeBookmark(this.props.params.bookId, targetBookmarkId);
  };

  onPageChange = (type,data) => {
    this.setState({
      currentPageDetails :data
    });
    let pageId = data.playOrder;
    console.log("currentPage url" , pageId);
    this.props.dispatch(getAnnCallService(pageId));    
  }

  isCurrentPageBookmarked = () => {
    const currentPageId = this.props.book.viewer.currentPageId;
    const targetBookmark = find(this.props.book.bookmarks, bookmark => bookmark.uri === currentPageId);
    return !(targetBookmark === undefined);
  };

  goToPageCallback = (pageId) => {
    let playListData={
      urlsJson:pageDetails.urlsJson,
      currentPlayList:{
        'href': 'OPS/s9ml/chapter01/filep7000495777000000000000000000752.xhtml',
        'playOrder': pageId,
        'title': '1.2 Hypothesis Testing'
      }
    };
    this.setState({
      pageDetails :playListData
    });
  };

  viewerContentCallBack = (viewerCallBack) => {
    this.setState({ viewerContent: viewerCallBack });
  }

  annotationCallBack = (eventType, data, viewer) => {
    console.log("data stack" , eventType)
    switch (eventType){
      case 'annotationCreated':{
        return  this.props.dispatch(postAnnCallService(data));
      }
      case 'annotationDeleted':{
        return this.props.dispatch(deleteAnnCallService(data));
      }
      default :{
        return eventType;
      }
    } 
  }

  render() {
    const callbacks = {};
    const {annotionData,loading} = this.props ;
    callbacks.removeAnnotationHandler = this.removeAnnotationHandler;
    callbacks.addBookmarkHandler = this.addBookmarkHandler;
    callbacks.removeBookmarkHandler = this.removeBookmarkHandler;
    callbacks.isCurrentPageBookmarked = this.isCurrentPageBookmarked;
    callbacks.goToPageCallback = this.goToPageCallback;
    //this.props.book.toc.content = {};
    //this.props.book.toc.content.list = tocData;
   
    return (
      <div>
        <Header
          classname={this.state.classname}
          bookData={this.props.book}
          bookCallbacks={callbacks}
          store={this.context.store}
          viewerContentCallBack={this.viewerContentCallBack}
        />
        { !this.props.book.isFetching.viewer &&
          this.props.book.viewer.pages &&
          this.props.book.viewer.pages.length > 0 &&
          <div className={this.state.viewerContent ? 'viewerContent' : 'fixedviewerContent'} id = "pxe-viewer">
            <PageViewer src={this.state.pageDetails.urlsJson}  sendPageDetails={this.onPageChange} currentPlayList = {this.state.pageDetails.currentPlayList} />  
            {loading?<Annotation annotationData = {annotionData} contentId="pxe-viewer" annotationEventHandler = {this.annotationCallBack.bind(this)} currentPageDetails ={this.state.currentPageDetails} /> :""}        
          </div>
        
        }
      </div>
    );
  }
}



Book.propTypes = {
  fetchTocAndViewer: React.PropTypes.func,
  fetchAnnotations: React.PropTypes.func,
  removeAnnotation: React.PropTypes.func,
  fetchBookmarks: React.PropTypes.func,
  addBookmark: React.PropTypes.func,
  removeBookmark: React.PropTypes.func,
  fetchPreferences: React.PropTypes.func,
  goToPage: React.PropTypes.func,
  book: React.PropTypes.object,
  params: React.PropTypes.object
};

Book.contextTypes = {
  store: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { annotionData: state.annotationReducer.data, loading: state.annotationReducer.loading}
}
Book = connect(mapStateToProps )(Book)
export default Book;