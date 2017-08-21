import React from 'react';
import ReactDOM from 'react-dom';
import { VegaViewPager } from '@pearson-incubator/vega-viewer';
import { Navigation } from '@pearson-incubator/aquila-js-core';
class PxePlayer extends React.Component {
  constructor(props) {
    super(props);
    const {pageDetails}=this.props.bootstrapParams;
    this.state={
      currentPageId:pageDetails.currentPageURL.id
    };
  }
  onPageRequest=(page)=>{
    this.setState({
      currentPageId:page.id
    }, ()=>{
      console.log('page changed to', page);
    });
  };
  render() {
    const {pageDetails}=this.props.bootstrapParams;
    return (
      <div>
        <VegaViewPager
          contentType="PXE"
          pagePlayList={pageDetails.playListURL}
          currentPageId={this.state.currentPageId}
          onPageRequest={()=>{}}
          onPageLoad={()=>{}}
          key={this.state.currentPageId}
        />
        <Navigation
          onPageRequest={this.onPageRequest}
          pagePlayList={pageDetails.playListURL}
          currentPageId={this.state.currentPageId}
        />
      </div>
    );
  }
}

PxePlayer.PropTypes = {
 
};
export default PxePlayer;
