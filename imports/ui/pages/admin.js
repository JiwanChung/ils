import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { contentRenderHold } from '../launch-screen.js';

import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';

import './admin.html';

// Components used inside the template
import './app-not-found.js';

Template.admin.onCreated(function ipOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
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
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
  seeip() {
    const sip = Session.get('ip');
    return sip[0];
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
