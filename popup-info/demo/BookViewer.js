import  React, {  Component, PropTypes } from 'react';
import renderHTML from 'react-render-html';

class BookViewer extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      bookHTML : ''
    };
  }

  componentWillMount() {
    console.log("componentWillMount.............")
  }

  componentDidMount() {
    this.setState({bookHTML : this.props.bookHTML }, () => {
      if(this.props.onBookLoad) {
        this.props.onBookLoad();
      }
    });
    
  }

  render() {
    return (this.props.onBookLoad ? <div> {renderHTML(this.state.bookHTML)} </div> : <div> <div> <a onClick={(e) => { console.log("iiiiiiiiiiiiiizxzzzzzzzzzzzzzzzzzzzzzzzzziiiiiiii", e) }} className = 'keyword'> dd </a> </div> </div>  );
  }
  
}

BookViewer.PropTypes = {
  bookHTML: PropTypes.string.isRequired
}

export default BookViewer;
