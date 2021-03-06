/*******************************************************************************
 * PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *   
 *  *  Copyright © 2017 Pearson Education, Inc.
 *  *  All Rights Reserved.
 *  * 
 *  * NOTICE:  All information contained herein is, and remains
 *  * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 *  * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 *  * patent applications, and are protected by trade secret or copyright law.
 *  * Dissemination of this information, reproduction of this material, and copying or distribution of this software 
 *  * is strictly forbidden unless prior written permission is obtained from Pearson Education, Inc.
 *******************************************************************************/
import { combineReducers } from 'redux';
import locationReducer from './location';
import annotationReducer from './annotation';
import playlistReducer from './playlist';
import bookmarkReducer from './bookmark';
import gotopageReducer from './gotopage';
import multitaskpanelReducer from './multitaskpanel';
import preferenceReducer from './preference';

export const makeRootReducer = asyncReducers =>
   combineReducers({
     location: locationReducer,
     annotationReducer,
     playlistReducer,
     bookmarkReducer,
     gotopageReducer,
     multitaskpanelReducer,
     preferenceReducer,
     ...asyncReducers
   })
;


export const injectReducer = (store, { key, reducer }) => {
  const myStore = store;
  myStore.asyncReducers[key] = reducer;
  myStore.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
