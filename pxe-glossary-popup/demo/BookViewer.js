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

  init = () => {
    axios.get(this.props.bookUrl)
      .then((response) => {
        this.setState({bookHTML : response.data});      
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
