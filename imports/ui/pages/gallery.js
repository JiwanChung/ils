import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';
import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';
import { Images } from '../../api/images.js';
import { ImageData } from '../../api/imagedata.js';

import { Galleryall } from '../../api/galleryall.js';
import './gallery.html';

// Components used inside the template
import './app-not-found.js';

Template.gallery.onCreated(function gallOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getGalleryType = () => Menus.findOne({_id: id}).name;
  Session.set({clicky: null});
});

Template.gallery.onRendered(function gallOnRendered() {
});


Template.addgall.onRendered(function addgallOnRendered() {
  $('.dropify').dropify(
    {
      messages: {
          'default': '파일을 드래그하거나 클릭하세요.',
          'replace': '파일을 바꾸려면 파일을 드래그하거나 클릭하세요.',
          'remove':  '지우기',
          'error':   '파일 형식 오류'
      }
  }
  );
  $("input[type='image']").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("input[id='submitgall']").click();
  });
});

Template.gallery.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getGalleryType();
  },
  gallery() {
    const instance = Template.instance();
    const type = instance.getGalleryType();
    return Galleryall.find({type: type}).fetch();
  },
  gallsearch() {
    const ses = Session.get("searched");
    if ( ses != null ) {
      return ses;
    } else {
      const instance = Template.instance();
      const type = instance.getGalleryType();
      return Galleryall.find({type: type}).fetch();
    }
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.imagecard.helpers({
  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
  images() {
    const instance = Template.instance();
    const id = instance.data.fileId;
    const data = ImageData.findOne({_id: id});
    this.files = data.file;
    let fileObj = [];
    for (var i = 0; i < this.files.length; i++) {
      let afile = this.files[i];
      fileObj.push(afile.getFileRecord());
    }
    return fileObj;
  },
  clicked(param) {
    if (Session.get('clicky') == param) {
      return true;
    }
    return false;
  },
  animage() {
    const instance = Template.instance();
    const id = instance.data.fileId;
    const data = ImageData.findOne({_id: id});
    this.files = data.file;
    let afile = this.files[0];
    afile.getFileRecord();
    return afile;
  },
});

Template.imagecard.events({
  'click a'(e) {
    e.preventDefault();
    const instance = Template.instance();
    const id = instance.data._id;
    const target = $("#"+id);
    if ( !target.hasClass("active") ) {
      $(".active1").removeClass( "s12 m12 l12 active1" ).addClass( "s12 m6 l6" );
      $(".activecard1").removeClass("large activecard1").addClass("medium");

      $("#"+id).removeClass( "s12 m6 l6" ).addClass( "s12 m12 l12 active1" );
      $(id).removeClass("medium").addClass("large activecard1");
      $("#" + id + " .ishidden").show();
      Session.set({clicky: id});
    }
  },
  'click .noclick'(e) {
    e.stopPropagation();
  },
});

Template.gallery.events({
  'click .gallerywrapper'(e) {
    $(".active1 .ishidden").hide();
    $(".active1").removeClass( "s12 m12 l12 active1" ).addClass( "s12 m6 l6" );
    $(".activecard1").removeClass("large activecard1").addClass("medium");
    Session.set({clicky: null});
  },
});

Template.addgall.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const detail = target.detail.value;
    const instance = Template.instance();
    const type = instance.data.type;

    this.files = target.files.files;

    Session.set({name: name});

    let fileId = null;
    if (this.files[0] != null) {
      let fileObj = [];
      for (var i = 0; i < this.files.length; i++) {
        fileObj.push(Images.insert(this.files[i]));
      }
      //console.log("name:" + this.filename);
      //console.log("file:" + this.thisfile.name);
      console.log("array"+fileObj[0]);
      fileId = ImageData.insert({
        name: name,
        file: fileObj
      });
    }
    console.log(fileId);

    // Insert a task into the collection
    Galleryall.insert({
      name: name,
      detail: detail,
      type: type,
      fileId: fileId,
      createdAt: new Date(), // current time
    });

    target.name.value = '';
    target.detail.value = '';
    target.files.value = null;
  },
  'click #submitgall'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".gallform").submit();
  },
});
