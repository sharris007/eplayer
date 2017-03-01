import  {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';

class BookViewer extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      bookHTML : ''
    };
    this.init();
  }

  init = () => {  
    const request = new Request(this.props.bookUrl, {
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });

    fetch(request, {
      method: 'get'
    }).then((response) => {
      return response.text();
    }).then((text) => {
      this.setState({bookHTML : text}); 
      this.props.onBookLoad(); 
    }).catch((err) => {
      console.debug(err);
    });
  }

  componentDidMount() {
    let base = {}; 
    base = document.createElement('base');
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