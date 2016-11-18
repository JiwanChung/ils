import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

import './nav.html';


Template.nav.onCreated(function navOnCreated() {
});

Template.nav.onRendered(function navOnRendered() {
});

Template.myNav.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.dropdownbt.onRendered(function() {
  $(".dropdown-button").dropdown({hover: true});
});

Template.collapsiblemobile.onRendered(function() {
  $(".collapsible").collapsible();
});

Template.nav.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contentArray() {
    return Contentall.find({});
  },
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null});
    }
  },
});

Template.myNav.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contentArray() {
    return Contentall.find({});
  },
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null});
    }
  },
  types(type) {
    return type=="upper";
  },
});

Template.dropdownit.helpers({
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null});
    }
  }
});

Template.collapsiblemobile.helpers({
  menus(parent) {
    if (parent) {
      return Menus.find({parent:parent}).fetch();
    } else {
      return Menus.find({parent:null});
    }
  }
});

Template.dropdownli.events({
  'click .tolink'() {
    console.log("clicked!");
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const menuid = instance.data._id;
    console.log(menutype + contenttitle);
    switch (menutype) {
      case "board":
          FlowRouter.go('bulletins.show', { titleinput: contenttitle, id: menuid });
          break;
      case "gallery":
          FlowRouter.go('gallery.show', { titleinput: contenttitle, id: menuid });
          break;
      case "people":
          FlowRouter.go('people.show', { titleinput: contenttitle, id: menuid });
          break;
      case "site":
          FlowRouter.go('site.show', { titleinput: contenttitle, id: menuid });
          break;
      case "history":
          FlowRouter.go('timeline.show', { titleinput: contenttitle, id: menuid });
          break;
      case "map":
          FlowRouter.go('map.show', { titleinput: contenttitle, id: menuid });
          break;
      case "tree":
          FlowRouter.go('tree.show', { titleinput: contenttitle, id: menuid });
          break;
      case "journal":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      case "business":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      case "center":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      default:
          FlowRouter.go('contents.show', { titleinput: contenttitle, id: menuid });
    }
  }
});

Template.genbt.events({
  'click a'() {
    console.log("clicked!");
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const menuid = instance.data._id;
    console.log(menutype + contenttitle);
    switch (menutype) {
      case "board":
          FlowRouter.go('bulletins.show', { titleinput: contenttitle, id: menuid });
          break;
      case "gallery":
          FlowRouter.go('gallery.show', { titleinput: contenttitle, id: menuid });
          break;
      case "people":
          FlowRouter.go('people.show', { titleinput: contenttitle, id: menuid });
          break;
      case "site":
          FlowRouter.go('site.show', { titleinput: contenttitle, id: menuid });
          break;
      case "history":
          FlowRouter.go('gallery.show', { titleinput: contenttitle, id: menuid });
          break;
      case "map":
          FlowRouter.go('map.show', { titleinput: contenttitle, id: menuid });
          break;
      case "tree":
          FlowRouter.go('tree.show', { titleinput: contenttitle, id: menuid });
          break;
      case "journal":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      case "business":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      case "center":
          FlowRouter.go('more.show', { biginput: contenttitle, menuid: menuid });
          break;
      default:
          FlowRouter.go('contents.show', { titleinput: contenttitle, id: menuid });
    }
  },
});

Template.langlink.events({
  'click a'(e) {
    const target = e.target;
    const name = target.name;
    console.log(name);
    TAPi18n.setLanguage(name);
  },
});
