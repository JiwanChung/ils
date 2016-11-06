import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { contentRenderHold } from '../launch-screen.js';

import './bulletinpage.html';

// Components used inside the template
import './app-not-found.js';

import { Bulletinall } from '../../api/bulletinall.js';
import { Files } from '../../api/files.js';
import { FileData } from '../../api/filedata.js';

Template.bulletinpage.onCreated(function bulletinPageOnCreated() {
  this.getBulletinType = () => FlowRouter.getParam('titleinput');
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
})

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
