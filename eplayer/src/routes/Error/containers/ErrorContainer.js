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
import { connect } from 'react-redux';/* Importing react-redux library for connect method which is used for connecting the react with redux store. */
/* Importing the action creator from reducer to container. */
import ErrorPage from '../components/ErrorPage';/* Importing LoginPage component for connecting purpose. */

/* Method  from react-redux library provides a convenient way to dispatch function of your store. */
const mapDispatchToProps = {};

/* Method from react-redux library provides a convenient way to access your redux-state. */
const mapStateToProps = state => ({});

/* Connent Method used for connecting the component with redux-store. */
export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);

