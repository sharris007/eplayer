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
export default class Utilities {

  /**
   * Formats the time in 00:00 format from time in seconds,
   *
   * @param time the time in seconds
   * @returns {string} formatted time
   */
  static parseFlashcardData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseVideoSlideShowData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseTimelineData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseImageSlideShow(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseTinyQuizData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseImageIdentifierData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseMCQData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseMTIData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseUCAData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

  static parseTIAData(payload) {
    if (payload) {
      return payload.data;
    }
    return '';
  }

}
