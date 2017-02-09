import '../scss/pageviewer.scss';
import React, {PropTypes} from 'react';

import renderHTML from 'react-render-html';
import FooterNav from './FooterNav'

class PageViewer extends React.Component {
  // Modify or add prop types to validate the properties passed to this component!
  // This is defined using an ES7 class property (transpiled by Babel Stage 0)
  constructor(props) {
    super(props);
    this.init(props);
  };
  init = (props) => {
    const initPage=this.props.currentPlayList?this.props.currentPlayList.playOrder:'';
    this.state = {
      renderSrc:'', 
      currentPage:initPage?initPage:1, 
      goTo:'', 
      isFirstPage:initPage === 1,
      isLastPage: initPage === this.props.src.playList[this.props.src.playList.length-1].playOrder,
      prevPageTitle:(initPage <= 1)?'':this.props.src.playList[initPage-2].title,
      nextPageTitle:(initPage === this.props.src.playList[this.props.src.playList.length-1].playOrder)?'':this.props.src.playList[initPage].title
    };
    
    this.getResponse(this.state.currentPage, true, 'initPage');
  };

  componentWillReceiveProps(newProps) {
    if (parseInt(this.props.currentPlayList.playOrder) !== parseInt(newProps.currentPlayList.playOrder)) {
      this.getResponse(parseInt(newProps.currentPlayList.playOrder), true, 'propChanged');
    }   
  };


  getRequestedPageUrl = (playOrder) => {
    const thisRef=this;
    return thisRef.props.src.playList.filter((el) => {
      return el.playOrder === playOrder;
    });
  }; 

  getResponse = (currentPage, isInitOrGo, goToPage) => {
    const thisRef=this;
    currentPage=currentPage+(isInitOrGo?0:thisRef.state.currentPage);
    thisRef.props.sendPageDetails(goToPage, thisRef.getRequestedPageUrl(currentPage)[0]);
    const url= thisRef.props.src.baseUrl + thisRef.getRequestedPageUrl(currentPage)[0].href;
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
        renderSrc:text, 
        currentPage:currentPage,
        isFirstPage: currentPage <= 1,
        isLastPage: currentPage >= this.props.src.playList[this.props.src.playList.length-1].playOrder,
        prevPageTitle:(currentPage <= 1)?'':this.props.src.playList[currentPage-2].title,
        nextPageTitle:(currentPage === this.props.src.playList[this.props.src.playList.length-1].playOrder)?'':this.props.src.playList[currentPage].title
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  
  goToNext = () => {
    this.getResponse(1, false, 'Next');
  };

  goToPrev = () => {
    this.getResponse(-1, false, 'Prev');
  };

  handlerGoEvent = () => {
    this.getResponse(parseInt(this.state.goTo), true, 'Goto');
  };

  updateGoTo = (e) => {
    this.setState({goTo: e.target.value});
  };

  goToKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.updateGoTo(e);
      this.getResponse(parseInt(this.state.goTo), true);
    }
  };
  arrowNavigation = (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.keyCode === 37 && !this.state.isFirstPage) {
        this.goToPrev();
      } else if (!this.state.isLastPage) {
        this.goToNext();
      }
      window.scroll(0, 0);
    }
  };
  render() {
    return (
      <div id="book-render-component" tabIndex="0"  onKeyUp={this.arrowNavigation}>
        <div className="book-container">{renderHTML(this.state.renderSrc)}</div>
        <FooterNav data={this.state} onClickNextCallBack={this.goToNext} onClickPrevCallBack={this.goToPrev}/>
      </div>
    );
  };
};

PageViewer.PropTypes = {
  src:PropTypes.object.isRequired
};

export default PageViewer;
