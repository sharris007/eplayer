import React, {  Component, PropTypes } from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Popup from 'react-popup';


class GlossaryPopUp extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      glossaryResponse : ''
    }; 
    setTimeout(() => {
      this.fetchGlossaryData();
    }, 2000) 
    
  }

  fetchGlossaryData = () => {
    axios.get(this.props.glossaryurl)
      .then((response) => {
        console.clear();
        this.setState({ glossaryResponse : response.data});
        document.getElementById(this.props.bookDiv).querySelectorAll('a.keyword').forEach((item) => {
          item.addEventListener('click', this.framePopOver)
        });
      })
  }

  framePopOver = (event) => {
    event.preventDefault();
    console.clear();
    const glossaryNode =  document.getElementById(event.target.hash.replace('#', '')); 
    const popOverTitle = glossaryNode.getElementsByTagName('dfn')[0].textContent;
    const popOverDescription = glossaryNode.nextElementSibling.getElementsByTagName('p')[0].textContent;
    Popup.create({
      title: 'Tile',
      content: 'Hello, look at me'
    });
    console.log('event.target :- ', event.target,  'popOverTitle :- ', popOverTitle, 'popOverDescription :- ', popOverDescription)
  }
  
  render() {
    return (<div  id = "divGlossary"
                  style= {{ visibility : 'hidden' }}>
                {renderHTML(this.state.glossaryResponse)}
            </div>);
  }
  
}

GlossaryPopUp.PropTypes = {
}

export default GlossaryPopUp;
