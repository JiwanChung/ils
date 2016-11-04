
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import 'dropify/dist/js/dropify.js';
import 'dropify/dist/css/dropify.css';

import { Menus } from '../../api/menus.js';
import { Contentall } from '../../api/contentall.js';

import './app-body.html';

import '../components/nav.js';
import '../components/footer.js';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(() => {
    // FIXME:
    // Launch screen handle created in lib/router.js
    // dataReadyHold.release();

    // Show the connection error box
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);
});



Template.App_body.onCreated(function appBodyOnCreated() {
  //this.subscribe('lists.public');
  //this.subscribe('lists.private');

  this.state = new ReactiveDict();
});


Template.App_body.onRendered(function appBodyOnRendered() {
});


Template.App_body.helpers({
  cordova() {
    return Meteor.isCordova && 'cordova';
  },
  emailLocalPart() {
    const email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  connected() {
    if (showConnectionIssue.get()) {
      return Meteor.status().connected;
    }

    return true;
  },
  languages() {
    return _.keys(TAPi18n.getLanguages());
  },
  isActiveLanguage(language) {
    return (TAPi18n.getLanguage() === language);
  },
});

/*Template.rightmenu.events({
  'click .js-new-list'() {
    const target = event.target;
    const contenttitle = target.value;
    FlowRouter.go('contents.show', { title: contenttitle });
  }
});*/

Template.tempmenu.events({
  'submit form'() {
    const target = event.target;
    const contenttitle = target.title.value;
    target.title.value = '';
    console.log(contenttitle + "in app-body");
    FlowRouter.go('contents.show', { titleinput: contenttitle });
  }
});
