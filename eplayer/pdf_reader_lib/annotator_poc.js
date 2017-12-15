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
annotator_poc_instance = function() {
  var saveHighlightCallback;
  var deleteHiglightCallback;
  var updated;
	function init(savehighlight,deletehighlight){
    saveHighlightCallback = savehighlight;
    deleteHiglightCallback = deletehighlight;
		setTimeout(() => {
		$('body').on('mousedown', onDocumentClick);
		$('body').keyup(onDocumentClick);
		const annotation = $('body').annotator();
		annotation.data('annotator').on('annotationDeleted', annotationEvent.bind(null, 'annotationDeleted'));
		annotation.data('annotator').on('annotationEditorSubmit', annotationEvent.bind(null, 'annotationEditorSubmit'));
		annotation.data('annotator').on('annotationsLoaded', annotationEvent.bind(null, 'annotationsLoaded'));
		},2000);
		
	}
	function onDocumentClick(e) {
  	if ((e.keyCode === 27 || !$(e.target).closest('.annotator-editor').length) && !$('.annotator-editor').hasClass('annotator-hide')) {
  		$('body').data('annotator').editor.hide();
  	}
  	if ($(e.target).closest('.annotator-panel-1').length) {
  		return false;
  	}
  }
  function annotationEvent(eventType, data, viewer) {
    if (data || data.annotation) {
      const annData = data.annotation || data;
      annData.text = annData.text || '';
      if (eventType === 'annotationEditorSubmit') {
        eventType = annData.id ? 'annotationUpdated' : 'annotationCreated';
      }
      if (eventType === 'annotationDeleted' && !annData.id) { 
        return;
      }
      else if(eventType === 'annotationDeleted' && annData.id) {
        deleteHiglightCallback(annData.id);
      }
      if(eventType === 'annotationCreated')
      {
        updated = true;
        saveHighlightCallback(annData);
      }
    }
  }
  function loadPageAnnotations(data) {
    if (data && data.length) {
      let flag = 'loadAnnotations';
      if (updated) {
        flag = 'updateAnnotationId';
        updated = false;
      }
      const annData = (flag === 'updateAnnotationId') ? data[0] : data;
      if (flag === 'updateAnnotationId') {
        annData.createdTimestamp = Date.parse(annData.createdTimestamp);
        $('body').annotator().annotator(flag, annData);
      } else {
        setTimeout(() => {
          $('body').annotator().annotator(flag, annData);
        }, 1);
      }      
    }
  }
  return {
  	init:init,
    loadPageAnnotations:loadPageAnnotations
  }
}();