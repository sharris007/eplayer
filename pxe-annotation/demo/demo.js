import AnnotationComponent from '../main';
import injectTapEventPlugin from 'react-tap-event-plugin';

function init() {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();  
   
  const annotationData = [];

  // Create new instance of bookshelf component
  new AnnotationComponent({
    elementId: 'demo',   
    contentId:'demo-content',
    annotationData:annotationData,
    currentPageDetails:{},
    annotationEventHandler:annotationEvent
  });  
}
function annotationEvent(type, data, viewer) {
  console.log(type, data);
}
window.onload = init;
