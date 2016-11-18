import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

import './top.html';

Template.top.onCreated(function navOnCreated() {
  this.getMoreTitle = () => FlowRouter.getParam('biginput');
  this.getMoreId = () => FlowRouter.getParam('menuid');
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
    console.log(menuid);
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
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const biginput = Session.get('biginput');
    const menuid = Session.get('menuid');
    switch (menutype) {
      case "board":
          FlowRouter.go('more.board', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "gallery":
          FlowRouter.go('more.gallery', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "people":
          FlowRouter.go('more.people', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "site":
          FlowRouter.go('more.site', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "history":
          FlowRouter.go('more.history', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "map":
          FlowRouter.go('more.map', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "tree":
          FlowRouter.go('more.tree', { biginput: biginput, menuid: menuid, titleinput: contenttitle });
          break;
      case "content":
          FlowRouter.go('more.content', { biginput: biginput, menuid: menuid, titleinput: contenttitle});
          break;
      default:
          FlowRouter.go('more.content', { biginput: biginput, menuid: menuid, titleinput: contenttitle});
    }
  }
});
