import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';


import './admin2.html';

// Components used inside the template
import './app-not-found.js';

Template.admin2.onCreated(function ipOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
});

Template.admin2.onRendered(function ipOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.addipa.onRendered(function addipOnRendered() {
});

Template.admin2.helpers({
  ip() {
    const sip = Session.get('ip');
    return Ip.findOne({ip: sip}) ? true : false;
  },
});

Template.showipa.helpers({
  ips() {
    return Ip.find({}).fetch();
  }
});

Template.addipa.events({
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
