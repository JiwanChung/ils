import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import { Contentall } from '../../api/contentall.js';

import { contentRenderHold } from '../launch-screen.js';

import './contentpage.html';

// Components used inside the template
import './app-not-found.js';

Template.contentpage.onCreated(function contentShowPageOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
});

Template.contentpage.onRendered(function contentShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.newcontent.onRendered(function() {
});

Template.contentpage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contentArray() {
    const instance = Template.instance();
    const contenttitle = instance.getContentTitle();
    return Contentall.find({titleinput: contenttitle});
  },
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getContentTitle();
  },
});

Template.newcontent.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );

    // Get value from form element
    const target = event.target;
    const thisid = this._id;
    const detail = target.detail.value;

    console.log(thisid);

    // Insert a task into the collection
    Contentall.update({
      _id: thisid
    },{
      $set: { detail: detail,
      createdAt: new Date() },
    });

    // Clear form
    target.detail.value = '';
  },
});
