import {MoreInfoPopUpClasses} from '../../const/PopUpClasses';

export class BindMoreInfoCallBacks {
    constructor(props) {
      if (props.glossaryCollection && props.glossaryCollection.length > 0) {
        this.popUpCollection = props.glossaryCollection;
      } else {
        this.popUpCollection = [];
      }
      this.bindMoreInfoCallBacks(props);
    }

    bindMoreInfoCallBacks(props) {
      const bookDiv =  props.node.contentDocument;
      MoreInfoPopUpClasses.forEach((classes) => {
        //bookDiv.querySelectorAll(classes).forEach((item) => {
        const bookDivQuerySelectorClasses = bookDiv.querySelectorAll(classes);
        for (let i=0;i<bookDivQuerySelectorClasses.length;i++) {
          const popOverCollection = {};
          const moreInfoIconDOM = bookDivQuerySelectorClasses[i].parentElement;
          let hrefId = '';
          switch (classes) {
          case '.lc_ec_aside' : {
            hrefId =  moreInfoIconDOM.href ? moreInfoIconDOM.href.split('#')[1] : bookDivQuerySelectorClasses[i].href.split('#')[1];
            popOverCollection.popOverTitle = bookDiv.getElementById(hrefId).getElementsByTagName('h2')[0].innerHTML;
            break;
          }
          case 'a.noteref.noteref_footnote' : {
            if (moreInfoIconDOM.href) {
              hrefId = moreInfoIconDOM.href.split('#')[1];
            } else if (moreInfoIconDOM.children[0].href) {
              hrefId = moreInfoIconDOM.children[0].href.split('#')[1];
            } else if (moreInfoIconDOM.querySelector('a')) {
              hrefId = moreInfoIconDOM.querySelector('a').href.split('#')[1];
            } else {
              hrefId = moreInfoIconDOM.parentElement.href.split('#')[1];
            }
            break;
          }
          case 'a.noteref.noteref_footnote_symboled' : {
            hrefId = (moreInfoIconDOM.children[0] && moreInfoIconDOM.children[0].href) ? moreInfoIconDOM.children[0].href.split('#')[1]: '';
            break;
          }           
          }
          if (hrefId) {
            const popOverDescription = bookDiv.getElementById(hrefId).getElementsByTagName('p');
            popOverCollection.popOverDescription = popOverDescription.length > 0 ?  popOverDescription[0].innerHTML : '';
          } else {
            popOverCollection.popOverDescription = moreInfoIconDOM.children[0].innerHTML;
          }
          this.popUpCollection.push({'popOverCollection' : popOverCollection, 'item' : bookDivQuerySelectorClasses[i]});
        }
        //});
      });
      console.log(this.popUpCollection)
      window.renderPopUp(this.popUpCollection);
    }
}
