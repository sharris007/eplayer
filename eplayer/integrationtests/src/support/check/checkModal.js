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
 * Check if a modal was opened
 * @param  {String}   modalType  The type of modal that is expected (alertbox,
 *                               confirmbox or prompt)
 * @param  {String}   falseState Whether to check if the modal was opened or not
 * @param  {Function} done       Function to execute when finished
 */
module.exports = (modalType, falseState, done) => {
    /**
     * The text of the prompt
     * @type {String}
     */
    let promptText = '';

    try {
        promptText = browser.alertText();

        if (falseState) {
            expect(promptText).to.not
                .equal(
                    null,
                    `A ${modalType} was opened when it shouldn't`
                );
        }
    } catch (e) {
        if (!falseState) {
            expect(promptText).to
                .equal(
                    null,
                    `A ${modalType} was not opened when it should have been`
                );
        }
    }

    done();
};
