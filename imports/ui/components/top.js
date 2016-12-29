import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

import './top.html';

Template.top.onCreated(function navOnCreated() {
  this.getMoreId = () => FlowRouter.getParam('bigid');
  let id = this.getMoreId();
  this.getMoreTitle = () => Menus.findOne({_id: id}).name;
});

Template.top.onRendered(function navOnRendered() {
  $('ul.tabs').tabs();
  $('.tab a').first().click();
});

Template.top.helpers({
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null}).fetch();
    }
  },
  type() {
    const instance = Template.instance();
    const viewtype = instance.getMoreTitle();
    const menuid = instance.getMoreId();
    Session.set({
      biginput: viewtype,
      menuid: menuid
    });
    return menuid;
  },
});

Template.toptab.events({
  'click a'() {
    event.preventDefault();
    const target = event.target;
    $(".active").removeClass("active");
    $(target).addClass("active");
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
      case "journallink":
          FlowRouter.go('more.journallink', { bigid: menuid, id: id });
          break;
      case "content":
          FlowRouter.go('more.content', { bigid: menuid, id: id });
          break;

      default:
          FlowRouter.go('more.content', { bigid: menuid, id: id });
    }
  }
});
