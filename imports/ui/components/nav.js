import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';
import { Session } from 'meteor/session';


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

var moreroute = function(menuid, id, menutype) {
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

var theroute = function(menutype, menuid) {
  let thisob, thisid, thistype;
  switch (menutype) {
    case "board":
        FlowRouter.go('bulletins.show', { id: menuid });
        break;
    case "gallery":
        FlowRouter.go('gallery.show', { id: menuid });
        break;
    case "people":
        FlowRouter.go('people.show', { id: menuid });
        break;
    case "site":
        FlowRouter.go('site.show', { id: menuid });
        break;
    case "history":
        FlowRouter.go('timeline.show', { id: menuid });
        break;
    case "map":
        FlowRouter.go('map.show', { id: menuid });
        break;
    case "tree":
        FlowRouter.go('tree.show', { id: menuid });
        break;
    case "journallink":
        FlowRouter.go('journallink.show', { id: menuid });
        break;
    case "journal":
        thisob = Menus.find({parent: menuid, name:'소개'}).fetch();
        if(typeof(thisob[0]) !== "undefined" && thisob[0] !== null) {
          thisid = thisob[0]._id;
          thistype = thisob[0].type;
        } else {
          thisob = Menus.findOne({parent: menuid});
          thisid = thisob._id;
          thistype = thisob.type;
        }
        moreroute(menuid, thisid, thistype);
        break;
    case "business":
        thisob = Menus.find({parent: menuid, name:'소개'}).fetch();
        if(typeof(thisob[0]) !== "undefined" && thisob[0] !== null) {
          thisid = thisob[0]._id;
          thistype = thisob[0].type;
        } else {
          thisob = Menus.findOne({parent: menuid});
          thisid = thisob._id;
          thistype = thisob.type;
        }
        moreroute(menuid, thisid, thistype);
        break;
    case "center":
        thisob = Menus.find({parent: menuid, name:'소개'}).fetch();
        if(typeof(thisob[0]) !== "undefined" && thisob[0] !== null) {
          thisid = thisob[0]._id;
          thistype = thisob[0].type;
        } else {
          thisob = Menus.findOne({parent: menuid});
          thisid = thisob._id;
          thistype = thisob.type;
        }
        moreroute(menuid, thisid, thistype);
        break;
    default:
        FlowRouter.go('contents.show', { id: menuid });
  }
};

Template.dropdownli.events({
  'click .tolink'(e) {
    e.preventDefault();
    e.stopPropagation();
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const menuid = instance.data._id;
    theroute(menutype, menuid);
    if ($(window).width() < 600 ) {
      $('#button-collapse').click();
    }
  }
});

Template.genbt.events({
  'click a'(e) {
    e.preventDefault();
    e.stopPropagation();
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const menuid = instance.data._id;
    theroute(menutype, menuid);
  },
});

Template.genbtm.events({
  'click a'(e) {
    e.preventDefault();
    e.stopPropagation();
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menutype = instance.data.type;
    const menuid = instance.data._id;
    theroute(menutype, menuid);
    if ($(window).width() < 600 ) {
      $('#button-collapse').click();
    }
  },
});

Template.langlink.events({
  'click a'(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const name = target.name;
    TAPi18n.setLanguage(name);
    if ($(window).width() < 600 ) {
      $('#button-collapse').click();
    }
  },
});
