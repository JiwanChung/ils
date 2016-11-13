import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';


import { Contentall } from '../../api/contentall.js';

import { contentRenderHold } from '../launch-screen.js';

import './viewpage.html';

// Components used inside the template
import './app-not-found.js';

var transformer = require('delta-transform-html');


Template.viewpage.onCreated(function contentShowPageOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
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
});

Template.viewpage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  contentArray() {
    const instance = Template.instance();
    const contenttitle = instance.getContentTitle();
    const result = Contentall.findOne({titleinput: contenttitle});
    Session.set({
      item: result
    });
    return result;
  },
  type() {
    const instance = Template.instance();
    return viewtype = instance.getContentTitle();
  },
  change() {
    return Session.get('change');
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
    console.log(obj);
    let rendered = transformer.transform(obj);
    console.log(rendered);
    return rendered;

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
