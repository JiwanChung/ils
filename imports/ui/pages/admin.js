import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Ip } from '../../api/ip.js';

import './admin.html';

// Components used inside the template
import './app-not-found.js';

Template.admin.onCreated(function ipOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
});

Template.admin.onRendered(function ipOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.addip.onRendered(function addipOnRendered() {
});

Template.admin.helpers({
  ip() {
    const sip = Session.get('ip');
    return Ip.findOne({ip: sip}) ? true : false;
  },
});

Template.showip.helpers({
  ips() {
    return Ip.find({}).fetch();
  }
});

Template.addip.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const ip = target.ip.value;

    Ip.insert({
      ip: ip,
    });
    target.ip.value = '';
  },
});
