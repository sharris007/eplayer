import  {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';

class BookViewer extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      bookHTML : ''
    };
  }

  componentDidMount() {
    this.setState({bookHTML : this.props.bookHTML }, () => {
      this.props.onBookLoad();
    });
    
  }

  shouldComponentUpdate(nextProps, nextState) { 
    console.log(nextState, this.state);
    return nextState.bookHTML !== this.state.bookHTML;    
  }

  render() {
    return (<div>{
      renderHTML(this.state.bookHTML)
    }</div>);
  }
  
}

BookViewer.PropTypes = {
  bookHTML: PropTypes.string.isRequired
}

export default BookViewer;
