import  {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';
import axios from 'axios';

class BookViewer extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      bookHTML : ''
    };
    this.init();
  }

  /* lc_ec_aside, dfn.keyword 
  https://content.openclass.com/eps/pearson-reader/api/item/0c0c9911-1724-41d7-8d05-f1be29193d3c/1/file/qatesting_changing_planet_v2_sjg/changing_planet/OPS/s9ml/chapter02/why_are_age_structures_and_dependency_ratios_important.xhtml

  noteref noteref_footnote
  https://eps.openclass.com/eps/sanvan/api/item/cf1b10a1-e24c-4359-8e74-cfeac4d05e56/102/file/kennedy-tlc-1e-rerelease_update_v2_RR1/OPS/xhtml/ch05_sec_04.xhtml*/

  init = () => {
    axios.get(' https://eps.openclass.com/eps/sanvan/api/item/cf1b10a1-e24c-4359-8e74-cfeac4d05e56/102/file/kennedy-tlc-1e-rerelease_update_v2_RR1/OPS/xhtml/ch05_sec_04.xhtml')
      .then((response) => {
        this.setState({bookHTML : response.data});     
      });
  }

  componentDidMount() {
    const base = document.createElement('base');
    base.href = 'https://eps.openclass.com/eps/sanvan/api/item/cf1b10a1-e24c-4359-8e74-cfeac4d05e56/102/file/kennedy-tlc-1e-rerelease_update_v2_RR1/OPS/xhtml/ch05_sec_04.xhtml';
    document.getElementsByTagName('head')[0].appendChild(base);
  }
  
  render() {
    return (<div>{renderHTML(this.state.bookHTML)}</div>);
  }
  
}

BookViewer.PropTypes = {
  bookHTML: PropTypes.string.isRequired
}

export default BookViewer;
