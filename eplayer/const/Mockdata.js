import {resources , domain ,typeConstants} from './Settings';
const pxeServiceUrl = resources.links.pxeServiceUrl[domain.getEnvType()];
export const pageDetails = {
  renderId: 'pxeViewer',
  locale: 'en-us',
  copyImages: false,
  copyCharLimit: 10,
  crossRefSettings: 'lightbox',
  enablePrintOption: false,
  showPageNo: true,
  orientation: 'horizontal',
  theme: 'black',
  pageFontSize: '50%',
  pageZoom: '',
  enableGoToPage: false,
  includeMathMLLib: true,
  enableAnnotation: true,
  annotationShareable: true,
  clearSearchHighlights: true,
  elementId: 'demo',
  pdfSearch: false,
  allowLightboxFullscreen: false,
  highlightText: 'Deductive reasoning',
  contentId: 'pxe-viewer',
  baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api/item/651da29d-c41d-415e-b8a4-3eafed0057db/1/file/LutgensAtm13-071415-MJ-DW/',
  playListURL: '',
  currentPageURL: '',
  bgColor: 'White',
  endPoints: {
    services: pxeServiceUrl,
    search: 'https://content-service.dev-prsn.com/csg',
    pi: '',
    ingest: 'http://dragonfly.dev-openclass.com/pxereader-cm/api/cm'
  }
};

export const customAttributes = {
  playOrder: 'playOrder',
  href: 'href',
  createdTimestamp: 'createdTimestamp',
  updatedTimestamp: 'updatedTimestamp',
  text: 'text',
  user: 'user',
  context: 'context',
  ranges: 'ranges',
  quote: 'quote',
  shareable: 'shareable'
};

export const pageLoadData = {
       "originatingSystemCode": "ETEXT",
       "activities": [{
               "messageTypeCode": "UserLoadsContent",
               "messageVersion": "1.0.0",
               "namespace": "common",
               "payload": {
                       "environmentCode":"Dev",
                       "messageTypeCode":"UserLoadsContent",
            "originatingSystemCode":"eText",
            "namespaceCode":"Common",
            "messageVersion":"1.0.0",
            "transactionDt":"2017-07-25T15:33:47.651Z",
            "messageTransferType":"LiveStream",
            "messageId":"a9ec17ed-ff26-2814-9cc4-7eddc552f81a",
            "appId":"ETEXT",
            "accessedUsingAppId":"WebApp",    
            "appActivityAreaCode":"Learning",        
            "personId":"urn:udson:pearson.com/pi/prod:user/ffffffff56b90bd7e4b0f8eeaa4655d4",
            "personIdType":"PI",    
            "personRoleCode":"Instructor",
            "organizationId":"6e8bc430-9c3a-11d9-9669-0800200c9a66",
            "organizationIdType":"Organization", 
            "courseId":"urn:udson:pearson.com/pi/prod:course/a62277a21384c79d2f3d638a2cb5b48b3e2b19860",
            "courseIdType":"Instructor",     
            "courseSectionId":"urn:udson:pearson.com/sms/prod:course/a62277a21384c79d2f3d638a2cb5b48b3e2b19860-id_toc2",
            "courseSectionIdType":"PI",    
            "timeCategorization": "Learning",
            "contentId":"a62277a21384c79d2f3d638a2cb5b48b3e2b198601",  
            "contentIdType":"ETEXT",
            "timeOnTaskUuid":"a9ec17ed-ff26-2814-9cc4-7eddc552f81a",    
            "loadDt":"2017-07-25T15:33:47.651Z",
            "datetimeSourceCode":"Client",
            "pageUserNavigatedToUrn":"a90b47db83f2e14a4f313b2c5c88461f2c2917b36",
            "userAgent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "deviceType":"Desktop",
            "operatingSystemCode":"Win32"
               }
       }]
}

