import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { contentRenderHold } from '../launch-screen.js';
import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';

import './bulletinpage.html';

// Components used inside the template
import './app-not-found.js';

import { Bulletinall } from '../../api/bulletinall.js';
import { Files } from '../../api/files.js';
import { FileData } from '../../api/filedata.js';


Template.bulletinpage.onCreated(function bulletinPageOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getBulletinType = () => Menus.findOne({_id: id}).name;
  const type = this.getBulletinType();
  Session.set({
    type: type,
    change: false
    });
  Session.set({
    "viewing": null
  });
});

Template.bulletinpage.onRendered(function bulletinPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }


    var getId = () => FlowRouter.getParam('id');
    let id = getId();
    var getBulletinType = () => Menus.findOne({_id: id}).name;
    const type = getBulletinType();
    let initialfilter = {
      filters: {
        type: type
      },
      sort: {
        createdAt: -1
      },
    };
    BulletinNewsPages.set(initialfilter);
    Session.set({
      type: type
    });
  });
});

Template.bulletinsee.onRendered(function bulletinSeeOnRendered() {
});

Template.bulletinpage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  bulletinArray() {
    const result = Session.get("searchresult");
    if (!!result ) {
      return result;
    }
    const instance = Template.instance();
    const bulletintype = instance.getBulletinType();
    return Bulletinall.find({type: bulletintype}, {sort: {createdAt: -1}});
  },
  type() {
    FlowRouter.watchPathChange();
    return bulletintype = Session.get("type");
  },
  bcounts() {
    Counts.get(bulletincounter);
  },
  bulletinAll() {
    const instance = Template.instance();
    const bulletintype = instance.getBulletinType();
    return Bulletinall.find({type: bulletintype}, {sort: {createdAt: -1}});
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


Template.bulletin.helpers({
  search() {
    const result = Session.get('searchresult');
    BulletinNewsPages.set(result);
  },
  type() {
    const type = Session.get("type");
    return type;
  },
});


Template.bulletindata.helpers({
  color(alert) {
    if (alert == "on") {
      return "red";
    } else {
      return "grey";
    }
  },
  formatDate(date) {
    const thedate = date.toLocaleDateString();
    return thedate;
  },
  concat() {
    const instance = Template.instance();
    const detail = instance.data.detail;
    const concat = detail.slice(0, 25);
    return concat;
  },
});


Template.bulletinsee.helpers({
  data() {
    const view = Session.get("viewroute");
    let id;
    if (typeof view !== "undefined" && view != null) {
      Session.set({
        "viewing": view
      });
      id = view;
    } else {
      id = Session.get("viewing");
    }
    const data = Bulletinall.findOne({_id: id});
    Session.set({
      "viewroute": null
    });
    return data;
  },
  formatDate(created) {
    let thedate = created.toLocaleDateString();
    return thedate;
  },
  formatCat(category) {
    if (category == "announcement") {
      return "모집공고";
    } else if (category == "schedule") {
      return "일정";
    } else {
      return "공지";
    }
  },
  alert(alert) {
    return alert == "on";
  },
  datafile() {
    const id = Session.get("viewing");
    const data = Bulletinall.findOne({_id: id});
    const fileid = data.fileId;
    const filedata = FileData.findOne({_id: fileid});
    this.files = filedata.file;
    let fileObj = [];
    for (var i = 0; i < this.files.length; i++) {
      let afile = this.files[i];
      fileObj.push(afile.getFileRecord());
    }
    return fileObj;
  },
});

Template.bulletindata.events({
  'click a'(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.id;
    Session.set({
      viewing: id
    });
    $("html, body").animate({ scrollTop: 500 }, "slow");
  },
});

Template.bulletinadd.events({
  'submit form'(event) {
    event.preventDefault();

    const instance = Template.instance();
    const type = instance.data.type;
    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const detail = target.detail.value;
    const category = target.category.value;
    const alert = target.alert.value;

    this.files = target.files.files;
    let fileId = null;
    if (this.files[0] != null) {
      let fileObj = [];
      for (var i = 0; i < this.files.length; i++) {
        fileObj.push(Files.insert(this.files[i]));
      }
      fileId = FileData.insert({
        title: title,
        file: fileObj
      });
    }

    // Insert a task into the collection
    Bulletinall.insert({
      title: title,
      detail: detail,
      type: type,
      fileId: fileId,
      alert: alert,
      category: category,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.title.value = '';
    target.detail.value = '';
    target.files.value = null;
  },
});
