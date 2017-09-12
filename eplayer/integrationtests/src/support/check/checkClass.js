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
 * Check if the given element has the given class
 * @param  {String}   elem              Element selector
 * @param  {String}   falseCase         Whether to check for the class to exist
 *                                      or not ('has', 'does not have')
 * @param  {String}   expectedClassName The class name to check
 * @param  {Function} done              Function to execute when finished
 */
module.exports = (elem, falseCase, expectedClassName, done) => {
    /**
     * List of all the classes of the element
     * @type {Array}
     */
    const classesList = browser.getAttribute(elem, 'className').split(' ');

    if (falseCase === 'does not have') {
        expect(classesList).to.not
            .include(
                expectedClassName,
                `Element ${elem} should not have the class ${expectedClassName}`
            );
    } else {
        expect(classesList).to
            .include(
                expectedClassName,
                `Element ${elem} should have the class ${expectedClassName}`
            );
    }

    done();
};
