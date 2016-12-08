import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Contentall } from '../../api/contentall.js';
import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';

import { contentRenderHold } from '../launch-screen.js';

import './viewpage.html';

// Components used inside the template
import './app-not-found.js';

var transformer = require('delta-transform-html');
var content = new MysqlSubscription('allContent');
var thiscontent;

if (Meteor.isClient){
  Meteor.methods({
    'upDoc': function(titleinput, newdoc){
      // Find the selected player in the array of results
      var selectedContent = content.filter(function(content) {
        return content.titleinput === titleinput;
      })[0];

      // Increase the score
      selectedContent.doc = newdoc;

      // Force UI refresh
      content.changed();
    }
  });
}

Template.viewpage.onCreated(function contentShowPageOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
  const type = this.getContentTitle();
  Session.set({
    type: type,
    change: false
  });

});

Template.viewpage.onRendered(function contentShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });


  const title = this.getContentTitle();
  thiscontent = new MysqlSubscription('showDoc', title);
});

Template.viewpage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contents() {
    return content.reactive();
  },
  doc() {
      const instance = Template.instance();
      const contenttitle = instance.getContentTitle();
      content.depend();
      var cont = content.filter(function(cont) {
        return cont.titleinput === contenttitle;
      });
      const result = cont[0];
      Session.set({
        item: result
      });
      return result;
  },
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getContentTitle();
  },
  change() {
    return Session.get('change');
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.contentshow.helpers({
  content() {
    let docc = Session.get('doc');
    let doc = {};
    if(docc) {
      doc = docc;
    } else {
      let item = Session.get('item');
      doc = item.doc;
    }
    let obj = JSON.parse(doc);
    let rendered = transformer.transform(obj);
    return rendered;

  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.contentshow.events({
  'click .toupdatepage'() {
    const instance = Template.instance();
    Session.set({
      change: true
    });
  }
});

Template.contentchange.events({
  'click .toviewpage'() {
    const instance = Template.instance();
    Session.set({
      change: false
    });
  }
});
