  /* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import WidgetManager from '../../../components/widget-integration/widgetManager';
import Header from '../../../components/Header';
import { pageDetails , customAttributes, pageLoadData, pageUnLoadData } from '../../../../const/Mockdata';
import './Book.scss';
import { browserHistory } from 'react-router';
import { getTotalAnnCallService, getAnnCallService, postAnnCallService, putAnnCallService,deleteAnnCallService, getTotalAnnotationData, deleteAnnotationData, annStructureChange } from '../../../actions/annotation';
import { getBookPlayListCallService, getPlaylistCallService, getBookTocCallService, getCourseCallService} from '../../../actions/playlist';
import { getGotoPageCall } from '../../../actions/gotopage';
import { loadPageEvent, unLoadPageEvent } from '../../../api/loadunloadApi';

import { getBookmarkCallService ,postBookmarkCallService ,deleteBookmarkCallService,getTotalBookmarkCallService } from '../../../actions/bookmark';
import { VegaViewPager } from '@pearson-incubator/vega-viewer';
import { Navigation } from '@pearson-incubator/aquila-js-core';
import { Annotation } from 'pxe-annotation';
import { Wrapper } from 'pxe-wrapper';
import { PopUpInfo } from '@pearson-incubator/popup-info';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {resources , domain ,typeConstants, clients} from '../../../../const/Settings';
import { LearningContextProvider } from '@pearson-incubator/vega-viewer';
export class Book extends Component {
  constructor(props) {
      super(props);
      let redirectCourseUrl   = window.location.href;
      redirectCourseUrl       = decodeURIComponent(redirectCourseUrl).replace(/\s/g, "+").replace(/%20/g, "+");
      piSession.getToken(function(result, userToken){
        if(!userToken){
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
        drawerOpen: false,
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
        isPanelOpen:false,
        asynCallLoaded:false,
        pageLoadData,
        pageUnLoadData,
        userAgent : navigator.userAgent,
        nextPageId : '',
        timeOnTaskUuid :'',
        contentId : '',
        sectionId : '',
        piToken : localStorage.getItem('secureToken'),
        pageLoad : false,
        currentPageId : ''
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
    let isSessionLoaded = false; 
    const IntervalCheck = setInterval(()=>{
      // deeper code
      if(!isSessionLoaded) {
          let redirectCourseUrl   = window.location.href;
          redirectCourseUrl       = decodeURIComponent(redirectCourseUrl).replace(/\s/g, "+").replace(/%20/g, "+");
          if(piSession){
            isSessionLoaded = true;
            piSession.getToken(function(result, userToken){
              if(result === piSession['Success']){
                  localStorage.setItem('secureToken',userToken);
                  clearInterval(IntervalCheck);
              }
            }); 
          }
          const getSecureToken = localStorage.getItem('secureToken');
          const bookDetailsData = {
            context : this.state.urlParams.context,
            piToken : getSecureToken,
            bookId  : this.props.params.bookId
          }
          const piUserId = piSession.userId();
          this.state.urlParams.user = piUserId;
          if(window.location.pathname.indexOf('/eplayer/Course/')>-1){
              bookDetailsData.courseId = this.props.params.bookId;
              this.props.dispatch(getCourseCallService(bookDetailsData));
          }else{
              this.props.dispatch(getBookPlayListCallService(bookDetailsData));
          }
        }
    },200)    
  }
  componentWillUnmount() {
    WidgetManager.navChanged(this.nodesToUnMount);
    this.props.dispatch({type: "CLEAR_PLAYLIST"});
    this.props.dispatch({type: "CLEAR_ANNOTATIONS"});
    this.props.dispatch({type: "CLEAR_BOOKMARKS"});
    this.props.dispatch({type: "CLEAR_SEARCH"});
    //PLA pageunload Event
    if( this.props.bookdetailsdata.userCourseSectionDetail !== undefined ) {
      const unloadPageNxtpageId = this.getNxtPageId(this.state.currentPageId);
      this.UnloadFu(this.state.currentPageId, unloadPageNxtpageId, '', '', false);
    }
    delete this.state.pageDetails.searchText;
    this.setState({pageDetails : this.state.pageDetails,asynCallLoaded:false});
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
            browserHistory.replace('/eplayer/Course/${this.props.params.bookId}/page/${gotoPageData.id}?launchLocale='+ window.annotationLocale);
          }else{
            browserHistory.replace('/eplayer/ETbook/${this.props.params.bookId}/page/${gotoPageData.id}?launchLocale='+ window.annotationLocale);
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
          document.title  = data.title; 
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
          document.title  = data.title; 
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
              browserHistory.replace(`/eplayer/Course/${this.props.params.bookId}/page/${data.id}?launchLocale=`+ window.annotationLocale);
            }else{
              browserHistory.replace(`/eplayer/ETbook/${this.props.params.bookId}/page/${data.id}?launchLocale=`+ window.annotationLocale);
            }
            
            this.props.dispatch(getBookmarkCallService(this.state.urlParams));
            // this.props.dispatch(getAnnCallService(this.state.urlParams));
          });

          //PLA Events Functions
          if( this.props.bookdetailsdata.userCourseSectionDetail !== undefined ) {
            let getnextPageId = '';
            if( !this.state.pageLoad ) {
                getnextPageId = this.getNxtPageId(data.id);
                this.loadFu(data.id, getnextPageId);
            }
            else{
                getnextPageId = this.getNxtPageId(this.state.currentPageId);
                this.UnloadFu(this.state.currentPageId, getnextPageId, data.id, this.getNxtPageId(data.id), true);
                //getnextPageId = this.getNxtPageId(data.id);
                //this.loadFu(data.id, getnextPageId);
            }
          }
        }
        break;
      }
    }
  }

  loadFu = (cu, nx) =>{
    const timeOnTaskUuid = this.getGUID();
            this.setState({ 
              nextPageId : nx,
              timeOnTaskUuid : this.getGUID(),
              contentId : cu,
              sectionId: this.props.bookdetailsdata.userCourseSectionDetail.section.sectionId
            },function(){
               this.setState({pageLoad : true});
               this.setState({ currentPageId : cu });
               let updatedPageLoadData = this.state.pageLoadData;
              const messageId = this.getGUID();
              const transactionDt = new Date().toISOString();
              updatedPageLoadData.activities[0].payload.personId = "urn:udson:pearson.com/sms/prod:user/"+this.state.urlParams.user;
              updatedPageLoadData.activities[0].payload.courseId = "urn:udson:pearson.com/sms/prod:course/"+this.props.params.bookId;
              updatedPageLoadData.activities[0].payload.pageUserNavigatedToUrn = "urn:udson:pearson.com/sms/prod:course/"+this.state.nextPageId;
              updatedPageLoadData.activities[0].payload.courseSectionId = this.state.sectionId;
              updatedPageLoadData.activities[0].payload.contentId = this.state.contentId;
              updatedPageLoadData.activities[0].payload.messageId = messageId;
              updatedPageLoadData.activities[0].payload.timeOnTaskUuid = this.state.timeOnTaskUuid;
              updatedPageLoadData.activities[0].payload.transactionDt = transactionDt;
              updatedPageLoadData.activities[0].payload.loadDt = transactionDt;
              updatedPageLoadData.activities[0].payload.userAgent = this.state.userAgent;
              // console.log("updatedPageLoadData12", updatedPageLoadData);

              loadPageEvent(this.state.piToken, updatedPageLoadData);

            });
  }

  UnloadFu = (cu, nx,loadPageid, loadNxtPageId, loadFunCall) =>{
            let updatedPageUnLoadData = this.state.pageUnLoadData;
            if( this.state.pageLoadData.activities[0].payload.timeOnTaskUuid === this.state.timeOnTaskUuid){
              updatedPageUnLoadData.activities[0].payload.timeOnTaskUuid = this.state.pageLoadData.activities[0].payload.timeOnTaskUuid;
            }
            
            this.setState({ 
              nextPageId : nx,
              contentId : cu,
              sectionId: this.props.bookdetailsdata.userCourseSectionDetail.section.sectionId
            },function(){
               this.setState({ currentPageId : cu });
               
              const messageId = this.getGUID();
              const transactionDt = new Date().toISOString();
              updatedPageUnLoadData.activities[0].payload.personId = "urn:udson:pearson.com/sms/prod:user/"+this.state.urlParams.user;
              updatedPageUnLoadData.activities[0].payload.courseId = "urn:udson:pearson.com/sms/prod:course/"+this.props.params.bookId;
              updatedPageUnLoadData.activities[0].payload.pageUserNavigatedToUrn = "urn:udson:pearson.com/sms/prod:course/"+this.state.nextPageId;
              updatedPageUnLoadData.activities[0].payload.courseSectionId = this.state.sectionId;
              updatedPageUnLoadData.activities[0].payload.contentId = this.state.contentId;
              updatedPageUnLoadData.activities[0].payload.messageId = messageId;
              updatedPageUnLoadData.activities[0].payload.transactionDt = transactionDt;
              updatedPageUnLoadData.activities[0].payload.loadDt = transactionDt;
              updatedPageUnLoadData.activities[0].payload.userAgent = this.state.userAgent;
              // console.log("updatedPageLoadDataUNLOAD", updatedPageUnLoadData);

              unLoadPageEvent(this.state.piToken, updatedPageUnLoadData);
              if(loadFunCall){
                this.loadFu(loadPageid, loadNxtPageId);
              }

            });
  }

  getNxtPageId = (getid) => {
    const playlistLength = this.props.playlistData.content.length;
    const playlist = this.props.playlistData.content;
    for (let i = 0; i < playlistLength; i++) {
        if (playlist[i].id === getid) {
            return playlist[i+1].id;
        }
    }
  }

  getGUID = () => {
    this.getId = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return this.getId() + this.getId() + '-' + this.getId() + '-' + this.getId() + '-' +
      this.getId() + '-' + this.getId() + this.getId() + this.getId();
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
    if(viewerCallBack==false) {
      this.setState({ drawerOpen: true },function(){
          if(!this.state.asynCallLoaded) {
             this.props.dispatch(getBookTocCallService());
             this.props.dispatch(getTotalBookmarkCallService(this.state.urlParams));
             this.props.dispatch(getTotalAnnCallService(this.state.urlParams));
             this.state.asynCallLoaded = true;
          }
      });
    }
    else{
      this.setState({ drawerOpen: false });
    }
  }
  goToPageCallback = (pageId, annId,searchText) => {
    let id = pageId;
    let currentData = find(this.state.pageDetails.playListURL, list => list.id === pageId);
    if( currentData === undefined && pageId.indexOf('-') > -1 ) {
      id = pageId.substring(0,pageId.indexOf('-'))
      currentData = find(this.state.pageDetails.playListURL, list => list.id === id);
    }
    currentData.uri  = currentData.href;
    currentData.label = currentData.title;
    document.title = currentData.title;
    const playpageDetails  = this.state.pageDetails ; 
    playpageDetails.currentPageURL =  currentData;
    if(searchText) {
      playpageDetails.searchText = searchText;
    }
    else if(annId){
      playpageDetails.annId = annId;
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
        browserHistory.replace(`/eplayer/Course/${this.props.params.bookId}/page/${id}?launchLocale=`+ window.annotationLocale);
      }else{
        browserHistory.replace(`/eplayer/ETbook/${this.props.params.bookId}/page/${id}?launchLocale=`+ window.annotationLocale);
      }
      this.props.dispatch(getBookmarkCallService(this.state.urlParams));
    }),
    this.viewerContentCallBack(true);
    if(annId && $('span[data-ann-id='+annId+']') && $('span[data-ann-id='+annId+']')[0]) {
          $('html, body').animate({
                scrollTop: $('span[data-ann-id='+annId+']')[0].offsetTop
          });
      }
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
    this.goToPageCallback(bookObj.id,'', pageId.split("OPS")[1].split('*')[1].split(','))
  }

  listClick = () => {
    console.log("....** listClick function...")
  }
  

  render() {
    const callbacks = {};
    const { annotationData, annDataloaded ,annotationTotalData ,playlistData, playlistReceived, bookMarkData ,tocData ,tocReceived, bookdetailsdata} = this.props; // eslint-disable-line react/prop-types
    // const annData  = annotationData.rows;
    this.props.book.annTotalData  = annotationTotalData;
    this.props.book.toc           = tocData;
    this.props.book.tocReceived   = tocReceived;
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
    const currentBookId = this.props.params.pageId;
    //End of Wrapper PxePlayer
    return (
      <div>
        <LearningContextProvider
          contextId="ddddd"
          contentType={resources.constants.product.toUpperCase()}
          componentFactory={{ getComponent: function getComponent(pageData) { console.log('Unhandled component!', pageData); return null; } }}
          clients={{page:clients.pxeClient(this.state.pageDetails.baseUrl)}}
          metadata={{ environment: 'LOCAL' }}
        >
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
            currentPageID = {currentBookId}
          />
          <div className={this.state.viewerContent ? 'viewerContent' : 'fixedviewerContent viewerContent'}>
            {!playlistReceived ? <RefreshIndicator size={50} left={650} top={200} status="loading" /> :''}
            {playlistReceived ?  <div>
                                  <VegaViewPager
                                    contentType="PXE"
                                    pagePlayList={bootstrapParams.pageDetails.playListURL}
                                    currentPageId={bootstrapParams.pageDetails.currentPageURL.id}
                                    onPageRequest={()=>{}}
                                    onPageLoad={()=>{}}
                                    key={bootstrapParams.pageDetails.currentPageURL.id}
                                  />
                                  <Navigation
                                    onPageRequest={()=>{}}
                                    pagePlayList={bootstrapParams.pageDetails.playListURL}
                                    currentPageId={bootstrapParams.pageDetails.currentPageURL.id}
                                  />
                                </div>: ''}
          </div>
           {this.state.isPanelOpen?<div>		
            <iframe name="panel" width="500" height="600" ></iframe>
          </div>:''}
          </div>
        </LearningContextProvider>
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
    isGoToPageRecived    : state.gotopageReducer.isGoToPageRecived,
    bookdetailsdata      : state.playlistReducer.bookdetailsdata,
  }
};// eslint-disable-line max-len
Book = connect(mapStateToProps)(Book);// eslint-disable-line no-class-assign
export default Book;
