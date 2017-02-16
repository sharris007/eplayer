import {  Component } from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Popup from 'react-popup';
import '../scss/moreInfoPopUp.scss';


class MoreInfoPopUp extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      moreInfoResponse : ''
    };
    setTimeout(() => {
      this.fetchMoreInfoData();
    }, 2000) 
    
  }

  fetchMoreInfoData = () => {
    axios.get(this.props.moreInfoUrl)
      .then((response) => {
        console.clear();
        this.setState({ moreInfoResponse : response.data});

        const bookDiv = document.getElementById(this.props.bookDiv);

        bookDiv.querySelectorAll('.lc_ec_aside').forEach((item) => {
          const obj = { className : 'lc_ec_aside'};
          item.addEventListener('click', this.framePopOver.bind(this, obj));
        });
          
        bookDiv.querySelectorAll('dfn.keyword').forEach((item) => {
          const obj = { className : 'dfn.keyword'};
          item.addEventListener('click', this.framePopOver.bind(this, obj));
        });
        
      }).catch((err) =>{
        console.debug(err);
      })
    
  }

  framePopOver = (args, event) => {
    event.preventDefault();
    const docBoundingClientRect = document.body.getBoundingClientRect();
    const elementBoundingClientRect = event.target.getBoundingClientRect();
    const elementTopPosition = -(docBoundingClientRect.top) +  elementBoundingClientRect.top + 10;
    const moreInfoIconDOM  = event.target.parentElement;
    const bookDivHeight = document.getElementById(this.props.bookDiv).clientHeight + 'px';
    document.getElementsByClassName('mm-popup')[0].style.height = bookDivHeight;
    let popOverTitle = '';
    let popOverDescription = '';

    switch (args.className) {
    case 'lc_ec_aside' : {
      popOverTitle = document.getElementById(moreInfoIconDOM.href.split('#')[1]).getElementsByTagName('h2')[0].textContent;
      popOverDescription = document.getElementById(moreInfoIconDOM.href.split('#')[1]).getElementsByTagName('p')[0].textContent;
      break;
    }

    case 'dfn.keyword' : {
      console.log(moreInfoIconDOM.parent)
      popOverTitle = document.getElementById(moreInfoIconDOM.href.split('#')[1]).nextElementSibling.getElementsByTagName('h4')[0].textContent;
      popOverDescription = document.getElementById(moreInfoIconDOM.href.split('#')[1]).nextElementSibling.getElementsByTagName('p')[0].textContent;
      break;
    }

    }

    

    Popup.registerPlugin('popover', function (target) {
      this.create({
        title: popOverTitle,
        content: popOverDescription,
        noOverlay: true,
        position: function (box) {
          box.style.top = elementTopPosition + 'px';
          box.style.left = event.clientX + 'px';
          box.style.margin = 0;
          box.style.opacity = 1;

          console.debug('target.getBoundingClientRect()',  target.getBoundingClientRect())
          console.debug('event.pageX :- ', event.pageX, 'event.pageY :- ', event.pageY )
          console.debug('e.pageX - rect.left :- ', event.pageX - target.getBoundingClientRect().left )
        }
      });
    }); 
    Popup.plugins.popover(event.target);
  }
  
  render() {
    return (  <div>
                <Popup />
                <div  id = "divMoreInfo"
                    style= {{ display : 'none' }}>
                  {renderHTML(this.state.moreInfoResponse)}
                </div>
              </div>);
  }
  
}

export default MoreInfoPopUp;
