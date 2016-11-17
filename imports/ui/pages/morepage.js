import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { contentRenderHold } from '../launch-screen.js';

import './morepage.html';

// Components used inside the template
import './app-not-found.js';

Template.morepage.onCreated(function moreShowPageOnCreated() {
  this.getMoreTitle = () => FlowRouter.getParam('biginput');
  this.getMoreId = () => FlowRouter.getParam('menuid');
});

Template.morepage.onRendered(function moreShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.morepage.helpers({
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getMoreTitle();
  },
  id() {
    const instance = Template.instance();
    return viewtype = instance.getMoreId();
  },
});


Template.Moresin.helpers({
  sessionthis() {
    Session.get('currentsub');
  }
});
