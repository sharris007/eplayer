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
/**
 * Close all but the first tab
 * @param  {String}   obsolete Type of object to close (window or tab)
 * @param  {Function} done     Function to execute when finished
 */
module.exports = (obsolete, done) => {
    /**
     * Get all the window handles
     * @type {Object}
     */
    const windowHandles = browser.windowHandles().value;

    // Close all tabs but the first one
    windowHandles.forEach((handle, index) => {
        if (index > 0) {
            browser.switchTab(handle).close();
        }
    });

    done();
};
