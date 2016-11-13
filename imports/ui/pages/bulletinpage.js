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
  Tracker.autorun(function() {
    // from the documentation [here](https://github.com/kadirahq/flow-router#flowrouterwatchpathchange)
    FlowRouter.watchPathChange();
    // PAGINATION SETUP
    var limit, offset, page;
    if (FlowRouter.getQueryParam('page')) {
      page = parseInt(FlowRouter.getQueryParam('page'));
    } else {
      page = 0;
    }
    limit = 10;
    offset = page * limit;

    Meteor.subscribe('postsWithSkip', offset, limit);
  });
});


Template.bulletinpage.onRendered(function bulletinPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
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
    const instance = Template.instance();
    return bulletintype = instance.getBulletinType();
  },
  bcounts() {
    Counts.get(bulletincounter);
  },
  bulletinAll() {
    const instance = Template.instance();
    const bulletintype = instance.getBulletinType();
    return Bulletinall.find({type: bulletintype});
  },
});

var limit = 10;

Template.pagedbulletin.helpers({
  bulletin() {
    return Bulletinall.find({}, {limit: limit, sort: {createdAt: 1}});
  },
});

Template.bulletindata.helpers({
  color() {
    const instance = Template.instance();
    if (instance.data.alert == "on") {
      return "red";
    } else {
      return "grey";
    }
  },
  formatDate() {
    const instance = Template.instance();
    const thedate = instance.data.createdAt.toLocaleDateString();
    return thedate;
  },
});

Template.bulletinsee.helpers({
  data() {
    return Session.get("viewing");
  },
  formatDate() {
    let thedate = Session.get("viewing").createdAt.toLocaleDateString();
    return thedate;
  },
  formatCat() {
    let category = Session.get("viewing").category;
    if (category == "announcement") {
      return "모집공고";
    } else if (category == "schedule") {
      return "일정";
    } else {
      return "공지";
    }
  },
  alert() {
    let alert = Session.get("viewing").alert;
    return alert == "on";
  },
});

Template.bulletindata.events({
  'click a'(event) {
    event.preventDefault();
    const instance = Template.instance();
    Session.set({
      viewing: instance.data
    });
    $("html, body").animate({ scrollTop: 500 }, "slow");
  },
});

Template.bulletinadd.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );
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
    console.log("files"+ this.files[0]);
    let fileObj = [];
    for (var i = 0; i < this.files.length; i++) {
      fileObj.push(Files.insert(this.files[i]));
    }
    //console.log("name:" + this.filename);
    //console.log("file:" + this.thisfile.name);
    console.log("array"+fileObj[0]);

    let fileId = FileData.insert({
      title: title,
      file: fileObj
    });

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
