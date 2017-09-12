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
import { injectReducer } from '../../store/reducers';  // eslint-disable-line no-unused-vars

export default store => ({  // eslint-disable-line no-unused-vars
  path: '/eplayer/MultiTaskPanel',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const MultiTaskPanel = require('./components/MultiTaskPanel').default;
      // const reducer = require('../../store/multitaskpanel').default;

      /*  Add the reducer to the store on key 'counter'  */
      // debugger;
      // injectReducer(store, { key: 'multitaskpanel', reducer });

      /*  Return getComponent   */
      cb(null, MultiTaskPanel);

    /* Webpack named bundle   */
    }, 'multiTaskPanel');
  }
});
