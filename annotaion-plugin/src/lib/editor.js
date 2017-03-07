// Generated by CoffeeScript 1.7.1
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Annotator.Editor = (function(_super) {
  __extends(Editor, _super);

  Editor.prototype.events = {
    "form submit": "submit",
    ".annotator-save click": "submit",
    ".annotator-cancel click": "hide",
    ".annotator-cancel mouseover": "onCancelButtonMouseover",
    "textarea keydown": "processKeypress",
    ".annotator-color click":"onColorChange",
    ".annotator-share click":"onShareClick",
    ".annotator-delete-container click":"onDeleteClick"
  };

  Editor.prototype.classes = {
    hide: 'annotator-hide',
    focus: 'annotator-focus'
  };

  Editor.prototype.html = "<div class=\"annotator-outer annotator-editor hide-note\">\n <form class=\"annotator-widget\">\n    <div class=\"annotator-color-container\"><input type='button' class=\"annotator-color annotator-yellow\" value=\"#FCF37F\"/> <input type='button' class=\"annotator-color annotator-green\" value=\"#55DF49\"/> <input type='button' class=\"annotator-color annotator-pink\" value=\"#FC92CF\"/> </div><div class=\"annotator-delete-container\"></div>\n<ul class=\"annotator-listing\"></ul>\n    <div class=\"annotator-controls\">\n  <div class=\"annotator-share-text\">Share</div><div class=\"annotator-share\"></div> <a href=\"#cancel\" class=\"annotator-cancel\">" + _t('CANCEL') + "</a>\n<a href=\"#save\" class=\"annotator-save annotator-focus disabled-save\">" + _t('SAVE') + "</a>\n    </div>\n  </form>\n</div>";
  
  Editor.prototype.options = {};

  function Editor(options) {
    this.onCancelButtonMouseover = __bind(this.onCancelButtonMouseover, this);
    this.processKeypress = __bind(this.processKeypress, this);
    this.submit = __bind(this.submit, this);
    this.load = __bind(this.load, this);
    this.hide = __bind(this.hide, this);
    this.show = __bind(this.show, this);
    this.onColorChange=__bind(this.onColorChange, this);
    this.onShareClick=__bind(this.onShareClick, this);
    this.onDeleteClick=__bind(this.onDeleteClick, this);
    Editor.__super__.constructor.call(this, $(this.html)[0], options);
    this.fields = [];
    this.tempColor=null;
    this.tempShare=null;
    this.annotation = {};
  }
  
  Editor.prototype.onShareClick=function(event) {
    if ($(event.target).hasClass('on')) {
       $(event.target).removeClass('on');
       this.tempColor='#FCF37F';
       this.tempShare=false;
       $(this.annotation.highlights).css('background', '#FCF37F');
       $('.annotator-color').removeClass('active');
       $('.annotator-color:first').addClass('active');
       $('.annotator-save').removeClass('disabled-save');
       $('.annotator-color-container').removeClass('disabled-save');
    }
    else {
       $(event.target).addClass('on');
       this.tempColor='#ccf5fd';
       this.tempShare=true;
       $('.annotator-color').removeClass('active');
       $(this.annotation.highlights).css('background', '#ccf5fd');
       $('.annotator-color-container').addClass('disabled-save');
    }
  }
  
  Editor.prototype.onDeleteClick=function(event){    
    this.element.addClass(this.classes.hide);
    return $('.annotator-outer.annotator-viewer').triggerHandler.apply($('.annotator-outer.annotator-viewer'), ['delete', [this.annotation]]);
  }

  Editor.prototype.onColorChange=function(event) {
    event.preventDefault();
    if(!this.annotation.color&&!this.tempColor){
      this.element.css({top:this.element.offset().top+58});
    }
    this.element.removeClass('hide-note');
    this.tempColor=event.target.value;
    $('.annotator-color').removeClass('active');
    $(event.target).addClass('active');
    $('.annotator-save').removeClass('disabled-save');
    $(this.annotation.highlights).css('background', event.target.value);
  }

  Editor.prototype.show = function(event) {
    Annotator.Util.preventEventDefault(event);
    this.element.removeClass(this.classes.hide);
    this.annotation.color=this.annotation.color||'';
    if (this.annotation.color) {
      $('.annotator-save').removeClass('disabled-save');
      this.element.removeClass('hide-note');
    } 
    this.annotation.shareable=(this.annotation.shareable===undefined)?false:this.annotation.shareable;
    if(this.annotation.shareable) {
      $('.annotator-share').addClass('on');
      $('.annotator-color-container').addClass('disabled-save');
    }
    else {
      $('.annotator-share').removeClass('on');
      $('.annotator-color-container').removeClass('disabled-save'); 
    }
    $('.annotator-color').removeClass('active');
    $('.annotator-color[value="'+this.annotation.color+'"]').addClass('active');
    this.element.find('.annotator-save').addClass(this.classes.focus);
    this.checkOrientation();
    this.element.find(":input:first").focus();
    this.setupDraggables();
    return this.publish('show');
  };

  Editor.prototype.hide = function(event) {
    this.tempColor=this.tempShare=null;
    $(this.annotation.highlights).css('background', this.annotation.color);
    Annotator.Util.preventEventDefault(event);
    this.element.addClass(this.classes.hide);
    $('.annotator-save').addClass('disabled-save');
    this.element.addClass('hide-note');
    return this.publish('hide');
  };

  Editor.prototype.load = function(annotation, isShareable) {
    if(!isShareable)
      this.element.find('.annotator-share-text, .annotator-share').remove();
    var field, _i, _len, _ref;
    this.annotation = annotation;
    this.publish('load', [this.annotation]);
    _ref = this.fields;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      field.load(field.element, this.annotation);
    }
    return this.show();
  };

  Editor.prototype.submit = function(event) {
    var field, _i, _len, _ref;
    Annotator.Util.preventEventDefault(event);
    _ref = this.fields;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      field.submit(field.element, this.annotation);
    }
    this.annotation.shareable=this.tempShare;
    this.annotation.color=this.tempColor;
    this.publish('save', [this.annotation]);
    return this.hide();
  };

  Editor.prototype.addField = function(options) {
    var element, field, input;
    field = $.extend({
      id: 'annotator-field-' + Annotator.Util.uuid(),
      type: 'input',
      label: '',
      load: function() {},
      submit: function() {}
    }, options);
    input = null;
    element = $('<li class="annotator-item" />');
    field.element = element[0];
    switch (field.type) {
      case 'textarea':
        input = $('<textarea maxlength="3000"/>');
        break;
      case 'input':
      case 'checkbox':
        input = $('<input />');
        break;
      case 'select':
        input = $('<select />');
    }
    element.append(input);
    input.attr({
      id: field.id,
      placeholder: field.label
    });
    if (field.type === 'checkbox') {
      input[0].type = 'checkbox';
      element.addClass('annotator-checkbox');
      element.append($('<label />', {
        "for": field.id,
        html: field.label
      }));
    }
    this.element.find('ul:first').append(element);
    this.fields.push(field);
    return field.element;
  };

  Editor.prototype.checkOrientation = function() {
    var controls, list;
    Editor.__super__.checkOrientation.apply(this, arguments);
    list = this.element.find('ul');
    controls = this.element.find('.annotator-controls');
    if (this.element.hasClass(this.classes.invert.y)) {
      controls.insertAfter(list);
    } else if (controls.is(':first-child')) {
      controls.insertAfter(list);
    }
    return this;
  };

  Editor.prototype.processKeypress = function(event) {
    if (event.keyCode === 27) {
      return this.hide();
    } else if (event.keyCode === 13 && !event.shiftKey) {
      return this.submit();
    }
  };

  Editor.prototype.onCancelButtonMouseover = function() {
    return this.element.find('.' + this.classes.focus).removeClass(this.classes.focus);
  };

  Editor.prototype.setupDraggables = function() {
    var classes, controls, cornerItem, editor, mousedown, onMousedown, onMousemove, onMouseup, resize, textarea, throttle;
    this.element.find('.annotator-resize').remove();
    if (this.element.hasClass(this.classes.invert.y)) {
      cornerItem = this.element.find('.annotator-item:last');
    } else {
      cornerItem = this.element.find('.annotator-item:first');
    }
    if (cornerItem) {
      $('<span class="annotator-resize"></span>').appendTo(cornerItem);
    }
    mousedown = null;
    classes = this.classes;
    editor = this.element;
    textarea = null;
    resize = editor.find('.annotator-resize');
    controls = editor.find('.annotator-controls');
    throttle = false;
    onMousedown = function(event) {
      if (event.target === this) {
        mousedown = {
          element: this,
          top: event.pageY,
          left: event.pageX
        };
        textarea = editor.find('textarea:first');
        $(window).bind({
          'mouseup.annotator-editor-resize': onMouseup,
          'mousemove.annotator-editor-resize': onMousemove
        });
        return event.preventDefault();
      }
    };
    onMouseup = function() {
      mousedown = null;
      return $(window).unbind('.annotator-editor-resize');
    };
    onMousemove = (function(_this) {
      return function(event) {
        var diff, directionX, directionY, height, width;
        if (mousedown && throttle === false) {
          diff = {
            top: event.pageY - mousedown.top,
            left: event.pageX - mousedown.left
          };
          if (mousedown.element === resize[0]) {
            height = textarea.height();
            width = textarea.width();
            directionX = editor.hasClass(classes.invert.x) ? -1 : 1;
            directionY = editor.hasClass(classes.invert.y) ? 1 : -1;
            textarea.height(height + (diff.top * directionY));
            textarea.width(width + (diff.left * directionX));
            if (textarea.height() !== height) {
              mousedown.top = event.pageY;
            }
            if (textarea.width() !== width) {
              mousedown.left = event.pageX;
            }
          } else if (mousedown.element === controls[0]) {
            editor.css({
              top: parseInt(editor.css('top'), 10) + diff.top,
              left: parseInt(editor.css('left'), 10) + diff.left
            });
            mousedown.top = event.pageY;
            mousedown.left = event.pageX;
          }
          throttle = true;
          return setTimeout(function() {
            return throttle = false;
          }, 1000 / 60);
        }
      };
    })(this);
    resize.bind('mousedown', onMousedown);
    return controls.bind('mousedown', onMousedown);
  };

  return Editor;

})(Annotator.Widget);

//# sourceMappingURL=editor.map
