import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { contentRenderHold } from '../launch-screen.js';

import './bulletinpage.html';

// Components used inside the template
import './app-not-found.js';

import { Bulletinall } from '../../api/bulletinall.js';
import { Files } from '../../api/files.js';
import { FileData } from '../../api/filedata.js';


Template.bulletinpage.onCreated(function bulletinPageOnCreated() {
  this.getBulletinType = () => FlowRouter.getParam('titleinput');
  const type = this.getBulletinType();
  Session.set({
    type: type,
    change: false
    });
});

Template.bulletinpage.onRendered(function bulletinPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
    Session.set({
      "viewing": null
    });
    const type = FlowRouter.getParam('titleinput');
    let initialfilter = {
      filters: {
        type: type
      }
    };
    BulletinNewsPages.set(initialfilter);
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
    return Bulletinall.find({type: bulletintype});
  },
  type() {
    return bulletintype = Session.get("type");
  },
  bcounts() {
    Counts.get(bulletincounter);
  },
  bulletinAll() {
    const instance = Template.instance();
    const bulletintype = instance.getBulletinType();
    return Bulletinall.find({type: bulletintype});
  },
  change() {
    return Session.get('change');
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
});

Template.bulletinsee.helpers({
  data() {
    const id = Session.get("viewing");
    const data = Bulletinall.findOne({_id: id});
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
    console.log("child" + type);
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
      //console.log("name:" + this.filename);
      //console.log("file:" + this.thisfile.name);
      console.log("array"+fileObj[0]);
      fileId = FileData.insert({
        title: title,
        file: fileObj
      });
    }
    console.log(fileId);

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

    console.log(title + "added!");
    // Clear form
    target.title.value = '';
    target.detail.value = '';
  },
});
