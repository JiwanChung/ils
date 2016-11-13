import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { People } from '../../api/people.js';
import { ImageData } from '../../api/imagedata.js';
import { Images } from '../../api/images.js';

import './peoplepage.html';

// Components used inside the template
import './app-not-found.js';

Template.people.onCreated(function peopleOnCreated() {
  this.getPeopleType = () => FlowRouter.getParam('titleinput');
});

Template.people.onRendered(function peopleOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.people.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  type() {
    const instance = Template.instance();
    return viewtype = instance.getPeopleType();
  },
  imagedata() {
    const instance = Template.instance();
    const type = instance.getPeopleType();
    return ImageData.find({type: type});
  },
  images() {
    const instance = Template.instance();
    const type = instance.getPeopleType();
    const data = ImageData.find({type: type}).fetch();
    let imagearray = [];
    for ( var i = 0; i < data.length; i++ ) {
      imagearray.push(data[i].photo.getFileRecord());
    }
    return imagearray;
  }
});

Template.peoplecard.helpers({
  image() {
    const instance = Template.instance();
    return instance.data.photo.getFileRecord();
  },
});

Template.peoplecard.events({
  'click a'(e) {
    e.preventDefault();
    const instance = Template.instance();
    const id = instance.data._id;
    $("#"+id).removeClass( "s12 m6 l4" ).addClass( "s12 m12 l8 active" );
    $(id).removeClass("medium").addClass("large activecard");
  },
  'click .noclick'(e) {
    e.stopPropagation();
  },
});

Template.people.events({
  'click .gallerywrapper'(e) {
    $(".active").removeClass( "s12 m12 l8 active" ).addClass( "s12 m6 l4" );
    $(".activecard").removeClass("large activecard").addClass("medium");
  },
});
