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
import { connect } from 'react-redux';
import moreMenuActions from '../modules/moreMenuActions';
import MoreMenuComponent from '../components/moreMenu'; // eslint-disable-line import/no-named-as-default

const mapDispatchToProps = {
  logout: moreMenuActions.logout,
  logoutUserSession: moreMenuActions.logoutUserSession
};

const mapStateToProps = state => ({
  moreMenu: (state.moreMenu ? state.moreMenu : {})

});

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenuComponent);
