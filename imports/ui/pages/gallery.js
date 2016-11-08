import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import { contentRenderHold } from '../launch-screen.js';

import { Galleryall } from '../../api/galleryall.js';
import { ImageData } from '../../api/imagedata.js';
import { Images } from '../../api/images.js';

import './gallery.html';

// Components used inside the template
import './app-not-found.js';

Template.gallery.onCreated(function galleryOnCreated() {
  this.getGalleryType = () => FlowRouter.getParam('titleinput');
});

Template.gallery.onRendered(function galleryOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.gallery.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  type() {
    const instance = Template.instance();
    return viewtype = instance.getGalleryType();
  },
  imagedata() {
    const instance = Template.instance();
    const type = instance.getGalleryType();
    console.log(type);
    return ImageData.find({type: type});
  },
  images() {
    const instance = Template.instance();
    const type = instance.getGalleryType();
    const data = ImageData.find({type: type}).fetch();
    let imagearray = [];
    for ( var i = 0; i < data.length; i++ ) {
      imagearray.push(data[i].photo.getFileRecord());
    }
    return imagearray;
  }
});

Template.gallerycard.helpers({
  image() {
    const instance = Template.instance();
    return instance.data.photo.getFileRecord();
  },
});

Template.gallery.events({

});
