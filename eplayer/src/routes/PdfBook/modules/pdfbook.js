// import fetch from 'isomorphic-fetch'; /* isomorphic-fetch is third party library used for making ajax call like axios. */
// import map from 'lodash/map'; /* lodash is a JavaScript utility library delivering modularity, performance and map is method used for iterating the array or object. */
import axios from 'axios'; /* axios is third party library, used to make ajax request. */
import Hawk from 'hawk';
import find from 'lodash/find';
import { clients } from '../../../components/common/client'; /* Importing the client file for framing the complete url, since baseurls are stored in client file. */


// ------------------------------------
// Constants
// ------------------------------------

// Created Action Constant for BOOKMARKS, TOC, GO_TO_PAGE and so on.
export const REQUEST_BOOKMARKS = 'REQUEST_BOOKMARKS';
export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';
export const REQUEST_TOC = 'REQUEST_TOC';
export const RECEIVE_TOC = 'RECEIVE_TOC';
export const GO_TO_PAGE = 'GO_TO_PAGE';
export const RECEIVEBOOKINFO_PENDING = 'RECEIVEBOOKINFO_PENDING';
export const RECEIVEBOOKINFO_REJECTED = 'RECEIVEBOOKINFO_REJECTED';
export const RECEIVEBOOKINFO_FULFILLED = 'RECEIVEBOOKINFO_FULFILLED';
export const RECEIVE_PAGE_INFO = 'RECEIVE_PAGE_INFO';
export const RECEIVE_USER_INFO_PENDING = 'RECEIVE_USER_INFO_PENDING';
export const RECEIVE_USER_INFO_REJECTED = 'RECEIVE_USER_INFO_REJECTED';
export const RECEIVE_USER_INFO_FULFILLED = 'RECEIVE_USER_INFO_FULFILLED';
export const SAVE_HIGHLIGHT = 'SAVE_HIGHLIGHT';
export const REQUEST_HIGHLIGHTS = 'REQUEST_HIGHLIGHTS';
export const RECIEVE_HIGHLIGHTS = 'RECIEVE_HIGHLIGHTS';
export const REMOVE_HIGHLIGHT = 'REMOVE_HIGHLIGHT';
export const LOAD_ASSERT_URL = 'LOAD_ASSERT_URL';
export const EDIT_HIGHLIGHT = 'EDIT_HIGHLIGHT';
export const REQUEST_REGIONS = 'REQUEST_REGIONS';
export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';
export const REQUEST_CUSTOM_ICONS = 'REQUEST_USER_ICONS';
export const RECEIVE_CUSTOM_ICONS = 'RECEIVE_CUSTOM_ICONS';

export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const GET = 'GET';

// ------------------------------------
// Calling Actions creators based on Types. .
// ------------------------------------
export function request(component) {
  switch (component) {
    case 'bookmarks':
      return { type: REQUEST_BOOKMARKS };
    case 'toc':
      return { type: REQUEST_TOC };
    case 'highlights' :
      return { type: REQUEST_HIGHLIGHTS };
    case 'regions' :
      return {type: REQUEST_REGIONS};
    case 'userIcons' :
      return {type : REQUEST_CUSTOM_ICONS};
    default:
      return {};
  }
}
function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function createAuthorizationToken(relativeURL, method) {
  const credentials = {
    id: 'tArkNWL2dK',
    key: 'Fc0C9w05bZy6U9TB7wN6CBgKyM32yk6Q',
    algorithm: 'sha256'
  };


  const baseUrl = clients.readerApi.defaults.baseURL;
  const uri = baseUrl + relativeURL;
  const header = Hawk.client.header(uri, method, { credentials,
    ext: '',
    timestamp: Math.round(Date.now() / 1000),
    nonce: randomString(6) });
  const authorizationVal = header.field;

  const authorizationHeaderVal = authorizationVal.replace('Hawk id=', 'ReaderPlus key=');
  return authorizationHeaderVal;
}

