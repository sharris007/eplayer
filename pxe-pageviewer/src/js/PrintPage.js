import '../scss/pageviewer.scss';
import React        from 'react';
import ReactDOM     from 'react-dom';
import replaceAllRelByAbs from './ConstructUrls';
const _CONTAINER_ID = Symbol('container_id');

/**
 * @class PopoutWindow
 */
export default class PopoutWindow extends React.Component {

  /**
   * @type {{title: *, url: *, onClosing: *, options: *, window: *, containerId: *}}
   */
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    onClosing: React.PropTypes.func,
    options: React.PropTypes.object,
    window: React.PropTypes.object,
    containerId: React.PropTypes.string,
    children: React.PropTypes.element
  };

  state = {
    openedWindow: null
  };

  defaultOptions = {
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    status: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'yes',
    width: 500,
    height: 400,
    top: (o, w) => ((w.innerHeight - o.height) / 2) + w.screenY,
    left: (o, w) => ((w.innerWidth - o.width) / 2) + w.screenX
  };

  /**
   * @constructs PoppoutWindow
   * @param props
   */
  constructor(props){
    super(props);
    this[_CONTAINER_ID] = props.containerId || 'popout-content-container';
    this.closeWindow = this.closeWindow.bind(this);
  }

  /**
   * Override default id if we get given one
   * @param props
   */
  componentWillReceiveProps(props){
    props.containerId && (this[_CONTAINER_ID] = props.containerId);
  }

  componentWillUnmount(){
    this.closeWindow();
  }

  isChrome = () =>{
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;    
		var isChrome = !!window.chrome && !isOpera;
		return 	isChrome;		
	}
	isMozilla = () => {
		if((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (navigator.appName == "Netscape")){
	        return true;
	      } else {
			return false;
		}
	}

  componentDidMount(){
    let popoutWindow,
        container;

    const options      = Object.assign({}, this.defaultOptions, this.props.options),
          ownerWindow  = this.props.window || window,
          openedWindow = {
            update(newComponent){
              ReactDOM.render(newComponent, container);
            },
            close(){
              popoutWindow && popoutWindow.close();
            }
          };

    if (!ownerWindow) {
      // If we have no owner windows, bail. Likely server side render
      return;
    }

    const createOptions = () => {
      const ret = [];
      for (let key in options){
        options.hasOwnProperty(key) && ret.push(key + '=' + (
            typeof options[key] === 'function' ?
              options[key].call(this, options, ownerWindow) :
              options[key]
          )
        );
      }
      return ret.join(',');
    };

    popoutWindow = ownerWindow.open(this.props.url || 'about:blank', this.props.title, createOptions());

    popoutWindow.onbeforeunload = () =>{
      container && ReactDOM.unmountComponentAtNode(container);
      this.windowClosing();
    };
    // Close any open popouts when page unloads/refeshes
    ownerWindow.addEventListener('unload', this.closeWindow);

    const onloadHandler = () =>{
      if (container){
        if (popoutWindow.document.getElementById(this[_CONTAINER_ID])) return;

        ReactDOM.unmountComponentAtNode(container);
        container = null;
      }

      popoutWindow.document.title = this.props.title;
      container = popoutWindow.document.createElement('div');
      container.id = this[_CONTAINER_ID];
      popoutWindow.document.body.appendChild(container);
      const url = this.props.baseUrl+this.props.printUrl;
      const getPageResponce = new Request(url, {
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });
      fetch(getPageResponce , {
          method: 'get'
        }).then((response) => {
          return response.text();
        }).then((text) => {
          let data = replaceAllRelByAbs(text, this.props.baseUrl+this.props.printUrl.substring(0, this.props.printUrl.lastIndexOf('/')));
         
          let iframe = document.createElement('iframe');
              iframe.id='printFrame';
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              iframe.scrolling= 'no'; 
              iframe.style.border="0";
              
              popoutWindow.document.getElementById('popout-content-container').appendChild(iframe)
              var iframeObj=popoutWindow.document.getElementById(iframe.id);
			  var iframeDoc=iframeObj.contentDocument;
			  iframeDoc.open();
              iframeDoc.write(data);
              iframeDoc.close();

              setTimeout(function(){
					var currentIndex="";
					iframeObj.style.height = iframeObj.contentWindow.document.body.scrollHeight + 30+ 'px';
					//if(this.isChrome()){
					// var customcontent = "<tfoot><tr><td style='border:none !important;'><h1 style='color:green;'>"+footerContent()+"</h1></td></tr></tfoot>";
					console.log("***", iframe);
					//$('#printFrame').contents().find('body').remove();
					$(iframe).contents().find('body').append('<div id="watermark"><p>Not for Distribution</p></div>');
					$('#printFrame').contents().find('body').wrap("<td style='border:none !important;' id='iframecontentTD'></td>");
					$('#printFrame').contents().find('#iframecontentTD').wrap("<tr class='content-row' id='iframecontentTR'></tr>");
					$('#printFrame').contents().find('#iframecontentTR').wrap("<tbody id='iframecontentTbody'></tr>");
					$('#printFrame').contents().find('#iframecontentTbody').wrap("<table class='iframe-table' id='iframecontentTable'></table>");
					//$('#printFrame').contents().find('table').prepend(customcontent);
					$('#printFrame').contents().find('body').append('<div id="watermark"><p>Not for Distribution</p></div>');
					//}
				},3000);
				setTimeout(function() {
					//$('#printFrame').height(popoutWindow.document.getElementById("printFrame").contentWindow.document.getElementById('iframecontentTable').scrollHeight+ 30);
				}, 3000);

              popoutWindow.document.getElementById("printId").addEventListener("click", function(){
			       popoutWindow.print();

			    });
             ReactDOM.render(this.props.children, container);

        }).catch(() => {
          //console.log(err);
      });


      
    };

    popoutWindow.onload = onloadHandler;
    // Just in case that onload doesn't fire / has fired already, we call it manually if it's ready.
    popoutWindow.document.readyState === 'complete' && onloadHandler();

    this.setState({openedWindow});
    
  }

  closeWindow(){
    this.state.openedWindow && this.state.openedWindow.close();
    (this.props.window || window).removeEventListener('unload', this.closeWindow);
  }

  windowClosing(){
    this.props.onClosing && this.props.onClosing();
  }

  /**
   * Bubble changes
   */
  componentDidUpdate(){
    // For SSR we might get updated but there will be no openedWindow. Make sure openedWIndow exists before calling
    this.state.openedWindow && this.state.openedWindow.update(this.props.children);
  }

  render(){
    return <div></div>;
  }

}
