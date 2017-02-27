import  {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';
import MoreInfoApi from '../src/api/MoreInfoApi';

class BookViewer extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      bookHTML : ''
    };
    this.init();
  }

  init = () => {
    MoreInfoApi.getData(this.props.bookUrl).then((response) => {
      return response.text();
    }).then((text) => {
      this.setState({bookHTML : text}); 
      this.props.onBookLoad();
    }).catch((err) => {
      console.debug(err);
    });
  }

  componentDidMount() {
    const base = document.createElement('base');
    base.href = this.props.bookUrl;
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
