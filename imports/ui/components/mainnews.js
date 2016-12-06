import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import './mainnews.html';
import { Menus } from '../../api/menus.js';
import { Bulletinall } from '../../api/bulletinall.js';
import { Ip } from '../../api/ip.js';

Template.mainnews.onCreated(function mainnewsOnCreated() {
});

Template.mainnews.onRendered(function mainnewsOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
  $('select').material_select();
});


Template.mainnews.helpers({
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.mainnews1.helpers({
  bbgun() {
    const type = "소식";
    const bulletin = Bulletinall.find({type: type}, {sort: {createdAt: -1}, limit: 3 }).fetch();
    return bulletin;
  },
});

Template.mainnews2.helpers({
  bbgun() {
    const type = "행사 소식";
    const bulletin = Bulletinall.find({type: type}, {sort: {createdAt: -1}, limit: 3 }).fetch();
    return bulletin;
  },
});

Template.newdetail.helpers({
  concat() {
    const instance = Template.instance();
    const detail = instance.data.detail;
    const concat = detail.slice(0, 25);
    return concat;
  },
});
