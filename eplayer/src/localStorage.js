/** *****************************************************************************
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
export const loadState = (componentState) => {
  try {
    const serializedState = localStorage.getItem(componentState);
    if (serializedState == undefined) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    if (state.bookshelf !== undefined) {
      localStorage.setItem('bookshelf', JSON.stringify(state.bookshelf));
    }

    localStorage.setItem('book', JSON.stringify(state.book));

    if (state.login !== undefined) {
      localStorage.setItem('login', JSON.stringify(state.login));
    }
  } catch (err) {
		/* error*/
  }
};