/* Method for fetching the bookmarks from Redaer Api by passing the below parameters. */
export function fetchBookmarksUsingReaderApi(bookId, shared, courseId, userId, Page) {
  const bookState = {
    bookmarks: [],
    isFetching: {
      bookmarks: true
    }
  };
  const authorizationHeaderVal = createAuthorizationToken('/bookmark?'
    + `includeShared=${shared}&userId=${userId}&bookId=${bookId}&courseId=${courseId}`, 'GET');

  /* Dispatch is part of middleware used to dispatch the action, usually used in Asynchronous Ajax call.*/
  return (dispatch) => {
    dispatch(request('bookmarks'));

    return clients.readerApi.get(`/bookmark?includeShared=${shared}&`
      + `userId=${userId}&bookId=${bookId}&courseId=${courseId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: authorizationHeaderVal
        }
      }).then((response) => {
        if (response.status >= 400) {
          bookState.isFetching.bookmarks = false;
          return dispatch({ type: RECEIVE_BOOKMARKS, bookState });
        }
        return response.data;
      })
    .then((bookmarkResponse) => {
      if (bookmarkResponse.data.length) {
        bookmarkResponse.data.forEach((bookmark) => {
          const date = new Date(bookmark.updatedTime * 1000);
          const extID = Number(bookmark.externalId);

          const bmObj = {
            id: extID,
            bkmarkId: bookmark.id,
            userId: bookmark.userId,
            bookId: bookmark.bookId,
            pageId: bookmark.pageId,
            pageNo: bookmark.pageNo,
            createdTimestamp: date,
            title: `${Page} ${bookmark.pageNo}`,
            uri: extID,
            externalId: extID
          };
          bookState.bookmarks.push(bmObj);
        });
      }
      bookState.bookmarks.sort((bkm1, bkm2) => bkm1.uri - bkm2.uri);
      bookState.isFetching.bookmarks = false;
      return dispatch({ type: RECEIVE_BOOKMARKS, bookState });
    });
  };
}

/* Created action creator for addBookmarkUsingReaderApi. */
export function addBookmarkUsingReaderApi(userId, bookId, pageId, pageNo, externalId, courseId, shared, Page) {
  const authorizationHeaderVal = createAuthorizationToken('/bookmark', 'POST');

  clients.readerApi.defaults.headers.Authorization = authorizationHeaderVal;

  const data = {
    userId,
    bookId,
    pageId,
    pageNo,
    courseId,
    shared,
    externalId
  };

  let bmObj;

  return (dispatch) => {
    dispatch(request('bookmarks'));

    return clients.readerApi.post('/bookmark', data)
    .then((response) => {
      if (response.status >= 400) {
        // console.log(`Add bookmark error: ${response.statusText}`);
      }
      return response.data;
    }).then((bookmarkResponse) => {
      if (bookmarkResponse !== undefined) {
        const date = new Date(bookmarkResponse.updatedTime * 1000);
        const extID = Number(bookmarkResponse.externalId);

        bmObj = {
          id: extID,
          bkmarkId: bookmarkResponse.id,
          userId: bookmarkResponse.userId,
          bookId: bookmarkResponse.bookId,
          pageId: bookmarkResponse.pageId,
          pageNo: bookmarkResponse.pageNo,
          createdTimestamp: date,
          title: `${Page} ${bookmarkResponse.pageNo}`,
          uri: extID,
          externalId: extID
        };
      }
      return dispatch({ type: ADD_BOOKMARK, bmObj });
    });
  };
}


/* Method for deleting the selected bookmark. */
export function removeBookmarkUsingReaderApi(bookmarkId) {
  const authorizationHeaderVal = createAuthorizationToken(`/bookmark/${bookmarkId}`, 'DELETE');

  return (dispatch) => {
    dispatch(request('bookmarks'));
    return clients.readerApi.delete(`/bookmark/${bookmarkId}`, {
      headers: {
        Authorization: authorizationHeaderVal
      }
    }).then((response) => {
      if (response.status >= 400) {
         // console.log(`Error in remove bookmark: ${response.statusText}`)
      }
      return dispatch({ type: REMOVE_BOOKMARK, bookmarkId });
    });
  };
}

/* Method for creating node in Toc. */
function Node() {
  this.id = '';
  this.title = '';
  this.children = [];
  this.urn = '';
}

function flatten3(input, finalChildlist) {
  let childlist = [];
  let finalChildList = finalChildlist;
  if (input.children !== undefined && input.children.length !== 0) {
    const firstNode = new Node();
    firstNode.id = input.id;
    firstNode.title = input.title;
    firstNode.urn = input.urn;
    childlist.push(firstNode);
    finalChildList = finalChildList.concat(input);
    input.children.forEach((node) => {
      const templist = flatten3(node, finalChildList);
      if (templist instanceof Array) {
        finalChildList = templist;
      } else {
        childlist = childlist.concat(templist);
      }
    });
    let j;
    for (let i = 0; i < finalChildList.length; i++) {
      if (input.id === finalChildList[i].id && input.urn === finalChildList[i].urn
          && input.title === finalChildList[i].title) {
        j = i;
        break;
      }
    }
    finalChildList[j].children = childlist;
  } else {
    const output = new Node();
    output.id = input.id;
    output.title = input.title;
    output.children = input.children;
    output.urn = input.urn;
    return output;
  }
  return finalChildList;
}

function flatten2(input, finalChildList) {
  if (input.children !== undefined && input.children.length !== 0) {
    return flatten3(input, finalChildList);
  }

  return input;
}

function flatten1(input) {
  let finalChildList = [];
  input.forEach((node) => {
    if (node.children.length !== 0) {
      const child1 = [];
      const firstNode = new Node();
      firstNode.id = node.id;
      firstNode.title = node.title;
      firstNode.urn = node.urn;
      child1.push(firstNode);
      finalChildList = finalChildList.concat(node);
      node.children.forEach((kids) => {
        const child = flatten2(kids, finalChildList);
        if (child instanceof Array) {
          finalChildList = child;
        } else {
          child1.push(child);
        }
      });
      let j;
      for (let i = 0; i < finalChildList.length; i++) {
        if (node.id === finalChildList[i].id && node.urn === finalChildList[i].urn
          && node.title === finalChildList[i].title) {
          j = i;
          break;
        }
      }
      finalChildList[j].children = child1;
    } else {
      finalChildList.push(node);
    }
  });
  return finalChildList;
}

/* Method for constructing tree for Toc. */
function constructTree(input) {
  const output = new Node();
  output.id = input.i;
  output.title = input.n;
  if (input.lv !== undefined) {
    output.urn = input.lv.pageorder;
  }
  if (input.be !== undefined) {
    if (input.be.length === undefined) {
      output.children.push(
            constructTree(input.be));
    } else {
      input.be.forEach((node) => {
        output.children.push(
               constructTree(node));
      });
    }
  }
  return output;
}

/* Method for fetching Toc list by passing following parameters. */
export function fetchTocAndViewer(bookId, authorName, title,
                                  thumbnail, bookeditionid, sessionKey, bookServerURL,
                                  hastocflatten, roleTypeID) {
  const bookState = {
    toc: {
      content: {},
      child: []
    },
    viewer: {},
    isFetching: {
      toc: true,
      viewer: true
    },
    childern: {}
  };
  return (dispatch) => {
    dispatch(request('toc'));
    // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
    return axios.get(`${bookServerURL}/ebook/ipad/getbaskettocinfo?`
      + `userroleid=${roleTypeID}&bookid=${bookId}&language=en_US`
      + `&authkey=${sessionKey}&bookeditionid=${bookeditionid}&basket=toc`,
      {
        timeout: 20000
      })
    .then((response) => {
      response.data.forEach((allBaskets) => {
        const basketData = allBaskets.basketsInfoTOList;
      // bookState.toc.content.bookId = basketData[0].bookID || '';
        bookState.toc.content.id = basketData[0].bookID || '';
      // bookState.toc.showDuplicateTitle = true;
        bookState.toc.content.mainTitle = title || 'Sample Title';
        bookState.toc.content.author = authorName || 'Saha/Rai/Mahapatra/Pujari';
        bookState.toc.content.thumbnail = thumbnail
        ||
        'http://view.cert1.ebookplus.pearsoncmg.com/ebookassets/'
        + 'ebookCM21254346/assets/1256799653_Iannone_thumbnail.png';
        bookState.toc.content.list = [];
        basketData.forEach((tocLevel1) => {
          const tocLevel1ChildData = tocLevel1.document;
          const tocLevel1ChildList = [];
          tocLevel1ChildData.forEach((tocLevel2) => {
            const tocLevel2ChildData = tocLevel2.bc.b.be;
            if (tocLevel2ChildData.length === undefined) {
              const childList = constructTree(tocLevel2ChildData);
              tocLevel1ChildList.push(childList);
            } else {
              tocLevel2ChildData.forEach((tocLevel3) => {
                const childList = constructTree(tocLevel3);
                tocLevel1ChildList.push(childList);
              });
            }
          });
        /* var tocLevel_1_Obj = new Node();
        tocLevel_1_Obj.id=tocLevel1.basketID;
        tocLevel_1_Obj.title=tocLevel1.name;
        tocLevel_1_Obj.children=tocLevel1ChildList;*/
          if (hastocflatten === 'Y') {
            bookState.toc.content.list = flatten1(tocLevel1ChildList);
          } else {
            bookState.toc.content.list = tocLevel1ChildList;
          }

        // bookState.toc.content.list=tocLevel1ChildList;
        // bookState.toc.content.list=flatten1(tocLevel1ChildList);
        });
      });
      bookState.isFetching.toc = false;
      dispatch({ type: RECEIVE_TOC, bookState });
    });
  };
}

/* Created Action creator for navigating the different pages from current page. */
export function goToPage(pageId) {
   // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
  return (dispatch) => {
    dispatch({ type: GO_TO_PAGE, pageId });
  };
}

/* Created Action creator for fetching all book detail. */
export function fetchBookInfo(bookid, sessionKey, userid, bookServerURL, roleTypeId) {
  let roleTypeID = roleTypeId;
  if (roleTypeID === undefined) {
    roleTypeID = 2;
  }

   // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
  return {
    type: 'RECEIVEBOOKINFO',
    payload: axios.get(`${bookServerURL}/ebook/ipad/getuserbookinfo?`
      + `userid=${userid}&bookid=${bookid}&userroleid=${roleTypeID}&authkey=${sessionKey}&outputformat=JSON`),
    timeout: 20000
  };
}
/* Created Action creator for getting page details by page number */
export function fetchPagebyPageNumber(userid, roleTypeID, bookid, bookeditionid,
  pageNo, sessionKey,bookServerURL) {
  const bookState = {
    bookInfo: {
      pages: []
    }
  };
  return dispatch =>
     // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
     axios.get(`${bookServerURL}/ebook/ipad/getpagebybookpagenumber?`
      + `userid=${userid}&userroleid=${roleTypeID}&bookid=${bookid}&`
      + `bookeditionid=${bookeditionid}&bookpagenumbers=${pageNo}&authkey=${sessionKey}&outputformat=JSON`,
       {
         timeout: 20000
       })
    .then((response) => {
      if (response.status >= 400) {
        // console.log(`FetchPage info error: ${response.statusText}`);
      } else if (response.data.length) {
        response.data.forEach((jsonData) => {
          const pages = jsonData.viewerPageInfoRestTO;
          pages.forEach((page) => {
            const pageObj = {

            };
            pageObj.pageid = page.pageID;
            pageObj.bookid = page.bookID;
            pageObj.pagenumber = page.bookPageNumber;
            pageObj.thumbnailpath = page.thumbnailFilePath;
            pageObj.pageorder = page.pageOrder;
            pageObj.bookeditionid = page.bookEditionID;
            pageObj.chaptername = page.chapterName;
            pageObj.isbookmark = page.isBookmark;
            pageObj.pdfPath = page.pdfPath;
            bookState.bookInfo.pages.push(pageObj);
          });
        });
      }
      dispatch({ type: 'RECEIVE_PAGE_INFO', bookState });
    // loadPdfPageCallback(pageIndexToLoad);
    });
}
/* Created Action creator for getting page details by page order */
export function fetchPageInfo(userid, userroleid, bookid, bookeditionid,
  pageIndexToLoad, totalPagesToHit, sessionKey, bookServerURL, loadPdfPageCallback, roleTypeID) {
  const bookState = {
    bookInfo: {
      pages: []
    }
  };
  return dispatch =>
     // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
     axios.get(`${bookServerURL}/ebook/ipad/getpagebypageorder?`
      + `userid=${userid}&userroleid=${roleTypeID}&bookid=${bookid}&`
      + `bookeditionid=${bookeditionid}&listval=${totalPagesToHit}&authkey=${sessionKey}&outputformat=JSON`,
       {
         timeout: 20000
       })
    .then((response) => {
      if (response.status >= 400) {
        // console.log(`FetchPage info error: ${response.statusText}`);
      } else if (response.data.length) {
        response.data.forEach((jsonData) => {
          const pages = jsonData.viewerPageInfoRestTO;
          pages.forEach((page) => {
            const pageObj = {

            };
            pageObj.pageid = page.pageID;
            pageObj.bookid = page.bookID;
            pageObj.pagenumber = page.bookPageNumber;
            pageObj.thumbnailpath = page.thumbnailFilePath;
            pageObj.pageorder = page.pageOrder;
            pageObj.bookeditionid = page.bookEditionID;
            pageObj.chaptername = page.chapterName;
            pageObj.isbookmark = page.isBookmark;
            pageObj.pdfPath = page.pdfPath;
            bookState.bookInfo.pages.push(pageObj);
          });
        });
      }
      dispatch({ type: 'RECEIVE_PAGE_INFO', bookState });
    // loadPdfPageCallback(pageIndexToLoad);
    });
}
/* Created Action creator for getting regions/hotspots. */
export function fetchRegionsInfo(bookid,bookeditionid,pageorder,sessionKey,bookServerURL){
  const bookState = {
    regions: [],
    isFetching: {
      regions: true
    }
  };
  return (dispatch) => {
    dispatch(request('regions'));
    return axios.get(''+bookServerURL+'/ebook/ipad/getregionsbypageorder?bookid='+bookid+'&bookeditionid='+bookeditionid+'&listval='+pageorder+'&authkey='+sessionKey+'&outputformat=JSON',
  {
  timeout: 20000
  }).then((response) => {
      if (response.status >= 400) 
      {
        console.log(`fetchRegionsInfo error: ${response.statusText}`);
      }
      else if(response.data.length) 
      {
          for (var i=0;i<response.data[0].regionsList.length;i++)
          {
          response.data.forEach((region) => {
          const regionObj= {};
          regionObj.regionID = region.regionsList[i].regionID;
          regionObj.globalBookID=region.regionsList[i].globalBookID;
          regionObj.regionTypeID=region.regionsList[i].regionTypeID;
          regionObj.guid=region.regionsList[i].guid;
          regionObj.roleTypeID=region.regionsList[i].roleTypeID;
          regionObj.isicon=region.regionsList[i].isicon;
          regionObj.iconTypeID=region.regionsList[i].iconTypeID;
          regionObj.page=region.regionsList[i].page;
          regionObj.x=region.regionsList[i].x;
          regionObj.y=region.regionsList[i].y;
          regionObj.width=region.regionsList[i].width;
          regionObj.height=region.regionsList[i].height;
          regionObj.name=region.regionsList[i].name;
          regionObj.description=region.regionsList[i].description;
          regionObj.note=region.regionsList[i].note;
          regionObj.linkSearch=region.regionsList[i].linkSearch;
          regionObj.linkTypeID=region.regionsList[i].linkTypeID;
          regionObj.linkTypeLocation=region.regionsList[i].linkTypeLocation;
          regionObj.linkValue=region.regionsList[i].linkValue;
          regionObj.linkX=region.regionsList[i].linkX;
          regionObj.linkY=region.regionsList[i].linkY;
          regionObj.linkWidth=region.regionsList[i].linkWidth;
          regionObj.linkHeight=region.regionsList[i].linkHeight;
          regionObj.mediaWidth=region.regionsList[i].mediaWidth;
          regionObj.mediaHeight=region.regionsList[i].mediaHeight;
          regionObj.glossaryEntryID=region.regionsList[i].glossaryEntryID;
          regionObj.imagePath=region.regionsList[i].imagePath;
          regionObj.useCustom=region.regionsList[i].useCustom;
          regionObj.readyToPublish=region.regionsList[i].readyToPublish;
          regionObj.sequenceId=region.regionsList[i].sequenceId;
          regionObj.platformID=region.regionsList[i].platformID;
          regionObj.isIpad=region.regionsList[i].isIpad;
          regionObj.hasPlatformIcon=region.regionsList[i].hasPlatformIcon;
          regionObj.regionType=region.regionsList[i].regionType;
          regionObj.linkType=region.regionsList[i].linkType;
          regionObj.iconType=region.regionsList[i].iconType;
          regionObj.roleType=region.regionsList[i].roleType;
          regionObj.alternateMediaLink=region.regionsList[i].alternateMediaLink;
          regionObj.transparent=region.regionsList[i].transparent;
          regionObj.pearsonSmartPlayer=region.regionsList[i].pearsonSmartPlayer;
          regionObj.downloadable=region.regionsList[i].downloadable;
          regionObj.isBrowserView=region.regionsList[i].isBrowserView;
          regionObj.assetSize=region.regionsList[i].assetSize;
          regionObj.assetLastModifiedDate=region.regionsList[i].assetLastModifiedDate;
          regionObj.downloadURL=region.regionsList[i].downloadURL;
          bookState.regions.push(regionObj);
        
        })
        }
      }
      bookState.isFetching.regions=false;
      return dispatch({ type: RECEIVE_REGIONS,bookState});
    })
    }
  }
 /* Created Action creator for getting user uplaoded custom regions/hotspots icons. */
 export function fetchUserIcons(bookid,sessionKey,bookServerURL){
  const bookState = {
    userIcons: [],
    isFetching: {
      userIcons: true
    }
  };
  return (dispatch) => {
    dispatch(request('userIcons'));
    return axios.get(''+bookServerURL+'/ebook/ipad/getbookicons?bookid='+bookid+'&authkey='+sessionKey+'&outputformat=JSON',
  {
  timeout: 20000
  }).then((response) => {
      if (response.status >= 400) 
      {
        console.log(`fetchUserIcons error: ${response.statusText}`);
      }
      else if(response.data.length) 
      {
          for (var i=0;i<response.data[0].bookIconTOList.length;i++)
          {
          response.data.forEach((customBookIcon) => {
          const userIconObj= {};
          userIconObj.iconTypeID = customBookIcon.bookIconTOList[i].iconTypeID;
          userIconObj.imagePath=customBookIcon.bookIconTOList[i].imagePath;
          userIconObj.useCustom=customBookIcon.bookIconTOList[i].useCustom;
          bookState.userIcons.push(userIconObj);
        })
        }
      }
      bookState.isFetching.userIcons=false;
      return dispatch({ type: RECEIVE_CUSTOM_ICONS,bookState});
    })
    }
  }
 /* Created Action creator for fetching user information. */
export function fetchUserInfo(globaluserid, bookid, uid, ubd, ubsd, sessionKey, bookServerURL) {
    // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
  return {
    type: 'RECEIVE_USER_INFO',
    payload: axios.get(`${bookServerURL}/ebook/ipad/synchbookwithbookshelfserverdata?`
      + `globaluserid=${globaluserid}&bookid=${bookid}&uid=${ubd}&ubd=${ubd}&ubsd=${ubsd}`
      + `&authkey=${sessionKey}`),
    timeout: 20000
  };
}

/* Created Action creator for feching highlight details from Reader Api. */
export function fetchHighlightUsingReaderApi(userId, bookId, shared, courseId) {
  const bookState = {
    highlights: [],
    isFetching: {
      highlights: true
    }
  };

  // var uri = 'https://api-sandbox.readerplatform.pearson-intl.com/highlight?includeShared=true&userId='+userId+'&bookId='+bookId+'&pageId='+pageId;
  const authorizationHeaderVal = createAuthorizationToken(`/highlight?includeShared=${shared}`
    + `&limit=100&userId=${userId}&bookId=${bookId}&courseId=${courseId}`, 'GET');
  return (dispatch) => {
    dispatch(request('highlights'));
    // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
    return clients.readerApi.get(`/highlight?includeShared=${shared}&limit=100`
      + `&userId=${userId}&bookId=${bookId}&courseId=${courseId}`, {
        headers: {
          Authorization: authorizationHeaderVal
        }
      }).then((response) => {
        if (response.status >= 400) {
          bookState.isFetching.highlights = false;
          return dispatch({ type: RECIEVE_HIGHLIGHTS, bookState });
        }
        return response.data;
      }).then((response) => {
        if (response.data.length) {
          response.data.forEach((highlight) => {
            const hlObj = {

            };
            const time = new Date(highlight.updatedTime * 1000);
            const pageid = Number(highlight.pageId);
            hlObj.userId = highlight.userId;
            hlObj.bookId = highlight.bookId;
            hlObj.pageId = pageid;
            hlObj.courseId = highlight.courseId;
            hlObj.shared = highlight.shared;
            hlObj.highlightHash = highlight.highlightHash;
            hlObj.comment = highlight.note;
            hlObj.text = highlight.selectedText;
            hlObj.color = highlight.colour;
            hlObj.originalColor = highlight.colour;
            hlObj.id = highlight.id;
            hlObj.pageNo = highlight.pageNumber;
            hlObj.meta = highlight.meta;
            hlObj.author = highlight.meta.author;
            hlObj.creationTime = highlight.creationTime;
            hlObj.time = time;
            hlObj.pageIndex = 1;        // For Foxit

            bookState.highlights.push(hlObj);
          });
        }
        bookState.highlights.sort((hl1, hl2) => hl2.time - hl1.time);
        bookState.isFetching.highlights = false;
        return dispatch({ type: RECIEVE_HIGHLIGHTS, bookState });
      });
  };
}
/* Method for saving the highLight selected by user. */
export function saveHighlightUsingReaderApi(userId, bookId, pageId, pageNo,
  courseId, shared, highlightHash, note, selectedText, colour, meta, currentPageId) {
  const authorizationHeaderVal = createAuthorizationToken('/highlight', 'POST');
  const axiosInstance = clients.readerApi;
  axiosInstance.defaults.headers.Authorization = authorizationHeaderVal;
  const data = {
    userId,
    bookId,
    pageId: currentPageId,
    pageNo,
    courseId,
    shared,
    highlightHash,
    note,
    selectedText,
    colour,
    meta,
    highlightEngine: 'eT1PDFPlayer'
  };
  return (dispatch) => {
    dispatch(request('highlights'));
    return axiosInstance.post('/highlight', data).then((response) => {
      if (response.status >= 400) {
        // console.log(`error: ${response.statusText}`);
      }
      return response.data;
    }).then((highlightResponse) => {
      let hlObj;
      if (highlightResponse !== undefined) {
        const time = new Date(highlightResponse.updatedTime * 1000);
        // const extID = Number(highlightResponse.externalId);
        const pageid = Number(highlightResponse.pageId);
        hlObj = {
          userId: highlightResponse.userId,
          bookId: highlightResponse.bookId,
          pageId: pageid,
          courseId: highlightResponse.courseId,
          shared: highlightResponse.shared,
          highlightHash: highlightResponse.highlightHash,
          comment: highlightResponse.note,
          text: highlightResponse.selectedText,
          color: highlightResponse.colour,
          originalColor: highlightResponse.colour,
          id: highlightResponse.id,
          pageNo: highlightResponse.pageNo,
          meta: highlightResponse.meta,
          author: highlightResponse.meta.author,
          creationTime: highlightResponse.creationTime,
          time,
          pageIndex: 1       // For Foxit
        };
      }
      dispatch({ type: 'SAVE_HIGHLIGHT', hlObj });
      return hlObj;
    });
  };
}
/* Removing highLight from the page for selected area. */
export function removeHighlightUsingReaderApi(id) {
  const authorizationHeaderVal = createAuthorizationToken(`/highlight/${id}`, 'DELETE');
  return (dispatch) => {
    dispatch(request('highlights'));
    // Here axios is getting base url from client.js file and append with rest url and frame. This is similar for all the action creators in this file.
   /* return axios({
      method : 'delete',
      url : 'https://api-sandbox.readerplatform.pearson-intl.com/highlight/'+id,
      headers : {
        Accept : 'application/json',
        Authorization : authorizationHeaderVal
      }
    })*/return clients.readerApi.delete(`/highlight/${id}`, {
      headers: {
        Authorization: authorizationHeaderVal
      }
    }).then((response) => {
      if (response.status >= 400) {
        // console.log(`Error in remove highlight: ${response.statusText}`)
      }
      return dispatch({ type: REMOVE_HIGHLIGHT, id });
    });
  };
}
export function loadAssertUrl(totalPagesToHit, openFile, storeAssertUrl, pages) {
  const bookState = {
    bookInfo: {
      assertUrls: []
    }
  };
  return (dispatch) => {
    const pagesToHit = totalPagesToHit.split(',');
    for (let i = 0; i < pagesToHit.length; i++) {
      const urlObj = {

      };
      if (pagesToHit[i] !== '') {
        const currentPage = find(pages, page => page.pageorder === parseInt(pagesToHit[i], 10));
       // const assertUrlObj = find(assertUrls, obj => obj.pageOrder == currentPage.pageorder);
        // if(assertUrlObj == undefined)
              // {
        urlObj.pageOrder = currentPage.pageorder;
        urlObj.pageNumber = currentPage.pagenumber;
        urlObj.assertUrl = openFile(currentPage.pageorder, currentPage.pdfPath);
        bookState.bookInfo.assertUrls.push(urlObj);

               // }
      }
    }
    dispatch({ type: 'LOAD_ASSERT_URL', bookState });
    storeAssertUrl();
  };
}

export function editHighlightUsingReaderApi(id, note, colour, isShared) {
  const editHightlightURI = `/highlight/${id}`;
  const data = {

  };
  if (note !== undefined) {
    data.note = note;
  }
  if (colour !== undefined) {
    data.colour = colour;
  }
  if (isShared !== undefined) {
    data.shared = isShared;
  }
  const authorizationHeaderVal = createAuthorizationToken(editHightlightURI, 'PUT');
  return (dispatch) => {
    dispatch(request('highlights'));
    return clients.readerApi.put(editHightlightURI, data, {
      headers: {
        Authorization: authorizationHeaderVal
      }
    }).then((response) => {
      if (response.status >= 400) {
        // console.log(`Error in edit highlight: ${response.statusText}`);
      }
      return response.data;
    }).then((highlightResponse) => {
      let highlightObj;
      if (highlightResponse !== undefined) {
        const time = new Date(highlightResponse.updatedTime * 1000);
        const pageid = Number(highlightResponse.pageId);
        highlightObj = {
          userId: highlightResponse.userId,
          bookId: highlightResponse.bookId,
          pageId: pageid,
          courseId: highlightResponse.courseId,
          shared: highlightResponse.shared,
          highlightHash: highlightResponse.highlightHash,
          comment: highlightResponse.note,
          text: highlightResponse.selectedText,
          color: highlightResponse.colour,
          originalColor: highlightResponse.colour,
          id: highlightResponse.id,
          pageNo: highlightResponse.pageNo,
          meta: highlightResponse.meta,
          author: highlightResponse.meta.author,
          creationTime: highlightResponse.creationTime,
          time,
          pageIndex: 1
        };
      }
      return dispatch({ type: EDIT_HIGHLIGHT, highlightObj });
    });
  };
}


// ------------------------------------
// Action Handlers for every action type which is used above.
// ------------------------------------
const ACTION_HANDLERS = {

  [REQUEST_BOOKMARKS]: state => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      bookmarks: true
    }
  }),
  [RECEIVE_BOOKMARKS]: (state, action) => ({
    ...state,
    bookmarks: action.bookState.bookmarks,
    isFetching: {
      ...state.isFetching,
      bookmarks: action.bookState.isFetching.bookmarks
    }
  }),
  [ADD_BOOKMARK]: (state, action) => ({
    ...state,
    bookmarks: [
      ...state.bookmarks,
      {
        id: action.bmObj.id,
        uri: action.bmObj.uri,
        title: action.bmObj.title,
        pageID: action.bmObj.pageId,
        createdTimestamp: action.bmObj.createdTimestamp,
        externalId: action.bmObj.externalId,
        bkmarkId: action.bmObj.bkmarkId
      }
    ].sort((bkm1, bkm2) => bkm1.uri - bkm2.uri),
    isFetching: {
      ...state.isFetching,
      bookmarks: false
    }
  }),
  [REMOVE_BOOKMARK]: (state, action) => ({
    ...state,
    bookmarks: state.bookmarks.filter(bookmark => bookmark.bkmarkId !== action.bookmarkId),
    isFetching: {
      ...state.isFetching,
      bookmarks: false
    }
  }),
  [REQUEST_HIGHLIGHTS]: state => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      highlights: true
    }
  }),
  [RECIEVE_HIGHLIGHTS]: (state, action) => ({
    ...state,
    annTotalData: action.bookState.highlights,
    isFetching: {
      ...state.isFetching,
      highlights: action.bookState.isFetching.highlights
    }
  }),
  [REMOVE_HIGHLIGHT]: (state, action) => ({
    ...state,
    annTotalData: state.annTotalData.filter(highlight => highlight.id !== action.id),
    isFetching: {
      ...state.isFetching,
      highlights: false
    }
  }),
  [SAVE_HIGHLIGHT]: (state, action) => ({
    ...state,
    annTotalData: [
      ...state.annTotalData,
      {
        userId: action.hlObj.userId,
        bookId: action.hlObj.bookId,
        pageId: action.hlObj.pageId,
        author: action.hlObj.author,
        courseId: action.hlObj.courseId,
        shared: action.hlObj.shared,
        highlightHash: action.hlObj.highlightHash,
        comment: action.hlObj.comment,
        text: action.hlObj.text,
        color: action.hlObj.color,
        originalColor: action.hlObj.originalColor,
        id: action.hlObj.id,
        pageNo: action.hlObj.pageNo,
        meta: action.hlObj.meta,
        creationTime: action.hlObj.creationTime,
        time: action.hlObj.time,
        pageIndex: action.hlObj.pageIndex
      }
    ].sort((hl1, hl2) => hl2.time - hl1.time),
    isFetching: {
      ...state.isFetching,
      highlights: false
    }
  }),
  [EDIT_HIGHLIGHT]: (state, action) => ({
    ...state,
    annTotalData: [
      ...state.annTotalData.filter(highlight => highlight.id !== action.highlightObj.id),
      {
        userId: action.highlightObj.userId,
        bookId: action.highlightObj.bookId,
        pageId: action.highlightObj.pageId,
        author: action.highlightObj.author,
        courseId: action.highlightObj.courseId,
        shared: action.highlightObj.shared,
        highlightHash: action.highlightObj.highlightHash,
        comment: action.highlightObj.comment,
        text: action.highlightObj.text,
        color: action.highlightObj.color,
        originalColor: action.highlightObj.originalColor,
        id: action.highlightObj.id,
        pageNo: action.highlightObj.pageNo,
        meta: action.highlightObj.meta,
        creationTime: action.highlightObj.creationTime,
        time: action.highlightObj.time,
        pageIndex: action.highlightObj.pageIndex
      }
    ].sort((hl1, hl2) => hl2.time - hl1.time),
    isFetching: {
      ...state.isFetching,
      highlights: false
    }
  }),
  [REQUEST_TOC]: state => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      toc: true
    }
  }),
  [RECEIVE_TOC]: (state, action) => ({
    ...state,
    toc: action.bookState.toc,
    isFetching: {
      ...state.isFetching,
      toc: action.bookState.isFetching.toc
    }
  }),
  [GO_TO_PAGE]: (state, action) => ({
    ...state,
    viewer: {
      ...state.viewer,
      currentPageId: action.pageId
    }
  }),
  [RECEIVEBOOKINFO_PENDING]: state => ({
    ...state,
    bookinfo: {
      fetching: true,
      fetched: false
    }
  }),
  [RECEIVEBOOKINFO_FULFILLED]: (state, action) => ({
    ...state,
    bookinfo: {
      fetching: false,
      fetched: true,
      userbook: {
        userbookid: action.payload.data[0].userBookTOList[0].userBookID
      },
      book: {
        globalbookid: action.payload.data[0].userBookTOList[0].globalBookID,
        numberOfPages: action.payload.data[0].userBookTOList[0].numberOfPages,
        bookid: action.payload.data[0].userBookTOList[0].bookID,
        bookeditionid: action.payload.data[0].userBookTOList[0].bookEditionID,
        hastocflatten: action.payload.data[0].userBookTOList[0].hastocflatten,
        languageid: action.payload.data[0].userBookTOList[0].languageID,
        roleTypeID: action.payload.data[0].userBookTOList[0].roleTypeID,
        activeCourseID: action.payload.data[0].userBookTOList[0].lastAccessedCourseID,
        version: action.payload.data[0].userBookTOList[0].version
      }
    }
  }),
  [RECEIVEBOOKINFO_REJECTED]: state => ({
    ...state,
    bookinfo: {
      fetching: false,
      fetched: false
    }
  }),
  [RECEIVE_PAGE_INFO]: (state, action) => ({
    ...state,
    bookinfo: {
      ...state.bookinfo,
      pages: state.bookinfo.pages === undefined ?
        action.bookState.bookInfo.pages : state.bookinfo.pages.concat(action.bookState.bookInfo.pages)
    }
  }),
  [RECEIVE_USER_INFO_PENDING]: state => ({
    ...state,
    userInfo: {
      fetching: true,
      fetched: false
    }
  }),
  [RECEIVE_USER_INFO_FULFILLED]: (state, action) => ({
    ...state,
    userInfo: {
      fetching: false,
      fetched: true,
            // ...state.userInfo,
      userid: action.payload.data[0].userid
    }
  }),
  [RECEIVE_USER_INFO_REJECTED]: state => ({
    ...state,
    userInfo: {
      fetching: false,
      fetched: false
    }
  }),
  [LOAD_ASSERT_URL]: (state, action) => ({
    ...state,
    bookinfo: {
      ...state.bookinfo,
      assertUrls: state.bookinfo.assertUrls === undefined ?
      action.bookState.bookInfo.assertUrls : state.bookinfo.assertUrls.concat(action.bookState.bookInfo.assertUrls)
    }
  }),
  [REQUEST_REGIONS]: state => ({
    ...state,
    isFetching: {
      ...state.isFetching,
      regions: true
    }
  }),
  [RECEIVE_REGIONS]: (state, action) => ({
    ...state,
    regions: action.bookState.regions,
    isFetching: {
      ...state.isFetching,
      regions: action.bookState.isFetching.regions
    }
  }),
  [REQUEST_CUSTOM_ICONS]: state => ({
    ...state,
    isFetching : {
      ...state.isFetching,
      userIcons:true
    }
  }),
  [RECEIVE_CUSTOM_ICONS]: (state,action) => ({
    ...state,
    userIcons: action.bookState.userIcons,
    isFetching: {
      ...state.isFetching,
      userIcons: action.bookState.isFetching.userIcons
    }
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  annotations: [],
  bookmarks: [],
  annTotalData: [],
  regions:[],
  userIcons:[],
  preferences: {},
  toc: {},
  viewer: {},
  isFetching: {
    annotations: false,
    preferences: false,
    bookmarks: false,
    toc: false,
    regions: false,
    userIcons: false,
    viewer: false
  },
  error: null,
  bookinfo: {
    fetching: false,
    fetched: false,
    pages: []
  },
  userInfo: {
    fetching: false,
    fetched: false,
    userid: ''
  }
};

/* Method for calculating the new state for dispatched actions. */
export default function book(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
