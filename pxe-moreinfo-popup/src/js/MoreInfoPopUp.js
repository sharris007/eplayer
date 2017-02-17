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
          const obj = {className : 'lc_ec_aside'};
          item.addEventListener('click', this.framePopOver.bind(this, obj));
        });
          
        bookDiv.querySelectorAll('dfn.keyword').forEach((item) => {
          const obj = {className : 'dfn.keyword'};
          item.addEventListener('click', this.framePopOver.bind(this, obj));
        });
        
        bookDiv.querySelectorAll('.noteref_footnote').forEach((item) => {
          console.log(item)
          const obj = {className : 'noteref_footnote'};
          item.addEventListener('click', this.framePopOver.bind(this, obj));
        });

      }).catch((err) => {
        console.debug(err);
      })
    
  }

  framePopOver = (args, event) => {
    event.preventDefault();
    let moreInfoIconDOM  = event.target.parentElement;
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
      popOverTitle = document.getElementById(moreInfoIconDOM.href.split('#')[1]).nextElementSibling.getElementsByTagName('h4')[0].textContent;
      popOverDescription = document.getElementById(moreInfoIconDOM.href.split('#')[1]).nextElementSibling.getElementsByTagName('p')[0].textContent;
      break;
    }

    case 'noteref_footnote' : {
      moreInfoIconDOM = moreInfoIconDOM.href ? moreInfoIconDOM : moreInfoIconDOM.children[0];
      popOverTitle = '';
      popOverDescription = renderHTML(document.getElementById(moreInfoIconDOM.href.split('#')[1]).getElementsByTagName('p')[0].innerHTML);
      break;
    }

    }

    Popup.registerPlugin('popover', function () {
      this.create({
        title: popOverTitle,
        content: popOverDescription,
        noOverlay: true,
        position: function (box) {
          box.style.top = event.pageY + 'px';
          box.style.left = event.clientX + 'px';
          box.style.margin = 0;
          box.style.opacity = 1;
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
