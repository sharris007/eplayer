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
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';
export const LOGOUT_USER_SESSION_PENDING = 'LOGOUT_USER_SESSION_PENDING';
export const LOGOUT_USER_SESSION_FULFILLED = 'LOGOUT_USER_SESSION_FULFILLED';
export const LOGOUT_USER_SESSION_REJECTED = 'LOGOUT_USER_SESSION_REJECTED';

const ACTION_HANDLERS = {
  [LOGOUT_PENDING]: state => ({ ...state, loggingout: true, error: null }),

  [LOGOUT_FULFILLED]: (state, action) => ({
    ...state,
    data: action.payload,
    loggingout: false,
    loggedout: true,
    error: null }),

  [LOGOUT_REJECTED]: (state, action) => ({
    ...state,
    loggingout: false,
    loggedout: false,
    error: action.payload,
    data: [] }),

  [LOGOUT_USER_SESSION_PENDING]: state => ({ ...state, loggingout_userSession: true, error_userSession: null }),

  [LOGOUT_USER_SESSION_FULFILLED]: (state, action) => ({
    ...state,
    data_userSession: action.payload,
    loggingout_userSession: false,
    loggedout_userSession: true,
    error_userSession: null }),

  [LOGOUT_USER_SESSION_REJECTED]: (state, action) => ({
    ...state,
    loggingout_userSession: false,
    loggedout_userSession: false,
    error_userSession: action.payload,
    data_userSession: [] })
};

const initialState = {
  data: [],
  loggedout: false,
  loggingout: false,
  error: null,
  data_userSession: [],
  loggedout_userSession: false,
  loggingout_userSession: false,
  error_userSession: null
};

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
