import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { contentRenderHold } from '../launch-screen.js';

import { Menus } from '../../api/menus.js';

import './morepage.html';

// Components used inside the template
import './app-not-found.js';

Template.morepage.onCreated(function moreShowPageOnCreated() {
  this.getMoreId = () => FlowRouter.getParam('bigid');
  let id = this.getMoreId();
  this.getMoreTitle = () => Menus.findOne({_id: id}).name;
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
  ifmobile() {
    if ($(window).width() < 600 ) {
      return true;
    }
    return false;
  },
});


Template.Moresin.helpers({
  sessionthis() {
    Session.get('currentsub');
  }
});
