import { resources } from '../../const/Settings';

const messagingUrl = resources.links.messagingUrl;
export const loadPageEvent = (piToken, loadData) => {
  console.log("token$$$$$" , loadData);
  const header = {
     'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Authorization': piToken
  }
  //${messagingUrl[envType]}/messaging/activities
  fetch('https://messaging-publishing-int.dev-prsn.com/messaging/activities', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Authorization': 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE1MDI3MDE2NjAsInN1YiI6ImZmZmZmZmZmNTZiOTBiZDdlNGIwZjhlZWFhNDY1NWQ0Iiwic2Vzc2lkIjoiY2NmMzYyYTg4NzBkNDEyMTk1YzI0N2QwODQ2MzQxMTEiLCJoY2MiOiJVUyIsInR5cGUiOiJhdCIsImlhdCI6MTUwMjY5MDg2MH0.Wsx2gLoZt_xDYHLXJyve64lrRIu1gujav_E95Gi-TP0ZfVFjvGTmzmxTpEUuWOfbaUbYblIEzETKmBwLEdjxUVBx2U8w8g0WDD4MxbWjOgPXqIXapfaq3MgRsayacPdYzI8__uDrgKBL1pDf9HZbT1i049QEOBaMhEqve-vipd0'
    },
    body: JSON.stringify(loadData)

  }).then((response) => {
    return response.json();
  }).then((json) => {
    console.log("json", json);
  });
}