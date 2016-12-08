import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Menus } from '../../api/menus.js';

import './grouptab.html';

Template.grouptab.onCreated(function gtabOnCreated() {
});

Template.grouptab.onRendered(function gtabOnRendered() {
});

Template.grouptab.helpers({
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null}).fetch();
    }
  },
  type() {
    const instance = Template.instance();
    const menuid = instance.data.type;
    const viewtype = Menus.findOne({_id: menuid}).name;

    Session.set({
      biginput: viewtype,
      menuid: menuid
    });
    return menuid;
  },
});

Template.sidegroup.events({
  'click a'() {
    event.preventDefault();
    const instance = Template.instance();
    const id = instance.data._id;
    const menutype = instance.data.type;
    const biginput = Session.get('biginput');
    const menuid = Session.get('menuid');
    switch (menutype) {
      case "board":
          FlowRouter.go('more.board', { bigid: menuid, id: id });
          break;
      case "gallery":
          FlowRouter.go('more.gallery', { bigid: menuid, id: id });
          break;
      case "people":
          FlowRouter.go('more.people', { bigid: menuid, id: id });
          break;
      case "site":
          FlowRouter.go('more.site', { bigid: menuid, id: id });
          break;
      case "history":
          FlowRouter.go('more.history', { bigid: menuid, id: id });
          break;
      case "map":
          FlowRouter.go('more.map', { bigid: menuid, id: id });
          break;
      case "tree":
          FlowRouter.go('more.tree', { bigid: menuid, id: id });
          break;
      case "content":
          FlowRouter.go('more.content', { bigid: menuid, id: id });
          break;
      default:
          FlowRouter.go('more.content', { bigid: menuid, id: id });
    }
  }
});
