  /* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import WidgetManager from '../../../components/widget-integration/widgetManager';
import Header from '../../../components/Header';
import { pageDetails , customAttributes } from '../../../../const/Mockdata'; 
import './Book.scss';
import { browserHistory } from 'react-router';
import { getTotalAnnCallService, getAnnCallService, postAnnCallService, putAnnCallService,deleteAnnCallService, getTotalAnnotationData, deleteAnnotationData, annStructureChange } from '../../../actions/annotation';
import { getBookCallService, getPlaylistCallService, getCourseCallService} from '../../../actions/playlist';
import { getGotoPageCall } from '../../../actions/gotopage';

import { getBookmarkCallService ,postBookmarkCallService ,deleteBookmarkCallService,getTotalBookmarkCallService } from '../../../actions/bookmark';
import { PxePlayer } from 'pxe-player';
import { Annotation } from 'pxe-annotation';
import { Wrapper } from 'pxe-wrapper';
import { PopUpInfo } from '@pearson-incubator/popup-info';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {resources , domain ,typeConstants} from '../../../../const/Settings'
import Cookies from 'universal-cookie';

export class Book extends Component {
  constructor(props) {
      super(props);
      let redirectCourseUrl   = window.location.href;
      redirectCourseUrl       = decodeURIComponent(redirectCourseUrl).replace(/\s/g, "+").replace(/%20/g, "+");
      piSession.getToken(function(result, userToken){
        if(result === 'unknown' || result === 'notoken' ){
            if(window.location.pathname.indexOf('/eplayer/ETbook/')>-1){
              browserHistory.push('/eplayer/pilogin');
            }else if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
              piSession.login(redirectCourseUrl, 10);
            }
          }
      }); 
      this.state = {
        classname: 'headerBar',
        viewerContent: true,
        drawerOpen: true,
        currentPageDetails: '',
        pageDetails, 
        currentPageTitle:'',
        popUpCollection:'',
        urlParams:{
          context :this.props.params.bookId,
          user:''
        },
        annAttributes:customAttributes,
        goToTextVal:'',
        isPanelOpen:false
      };
      this.divGlossaryRef = '';
      this.wrapper = '';
      this.nodesToUnMount = [];  
      this.bookIndexId = {};
      this.searchUrl = '';
      document.body.addEventListener('contentLoaded', this.parseDom);
      document.body.addEventListener('navChanged', this.navChanged);
      this.state.pageDetails.currentPageURL = '';
      if(piSession){
        const userId = piSession.userId();
        this.state.urlParams.user = userId;
      }
       
  }
  componentWillMount  = () => {
    setTimeout( () => {
    // deeper code
      const cookies = new Cookies();
      let redirectCourseUrl   = window.location.href;
      redirectCourseUrl       = decodeURIComponent(redirectCourseUrl).replace(/\s/g, "+").replace(/%20/g, "+");
      piSession.getToken(function(result, userToken){
          if(result === piSession['Success']){
            const tokenCheck = localStorage.getItem('secureToken');
            if(!tokenCheck){
              localStorage.setItem('secureToken',userToken);
            }
          }
      }); 
      const getSecureToken = localStorage.getItem('secureToken');
      const bookDetailsData = {
        context : this.state.urlParams.context,
        piToken : getSecureToken,
        bookId  : this.props.params.bookId
      }
      this.props.dispatch(getTotalBookmarkCallService(this.state.urlParams));
       if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
          bookDetailsData.courseId = this.props.params.bookId;
          this.props.dispatch(getCourseCallService(bookDetailsData));
           
       }else{
          this.props.dispatch(getBookCallService(bookDetailsData));
       }
      this.props.dispatch(getTotalAnnCallService(this.state.urlParams));
  }, 2000);
    
  }
  componentWillUnmount() {
    WidgetManager.navChanged(this.nodesToUnMount);
    this.props.dispatch({type: "CLEAR_PLAYLIST"});
    this.props.dispatch({type: "CLEAR_ANNOTATIONS"});
    this.props.dispatch({type: "CLEAR_BOOKMARKS"});
    this.props.dispatch({type: "CLEAR_SEARCH"});
    delete this.state.pageDetails.searchText;
    this.setState({pageDetails : this.state.pageDetails});
  }
  componentDidMount() {    
   let pageDetails = this.state.pageDetails;
   if(localStorage.getItem('bookId'+this.props.params.bookId)) {
     let getStorageObj = localStorage.getItem('bookId'+this.props.params.bookId);
     pageDetails.pageFontSize =  parseInt(getStorageObj.split("/")[0]);
     pageDetails.bgColor = getStorageObj.split("/")[1];     
   }
   else{
     pageDetails.pageFontSize =  '50%';
     pageDetails.bgColor = 'White';
   }
   this.setState({pageDetails : pageDetails});
 }
  parseDom = () => {
    WidgetManager.loadComponents(this.nodesToUnMount, this.context);
  };
  componentWillReceiveProps(nextProps){
    const playlistData = nextProps.playlistData;
    const pageParameters = this.state.pageDetails;
    if(nextProps.playlistReceived){
       const filteredData = find(playlistData.content, list => list.id === nextProps.params.pageId);
          pageParameters.baseUrl                = playlistData.baseUrl;
        if(pageParameters.currentPageURL === ""){
          pageParameters.currentPageURL =(playlistData.content[0].playOrder==0)?playlistData.content[1]:playlistData.content[0];
        }
        pageParameters.playListURL            = playlistData.content; 
        if(nextProps.params.pageId){
           pageParameters.currentPageURL        =filteredData;
        }

    }
    if(typeof nextProps.tocData === "object" && nextProps.tocData && nextProps.tocData.bookDetails && nextProps.tocData.bookDetails.indexId ) {
      this.bookIndexId = nextProps.tocData.bookDetails.indexId;
      this.searchUrl = resources.links.etextSearchUrl[domain.getEnvType()]+'/search?indexId='+this.bookIndexId+'&q=searchText&s=0&n='+resources.constants.TextSearchLimit;
    } 
    if(nextProps.isGoToPageRecived ){
      if(nextProps.gotoPageObj.page && nextProps.gotoPageObj.page.href){
          const goToHref = nextProps.gotoPageObj.page.href.split('#')[0]; 
          let gotoPageData  = '';   
          const playpageDetails1  = this.state.pageDetails ; 
          const currentData = find(pageParameters.playListURL, list =>{
            if(list.href && list.href.match(goToHref)) {
                  gotoPageData = list;
                  gotoPageData.pageFragmentId = nextProps.gotoPageObj.page.href.split('#')[1];
               }   
          });   
          playpageDetails1.currentPageURL =  gotoPageData;
          playpageDetails1.tocUpdated  = true;
          this.onPageChange("pagescroll",nextProps.gotoPageObj.page.title); 
          if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
            browserHistory.replace('/eplayer/Course/${this.props.params.bookId}/page/${gotoPageData.id}');
          }else{
            browserHistory.replace('/eplayer/ETbook/${this.props.params.bookId}/page/${gotoPageData.id}');
          }
          this.props.dispatch({
            type: "GOT_GOTOPAGE",
            data: [],
            isGoToPageRecived: false
          });
        }
      }
  }
  navChanged = () => {
    WidgetManager.navChanged(this.nodesToUnMount);
    this.nodesToUnMount = [];
    WidgetManager.loadComponents(this.nodesToUnMount, this.context);
  }

  removeAnnotationHandler = (annotationId) => {
    const deleteAnnData = $.extend(this.state.urlParams,{annId:annotationId});
    this.props.dispatch(deleteAnnCallService(deleteAnnData));

    const currentPageAnnLength =  $('*[data-ann-id='+annotationId+']').length;
    if(currentPageAnnLength>0){
      $('*[data-ann-id='+annotationId+']').removeAttr('style');
      const handleAnn = $('*[data-ann-id='+annotationId+']').find('.annotator-handle');
      if(handleAnn.length>0){
        handleAnn.remove();
      }
    }
  };

  addBookmarkHandler = () => {
    const bMarkData = this.state;
    const bookmark = {
        uri: bMarkData.urlParams.id,
        data: {
          baseUrl: bMarkData.pageDetails.baseUrl
        },
        title: bMarkData.currentPageTitle,
        labels:[bMarkData.currentPageTitle],
        context:bMarkData.urlParams.context,
        user:bMarkData.urlParams.user
    };
    this.props.dispatch(postBookmarkCallService(bookmark));    
  }

  removeBookmarkHandler = (bookmarkId) => {
    this.state.urlParams.uri = (bookmarkId ? bookmarkId : this.state.currentPageDetails.id);
    this.forceUpdate();
    this.props.dispatch(deleteBookmarkCallService(this.state.urlParams));
  };

  onPageChange = (type, data) => {

    switch(type){
      case 'continue':{
        if(data){
          this.setState({isPanelOpen:true},()=>{
              const pageDetails={...this.state.pageDetails};
              pageDetails.currentPageURL=data;
              this.props.dispatch({
                type: 'CREATE_MULTIPANEL_BOOTSTRAP_PARAMS',
                data: {pageDetails:pageDetails,urlParams:this.state.urlParams}
              });
              browserHistory.replace(`/eplayer/MultiTaskPanel`);
              // window.open(`/eplayer/MultiTaskPanel`, 'panel');
              // window.open(`http://localhost:3000/eplayer/ETbook/1Q98UHDD1E1/page/${data.id}`,'panel');
          });
        }
        break;
      }
      case typeConstants.ANNOTATION_CREATED:{
         const annList = annStructureChange([data]);
         this.props.dispatch(getTotalAnnotationData(annList));
         break;
      }
      case typeConstants.ANNOTATION_UPDATED:{
        const annList=annStructureChange([data]);
        this.props.dispatch(deleteAnnotationData(data));
        this.props.dispatch(getTotalAnnotationData(annList));
        break;
      }
      case typeConstants.ANNOTATION_DELETED:{
        this.props.dispatch(deleteAnnotationData(data));
        break;
      }
      case 'pagescroll':
        $("#pageNum").val(data);
        break;
      default:{
        // other than continue
        if(data){
          const parameters = this.state.urlParams;
          parameters.id    = data.id,
          parameters.uri   = encodeURIComponent(data.href),
          data.uri         = data.href;
          data.label       = data.title;
          this.setState({ 
            currentPageDetails :data,
            currentPageTitle   :data.title, 
            urlParams:parameters
          },function(){
            // eslint-disable-next-line
            if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
              browserHistory.replace(`/eplayer/Course/${this.props.params.bookId}/page/${data.id}`);
            }else{
              browserHistory.replace(`/eplayer/ETbook/${this.props.params.bookId}/page/${data.id}`);
            }
            this.props.dispatch(getBookmarkCallService(this.state.urlParams));
            // this.props.dispatch(getAnnCallService(this.state.urlParams));
          });
        }
        break;
      }
    }
  }

  isCurrentPageBookmarked = () => {
    return this.props.isBookmarked;
  };
 
  goToTextChange = (goToTextChangeCallBack) => {
   // this.setState({ goToTextVal: e.target.value });
  } 

 goToPageClick = (getPageNumber) => {

  if(getPageNumber){
      const bookId = this.props.params.bookId;
      const userId = this.state.urlParams.user
      const goToPageObj = {
          context : bookId,
          user    : userId,
          pagenumber:getPageNumber,
          baseurl: this.state.pageDetails.baseUrl
        }
      this.props.dispatch(getGotoPageCall(goToPageObj));
    }
  }

  viewerContentCallBack = (viewerCallBack) => {
    this.setState({ viewerContent: viewerCallBack });
    if(viewerCallBack==false)
    this.setState({ drawerOpen: true });
  }
  goToPageCallback = (pageId, searchText) => {
    debugger;
    let id = pageId;
    let currentData = find(this.state.pageDetails.playListURL, list => list.id === pageId);
    if( currentData === undefined && pageId.indexOf('-') > -1 ) {
      id = pageId.substring(0,pageId.indexOf('-'))
      currentData = find(this.state.pageDetails.playListURL, list => list.id === id);
    }
    currentData.uri  = currentData.href;
    currentData.label = currentData.title;
    const playpageDetails  = this.state.pageDetails ; 
    playpageDetails.currentPageURL =  currentData;
    if(searchText) {
      playpageDetails.searchText = searchText;
    }
    const parameters = this.state.urlParams;
    parameters.id    = currentData.id,
    parameters.uri   = encodeURIComponent(currentData.href),
    this.setState({ 
      currentPageDetails :currentData,
      currentPageTitle   :currentData.title, 
      urlParams:parameters,
      pageDetails: playpageDetails,
      drawerOpen: false
    },()=>{
      if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
        browserHistory.replace(`/eplayer/Course/${this.props.params.bookId}/page/${id}`);
      }else{
        browserHistory.replace(`/eplayer/ETbook/${this.props.params.bookId}/page/${id}`);
      }
      this.props.dispatch(getBookmarkCallService(this.state.urlParams));
    }),
    this.viewerContentCallBack(true);
  }; 
  printFun = () => {
    const url = this.state.pageDetails.baseUrl + this.state.pageDetails.currentPageURL.href;
    window.open(`/eplayer/Print?${url}`, 'PrintPage', 'scrollbars=yes,toolbar=no,location=no,status=no,titlebar=no,toolbar=no,menubar=no, resizable=no,dependent=no');
  }
  onBookLoaded = (bload) => {
    if(bload) {
      const that = this;  
      window.renderPopUp = function(collection) {
        that.setState({ popUpCollection : collection });
      }
      this.setState({ popUpCollection : [] });
      this.wrapper = new Wrapper({'divGlossaryRef' : this.divGlossaryRef, 'bookDiv' : 'book-container'});
      this.wrapper.bindPopUpCallBacks();
    }    
  }

  preferenceUpdate = (pref) => {
   if (typeof(Storage) !== "undefined") {
     if(localStorage.getItem('bookId'+this.props.params.bookId)) {
       this.updatePreference(pref);
     }
     else{
       localStorage.setItem('bookId'+this.props.params.bookId, (pref.fontSize+"/"+pref.theme));
       this.updatePreference(pref);
     }
   }
 }

  getPreference = () => {
    let getpageDetails = this.state.pageDetails;
    const prefData = {'value' : {
        theme: getpageDetails.bgColor,
        fontSize: pageDetails.pageFontSize,
        orientation: 'horizontal',
        zoom: '0'
      }};
    const promiseVal = Promise.resolve(prefData);
    return promiseVal;
  }

  updatePreference = (pref) => {
   let pageDetails = this.state.pageDetails;
   let getStorageObj = localStorage.getItem('bookId'+this.props.params.bookId);
   
   getStorageObj = pref.fontSize+"/"+pref.theme;
   pageDetails.pageFontSize =  pref.fontSize;
   pageDetails.bgColor = pref.theme;
   localStorage.setItem('bookId'+this.props.params.bookId, getStorageObj);
   this.setState({pageDetails : pageDetails});
  }

  goToPage = (pageId) => {
    let bookObj = {};
    this.state.pageDetails.playListURL.forEach( (data) => { 
      if(data.href && data.href.match(pageId.split("OPS")[1].split('*')[0]) ) { 
        bookObj = data;
      } 
    });
    this.goToPageCallback(bookObj.id, pageId.split("OPS")[1].split('*')[1].split(','))
  }

  listClick = () => {
    console.log("....** listClick function...")
  }
  

  render() {
    const callbacks = {};
    const { annotationData, annDataloaded ,annotationTotalData ,playlistData, playlistReceived, bookMarkData ,tocData ,tocReceived} = this.props; // eslint-disable-line react/prop-types
    // const annData  = annotationData.rows;
    this.props.book.annTotalData  = annotationTotalData;
    this.props.book.toc           = tocData;
    this.props.book.bookmarks     = bookMarkData;
    
    callbacks.removeAnnotationHandler = this.removeAnnotationHandler;
    callbacks.addBookmarkHandler      = this.addBookmarkHandler;
    callbacks.removeBookmarkHandler   = this.removeBookmarkHandler;
    callbacks.isCurrentPageBookmarked = this.isCurrentPageBookmarked;
    callbacks.goToPageCallback        = this.goToPageCallback;

    //For Segregating to Wrapper component PxePlayer		
    const bootstrapParams={		
      pageDetails:{...this.state.pageDetails},		
      urlParams:{...this.state.urlParams}		
    }		
    //End of Wrapper PxePlayer
    return (
      <div>
        <Header  locale='en-US'
          classname={this.state.classname}
          pageTitle = {this.state.currentPageTitle}
          bookData={this.props.book}
          bookCallbacks={callbacks}
          store={this.context.store}
          hideDrawer={this.hideDrawer}
          drawerOpen={this.state.drawerOpen}
          viewerContentCallBack={this.viewerContentCallBack}
          getPreference = {this.getPreference}
          updatePreference = {this.updatePreference}
          indexId = { {'indexId' : this.bookIndexId, 'searchUrl' : this.searchUrl} }
          goToPage = {(pageId) => this.goToPage(pageId)}
          listClick = {() => this.listClick()}
          goToPageClick = {this.goToPageClick}
        />
           
          <div className={this.state.viewerContent ? 'viewerContent' : 'fixedviewerContent'}>
            {!playlistReceived ? <RefreshIndicator size={50} left={650} top={200} status="loading" /> :''}
            {playlistReceived ? <PxePlayer bootstrapParams={bootstrapParams}  applnCallback={this.onPageChange}/> : ''}
          </div>
           {this.state.isPanelOpen?<div>		
            <iframe name="panel" width="500" height="600" ></iframe>
          </div>:''}
      </div>
    );
  }
}


Book.propTypes = {
  fetchTocAndViewer      : React.PropTypes.func,
  fetchAnnotations       : React.PropTypes.func,
  removeAnnotation       : React.PropTypes.func,
  fetchBookmarks         : React.PropTypes.func,
  addBookmark            : React.PropTypes.func,
  removeBookmark         : React.PropTypes.func,
  fetchPreferences       : React.PropTypes.func,
  // goToPage            : React.PropTypes.func,
  book                   : React.PropTypes.object,
  params                 : React.PropTypes.object,
  dispatch               : React.PropTypes.func
};

Book.contextTypes = {
  store                  : React.PropTypes.object.isRequired,
  muiTheme               : React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
 return  { 
  //annotationData       : state.annotationReducer.highlightPageData,
    annDataloaded        : state.annotationReducer.annDataloaded, 
    annotationTotalData  : state.annotationReducer.highlightTotalData,  
    annTotalDataLoaded   : state.annotationReducer.annTotalDataLoaded, 
    playlistData         : state.playlistReducer.data,
    playlistReceived     : state.playlistReducer.playlistReceived,
    tocData              : state.playlistReducer.tocdata,
    tocReceived          : state.playlistReducer.tocReceived,
    isBookmarked         : state.bookmarkReducer.data.isBookmarked,
    bookMarkData         : state.bookmarkReducer.bookmarksData,
    gotoPageObj          : state.gotopageReducer.gotoPageObj,
    isGoToPageRecived    : state.gotopageReducer.isGoToPageRecived
  }
};// eslint-disable-line max-len
Book = connect(mapStateToProps)(Book);// eslint-disable-line no-class-assign
export default Book;
