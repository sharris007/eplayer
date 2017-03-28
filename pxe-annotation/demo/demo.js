import AnnotationComponent from '../main';
import injectTapEventPlugin from 'react-tap-event-plugin';

function init() {
  injectTapEventPlugin();  
 const customeAttributes ={
       playOrder: 'playOrder',
       href     :'href',
       createdTimestamp:'createdTimestamp',
       updatedTimestamp:'updatedTimestamp',
       text  :'text',
       ranges :'ranges',
       quote:'quote',
       shareable:'shareable'
   };
  const annotationData = [
    {
      'id': '589c882fc2ef162b33d60ccb',
      'playOrder': 1,
      'href': 'OPS/s9ml/chapter01/filep7000495777000000000000000000752.xhtml',
      'text': 'asdasdas',
      'ranges': [
        {
          'start': '/p',
          'startOffset': 259,
          'end': '/p',
          'endOffset': 268
        }
      ],
      color:'#ccf5fd',
      lastColor:'#55DF49',
      shareable:true,
      'quote': 'ceratele',
      'highlights': [
        {
          'jQuery17207015872935969321': 10
        }
      ]
    },
    {
      'id':'589c882fc2ef162b33d60ccb',
      'playOrder': 1,
      'href': 'OPS/s9ml/chapter01/filep7000495777000000000000000000752.xhtml',
      'text': '',
      'ranges': [
        {
          'start': '/p',
          'startOffset': 471,
          'end': '/p',
          'endOffset': 480
        }
      ],
      color:'#55DF49',
      shareable:false,
      'quote': 'rutrum or',
      'highlights': [
        {
          'jQuery17207015872935969321': 10
        }
      ]
    }
  ];

  // Create new instance of bookshelf component
  new AnnotationComponent({
    elementId: 'demo',   
    contentId:'demo-content',
    annotationData:annotationData,
    shareableAnnotations:true,
    currentPageDetails:{},
    annotationEventHandler:annotationEvent,
    annAttributes:customeAttributes
  });  
}
function annotationEvent(type, data) {
  console.log(type, data);
}
window.onload = init;
