import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';

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
    console.log(menutype + contenttitle);
    switch (menutype) {
      case "board":
          FlowRouter.go('bulletins.show', { titleinput: contenttitle });
          break;
      case "gallery":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "people":
          FlowRouter.go('people.show', { titleinput: contenttitle });
          break;
      case "site":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "history":
          FlowRouter.go('timeline.show', { titleinput: contenttitle });
          break;
      case "map":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "tree":
          FlowRouter.go('tree.show', { titleinput: contenttitle });
          break;
      default:
          FlowRouter.go('contents.show', { titleinput: contenttitle });
    }
  }
});

Template.genbt.events({
  'click a'() {
    console.log("clicked!");
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    console.log(menutype + contenttitle);
    switch (menutype) {
      case "board":
          FlowRouter.go('bulletins.show', { titleinput: contenttitle });
          break;
      case "gallery":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "people":
          FlowRouter.go('people.show', { titleinput: contenttitle });
          break;
      case "site":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "history":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      case "map":
          FlowRouter.go('gallery.show', { titleinput: contenttitle });
          break;
      default:
          FlowRouter.go('contents.show', { titleinput: contenttitle });
    }
  },
});
