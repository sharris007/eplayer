import PxePlayerComponent from '../main'; // to demo direct API usage

// When available on npm, consumer usage would be similar to:
// import MyComponent from '@pearson-components/[book-container-component]'
//https://content.openclass.com/eps/sanvan/api/item/138acd10-4c63-4eba-aba6-25f70c1626e5/1/file/pearson_bonds_v13-revel-2/OPS/text/bookmatter-02/bkm2_sec_01.xhtml
function init() {
  new PxePlayerComponent({
    pageDetails:{
      renderId:'pxeViewer',
      locale: 'en-us',
      copyImages: false,
      copyCharLimit: 10,
      crossRefSettings:'lightbox',
      enablePrintOption: false,
      showPageNo:true,
      orientation: 'horizontal',
      theme:'black',
      pageFontSize:'',
      pageZoom:'', 
      enableGoToPage:true,
      includeMathMLLib: true,
      enableAnnotation: true,
      annotationShareable: true,
      clearSearchHighlights: false,
      elementId: 'demo',
      sendPageDetails:onPageChange,
      pdfSearch:false,
      allowLightboxFullscreen:false,
      contentId: 'pxe-viewer',
      onBookLoaded:()=>{},
      highlightText:'',
      bgColor:'', 
      tocUpdated:false,
      baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api/item/542d7ded-e63b-4bc5-9e82-62ccc7c6039c/1/file/LutgensAtm13-071415-MJ-DW/', 
      playListURL:[
        {
          'id': 'a26e4cdc6c5209363b4d4c57b746eb2458da677cb-data-uuid-9cff02fff67b451eababbb406b8bf149',
          'title': 'Cover',
          'playOrder': 2,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/cover.xhtml#data-uuid-9cff02fff67b451eababbb406b8bf149'
        },
        {
          'id': 'ae2edddda303d801d712dae62f4813fb4181a630d-data-uuid-5242a32c29c74f04b63d83a31b6f9a77',
          'title': 'Temperature and Precipitation Extremes Map',
          'playOrder': 3,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep7000496728000000000000000000005_01.xhtml#data-uuid-5242a32c29c74f04b63d83a31b6f9a77'
        },
        {
          'id': 'a1640cdb077fee69688d5384e8f6d5af9a5cea802-data-uuid-c37d44d1fa9b4d519d2dbc682d654f97',
          'title': 'So Many Options for Your Meteorology Class!',
          'playOrder': 4,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep7000496728000000000000000000005.xhtml#data-uuid-c37d44d1fa9b4d519d2dbc682d654f97'
        },
        {
          'id': 'af0b0b5356c0c87a128ad51df64c766ac945d60d6-data-uuid-40f184d6cce64162bc5d474935d04069',
          'title': 'The Perfect Storm of Rich Media & Active Learning Tools',
          'playOrder': 5,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep7000496728000000000000000000038.xhtml#data-uuid-40f184d6cce64162bc5d474935d04069'
        },
        {
          'id': 'a9e7d634537cdc4d6a67906c19ba200066b7072de-data-uuid-5233a60b9d9d47f3ab5222c847891cb7',
          'title': 'The Atmosphere 13e',
          'playOrder': 6,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep700049672800000000000000000e36e.xhtml#data-uuid-5233a60b9d9d47f3ab5222c847891cb7'
        },
        {
          'id': 'a9d5456c618345c31b0bb271d726689d44413e739-data-uuid-f0fba50f22f4423c882bc1f355822738',
          'title': 'Copyright Page',
          'playOrder': 7,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep700049672800000000000000000e37e.xhtml#data-uuid-f0fba50f22f4423c882bc1f355822738'
        },
        {
          'id': 'a32c80caa58bf384ae9157ecf2bf0fb91119b9d1b-c8112a9b2d0c40a782de20c2acde6db2',
          'title': 'Brief Contents',
          'playOrder': 8,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep7000496728000000000000000000116.xhtml#c8112a9b2d0c40a782de20c2acde6db2'
        },
        {
          'id': 'ab81a6b00f813c88038af4a5bbd01da8154c61a1b-ba2df0be79414468bb47c14fe76a300d',
          'title': 'MasteringMeteorology Media',
          'playOrder': 9,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep700049672800000000000000000014f.xhtml#ba2df0be79414468bb47c14fe76a300d'
        },
        {
          'id': 'ad9a1a921dc8ce5797e49c05ce9b6033bc5643fc2-b4a4ba7d4358459d8d1a670a6f0946b5',
          'title': 'Contents',
          'playOrder': 10,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep700049672800000000000000000014f_0.xhtml#b4a4ba7d4358459d8d1a670a6f0946b5'
        },
        {
          'id': 'a6f9be6db2b22124116719dd4f6e496eb7c73c123-data-uuid-c68430459a3d44eeb29adfd1617f5b01',
          'title': 'Preface',
          'playOrder': 11,
          'type':'page',
          'uri': 'OPS/s9ml/front_matter/filep700049672800000000000000000014f_1.xhtml#data-uuid-c68430459a3d44eeb29adfd1617f5b01'
        },
        {
          'id': 'ab23d4d4fd7f50991d83945f076c812a8fda110ce-data-uuid-a249adbb2e5544568e30d7459afc1113',
          'title': '1 Introduction to the Atmosphere',
          'playOrder': 13,
          'type':'page',
          'uri': 'OPS/s9ml/chapter01/filep700049672800000000000000000091e.xhtml#data-uuid-a249adbb2e5544568e30d7459afc1113'
        },
        {
          'id': 'a4061373f1e10cef15bc2bd0fcba0e396d7b5636c-data-uuid-8f5ebddeb60f4bafbd43f852f4d75689',
          'title': '1.1 Focus On the Atmosphere',
          'playOrder': 14,
          'type':'page',
          'uri': 'OPS/s9ml/chapter01/filep7000496728000000000000000000937.xhtml#data-uuid-8f5ebddeb60f4bafbd43f852f4d75689'
        },
        {
          'id': 'a950b51c6df6ba86fbe95a430e1e1d50e36a1d723-d2c7d80879d74e6f9eb7eeb4c2b0287c',
          'title': '1.2 The Nature of Scientific Inquiry',
          'playOrder': 15,
          'type':'page',
          'uri': 'OPS/s9ml/chapter01/filep7000496728000000000000000000996.xhtml#d2c7d80879d74e6f9eb7eeb4c2b0287c'
        }
      ],
      currentPageURL:{
        'id': 'ae2edddda303d801d712dae62f4813fb4181a630d-data-uuid-5242a32c29c74f04b63d83a31b6f9a77',
        'title': 'Temperature and Precipitation Extremes Map',
        'playOrder': 3,
        'type':'page',
        'uri': 'OPS/s9ml/front_matter/filep7000496728000000000000000000005_01.xhtml#data-uuid-5242a32c29c74f04b63d83a31b6f9a77'
      },
      endPoints: {
        'services': 'https://pxe-sdk-qa.stg-openclass.com/services-api/api/3.1',
        'search': 'https://content-service.dev-prsn.com/csg',
        'pi': '',
        'ingest': 'http://dragonfly.dev-openclass.com/pxereader-cm/api/cm'
      }
    }, 
    urlParams:{
      'context' :'1Q98UHDD1E1',
      'user':'epluser'
    },
    applnCallback:()=>{console.log('applnCallback');}
  });
}
function onPageChange(type, data) {
  console.log(type, data);
}
window.onload = init;
