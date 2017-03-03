import '../scss/pageviewer.scss';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import renderHTML from 'react-render-html';

import FooterNav from './FooterNav';
import crossRef from './CrossRef';

class PageViewer extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("PROPS", props);
  };

  init = (props) => {
    //const thisRef=this;
    const playListURL = this.props.src.playListURL;
    const initPageIndex = this.props.src.currentPageURL ? playListURL.findIndex(el =>{
      return parseInt(el.playOrder)===parseInt(this.props.src.currentPageURL.playOrder); 
    }): '';
    this.state = {
      renderSrc: 'the',
      currentPage: initPageIndex ? initPageIndex : 0,
      goTo: '',
      pageNoDetails: '',
      /*isFirstPage: initPageIndex === 0,
      isLastPage: initPageIndex === playListURL.length - 1,
      prevPageTitle: (initPageIndex === 0) ? '' : playListURL[initPageIndex - 1].title,
      nextPageTitle: (initPageIndex === playListURL.length - 1) ? '' : playListURL[initPageIndex+1].title,*/
      currentStatePlayListUrl:playListURL[initPageIndex]
    };

    this.getResponse(this.state.currentPage, true, 'initPage', this.scrollWindowTop);
  };

  scrollWindowTop = () => {
    window.scroll(0, 0);
  };

  getRequestedPageUrl = (playOrder) => {
    const thisRef = this;
    return thisRef.props.src.playListURL.filter((el) => {
      return el.playOrder === playOrder;
    });
  };

  getResponse = (currentPage, isInitOrGo, goToPage, scrollWindowTopCallBack) => {
    const thisRef = this;
    const playListURL = thisRef.props.src.playListURL;
    currentPage = currentPage + (isInitOrGo ? 0 : thisRef.state.currentPage);
    console.log("goToPage" , goToPage);
    console.log("playListURL" , playListURL);
    console.log("playListURL.currentPage" , playListURL[currentPage]);
    thisRef.props.sendPageDetails(goToPage, playListURL[currentPage]);
    const url = thisRef.props.src.baseUrl + playListURL[currentPage].href;
    console.log("URL1", url);
    const request = new Request(url, {
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request, {
      method: 'get'
    }).then((response) => {
      return response.text();
    }).then((text) => {
      thisRef.setState({
        renderSrc: text,
        currentPage: currentPage,
        isFirstPage: currentPage === 0,
        isLastPage: currentPage >= playListURL.length - 1,
        prevPageTitle: (currentPage === 0) ? '' : playListURL[currentPage - 1].title,
        nextPageTitle: (currentPage === playListURL.length - 1) ? '' : playListURL[currentPage+1].title,
        currentStatePlayListUrl: playListURL[currentPage]
      });

      //callback
      scrollWindowTopCallBack();
    }).catch((err) => {
      console.log(err);
    });
  }

  goToNext = () => {
    this.getResponse(1, false, 'Next', this.scrollWindowTop);
  };

  goToPrev = () => {
    this.getResponse(-1, false, 'Prev', this.scrollWindowTop);
  };

  handlerGoEvent = () => {
    this.getResponse(parseInt(this.state.goTo), true, 'Goto', this.scrollWindowTop);
  };

  updateGoTo = (e) => {
    this.setState({ goTo: e.target.value });
  };

  goToKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.updateGoTo(e);
      this.getResponse(parseInt(this.state.goTo), true, this.scrollWindowTop);
    }
  };

  arrowNavigation = (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.keyCode === 37 && !this.state.isFirstPage) {
        this.goToPrev();
      } else if (!this.state.isLastPage) {
        this.goToNext();
      }
      //window.scroll(0, 0);
    }
  };

  //prints page no in the page rendered
  enablePageNo = () => {
    const pageDetails = document.getElementsByClassName('pagebreak');
    for (let j = 0; j < pageDetails.length; j++) {
      pageDetails[j].innerHTML = pageDetails[j].title;
      pageDetails[j].style.position = 'absolute';
      pageDetails[j].style.left = '-77px';
      pageDetails[j].style.transform = 'rotate(-90deg)';
      pageDetails[j].style.fontSize = '18px';
    }
  };

  createHtmlBaseTag = () => {
    const base = document.createElement('base');
    base.href = this.props.src.baseUrl + this.state.currentStatePlayListUrl.href;
    document.getElementsByTagName('head')[0].appendChild(base);
  };
  //Common function for disable rightclick
  disableContextMenu = (getElem) => {
    getElem.oncontextmenu = () => {
      return false;
    };
  }
 
  componentWillMount = () => {
    this.init(this.props);
    this.createHtmlBaseTag();//inserts base tag with baseUrl as a reference to relative paths
  };

  componentWillReceiveProps(newProps) {
    if (parseInt(this.props.src.currentPageURL.playOrder) !== parseInt(newProps.src.currentPageURL.playOrder)) {
      this.getResponse(parseInt(newProps.src.currentPageURL.playOrder), true, 'propChanged', this.scrollWindowTop);
    }
  };

  copyChar = (e) => {
    if( e.ctrlKey && e.keyCode===67 ){
      let selection;
        selection = window.getSelection();
      console.log($('.annotator-hl-temporary').text());
      //this.props.src.copyCharLimit
      const copytext = $('.annotator-hl-temporary').text().substring(0, 14);
      const drmdiv = this.drmBlockRef;
      console.log("copytext", copytext);
      drmdiv.innerHTML = copytext;
      selection.selectAllChildren(drmdiv);
      window.setTimeout(function() {
        drmdiv.innerHTML = ' ';
      }, 0);
    }
  }

  componentDidMount = () => {
    if(this.props.src.highlightWord){
      //console.log("***",'<span>'+this.props.src.highlightWord+'</span>');
      const x = this.props.src.highlightWord;
      console.log(x);
      console.log("***",/ + {x} +/g);
     // document.body.innerHTML = document.body.innerHTML.replace(/the/g, '<span>theeeeee</span>');
    //  this.innerHTML = document.body.innerHTML.replace(/+{this.props.src.highlightWord}+/g, '<span>'+ {this.props.src.highlightWord}+'</span>');
    }
  } 
  componentDidUpdate = () => {
    if(this.props.src.highlightWord){
      console.log("x", this.props.src.highlightWord);
      const replace = this.props.src.highlightWord;
const re = new RegExp(replace,"g");
      console.log("reg", this.props.src.highlightWord);
        document.body.innerHTML = document.body.innerHTML.replace(re, '<span class="react-highlighted-text">'+this.props.src.highlightWord+'</span>');
  }
    //Disable contextmenu based on copyCharlimt and copyImage Props
    if ((this.props.src.copyCharLimit < 0 || this.props.src.copyCharLimit > 0) && (!this.props.src.copyImages)) {
      const images = this.bookContainerRef.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        this.disableContextMenu(images[i]);
      }
    } else if (this.props.src.copyCharLimit === 0 && (!this.props.src.copyImages)) {
      this.disableContextMenu(this.bookContainerRef);
    }

    //Check the Text selection onCopy event
  
  /*  this.bookContainerRef.oncopy = () => {
            var range = document.body.createTextRange();
        range.moveToElementText($('.annotator-hl-temporary'));
        range.select();

      if (this.props.src.copyCharLimit > 0) {
        let selection;
        selection = window.getSelection();
        const copytext = selection.toString().substring(0, this.props.src.copyCharLimit);
        const drmdiv = this.drmBlockRef;
        drmdiv.innerHTML = copytext.substring(0, this.props.src.copyCharLimit);
        selection.selectAllChildren(drmdiv);
        window.setTimeout(function() {
          drmdiv.innerHTML = ' ';
        }, 0);
      } else if (this.props.src.copyCharLimit === 0) {
        return false;
      }
    }; */
    //prints page no in the page rendered
    this.enablePageNo();
    crossRef(this);
  };

  getGoToElement = () =>{
    return (
      <div className = "goto-group" >
        < TextField hintText = "Page No" value = {this.state.goTo} onChange = {(e) => this.updateGoTo(e)}  onKeyDown = {(e) => this.goToKeyUp(e)}/><RaisedButton label="Go.." primary={true} onClick={() => this.handlerGoEvent()}/>
      </div>
      );
  };

  render() {
    return ( 
    <div>
      <div id = "book-render-component"  tabIndex = "0" onKeyUp = {this.arrowNavigation} >
        <div id={this.props.src.contentId}>
          <div className = "book-container" ref = {(el) => { this.bookContainerRef = el; }} tabIndex="1" onKeyDown = {(e) => this.copyChar(e)}> {renderHTML(this.state.renderSrc)} </div>
        </div>
        {this.props.src.enableGoToPage ?this.getGoToElement():''} 
        <FooterNav data = {this.state}  onClickNextCallBack = {this.goToNext} onClickPrevCallBack = {this.goToPrev}/> 
        <div ref = {(el) => { this.drmBlockRef = el; }}> </div >
      </div>
      </div>
    );
  };
};

PageViewer.PropTypes = {
  src: PropTypes.object.isRequired
};

export default PageViewer;