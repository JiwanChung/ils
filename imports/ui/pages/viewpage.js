import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';

import { contentRenderHold } from '../launch-screen.js';

import './viewpage.html';

// Components used inside the template
import './app-not-found.js';

Template.viewpage.onCreated(function contentShowPageOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');

  console.log(this.getContentTitle() + "in app-body");
});

Template.viewpage.onRendered(function contentShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.viewpage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contentArray() {
    const instance = Template.instance();
    const contenttitle = instance.getContentTitle();
    return Contentall.find({titleinput: contenttitle});
  },
});

Template.viewpage.events({
  'click .toupdatepage'() {
    const contenttitle = instance.getContentTitle();
    FlowRouter.go('contents.update', { titleinput: contenttitle });
  }
});
