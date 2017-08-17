import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import renderHTML from 'react-render-html';
import Perf from 'react-addons-perf';
import Wrapper from './Wrapper';
import PopupApi from '../api/PopupApi';
import BookViewer from '../../demo/BookViewer';
import {PopUpInfo} from '@pearson-incubator/popup-info';



class ComponentOwner extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      isBookLoaded: false,
      bookHTML: '',
      glossaryResponse: '',
      popUpCollection : []
    };  
    this.divGlossaryRef = '';
    this.Wrapper = null;
    this.init();
  }

  init = () => {  
    PopupApi.getData(this.props.bookUrl).then((response) => {
      return response.text();
    }).then((text) => {
      this.setState({bookHTML : text});
    }).catch((err) => {
      console.debug(err);
    });
  }

  componentWillMount() {
    window.performance.mark('ComponentOwner')
  }


  componentDidMount() {
    console.log('"Time taken for PopUp ComponentOwner component : "', window.performance.now('Application'));
    if (this.props.isFromComponent) {
      let base = {}; 
      base = document.createElement('base');
      base.href = this.props.bookUrl;
      document.getElementsByTagName('head')[0].appendChild(base);      
    }
  }

  componentDidUpdate() {
    Perf.stop();
    Perf.printInclusive();
    Perf.printWasted();
  }

  onBookLoad() {
    const that = this;
    Perf.start();
    window.renderPopUp = function(popUpCollection) {
      that.setState({
        'popUpCollection':popUpCollection
      });
    }
    this.Wrapper = new Wrapper({'divGlossaryRef' : this.divGlossaryRef, 'bookDiv' : 'bookDiv'});
    this.Wrapper.bindPopUpCallBacks();    
  }

  render() {    
    return (
        <div> 
        <div id = "bookDiv">
          {this.state.bookHTML ? <BookViewer bookHTML = {this.state.bookHTML} onBookLoad = {this.onBookLoad.bind(this)} /> : ''}
        </div>  
        <div>     
          <div>{(this.state.popUpCollection.length > 0) ? <PopUpInfo popUpCollection = {this.state.popUpCollection} bookId = "bookDiv"/> : ''}</div>
          <div id= "divGlossary" ref = {(dom) => { this.divGlossaryRef = dom }} style = {{ display: 'none' }}> {renderHTML(this.state.glossaryResponse)} </div>
        </div>  
        </div>
    )
  }
}

ComponentOwner.PropTypes = {
  bookUrl: PropTypes.string.isRequired
}

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
