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
    case "none":
        FlowRouter.go('more.none', { bigid: menuid });
        break;
    default:
        FlowRouter.go('more.content', { bigid: menuid, id: id });
  }
}

Template.workit.events({
  'click a'() {
    const instance = Template.instance();
    const contenttitle = instance.data.name;
    const menuid = instance.data._id;
    let thisob, thisid, thistype;
    thisob = Menus.find({parent: menuid, name:'소개'}).fetch();
    if(typeof(thisob[0]) !== "undefined" && thisob[0] !== null) {
      thisid = thisob[0]._id;
      thistype = thisob[0].type;
      moreroute(menuid, thisid, thistype);
    } else {
      thisob = Menus.findOne({parent: menuid});
      if(typeof(thisob[0]) !== "undefined" && thisob[0] !== null) {
        thisid = thisob._id;
        thistype = thisob.type;
        moreroute(menuid, thisid, thistype);
      } else {
        moreroute(menuid, thisid, "none");
      }
    }
  },
});
