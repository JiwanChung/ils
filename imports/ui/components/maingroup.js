import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { contentRenderHold } from '../launch-screen.js';

import './maingroup.html';

import { Threed } from '../../api/threed.js';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

Template.maingroup.onCreated(function grOnCreated() {
});

Template.maingroup.onRendered(function grOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
  $('select').material_select();
});

Template.maingroup.helpers({
  group() {
    const groups = Threed.find({}).fetch();
    return groups;
  },
  center() {
    const att = Menus.find( { "type": "center" } ).fetch();
    return att;
  },
  busi() {
    const att = Menus.find( { "type": "business" } ).fetch();
    return att;
  },
});

Template.workit.events({
  'click a'() {
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menuid = instance.data._id;
    FlowRouter.go('more.show', { bigid: menuid });
  },
});
