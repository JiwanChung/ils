
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
import { Pages } from 'meteor/alethes:pages';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import { Session } from 'meteor/session';
import { Materialize } from 'meteor/materialize:materialize';

import 'dropify/dist/js/dropify.js';
import 'dropify/dist/css/dropify.css';

import { Menus } from '../../api/menus.js';
import { Contentall } from '../../api/contentall.js';
import { Bulletinall } from '../../api/bulletinall.js';
import { Site } from '../../api/site.js';
import { Ip } from '../../api/ip.js';

import './app-body.html';

import '../components/nav.js';
import '../components/footer.js';
import '../components/jumbo.js';
import '../components/searchs.js';
import '../components/quills.js';
import '../components/searchnorm.js';
import '../components/top.js';
import '../components/side.js';
import '../components/maingroup.js';
import '../components/carousel.js';
import '../components/grouptab.js';
import '../components/panel.js';

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
  this.autorun(() => {
    /*$(window).scroll(function(scroll) {
  		var navStart = $('.contentpage').offset().top;
  		var scroll = $(window).scrollTop();
  		if (scroll > navStart + 370) {
  			$('nav').addClass('opaque');
  		} else {
  			$('nav').removeClass('opaque');
  		}
  	});*/
  });
  this.state = new ReactiveDict();
  Meteor.call('getIP', function(error, result){
    if(error){
      //Error handling code
    } else {
      Session.set("ip", result);
    }
  });
  Meteor.call('godIP', function(error, result){
    if(error){
      //Error handling code
    } else {
      Session.set("godip", result);
    }
  });
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
  contentArray() {
    return Contentall.find({});
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

/*Template.rightmenu.events({
  'click .js-new-list'() {
    const target = event.target;
    const contenttitle = target.value;
    FlowRouter.go('contents.show', { title: contenttitle });
  }
});*/

Template.mainbutton.events({
  'click #toupdatemenu'(e){
    FlowRouter.go('menu.update', { password: "dwedwewewqscxc" });
  },
  'click #toadminpage'(e){
    FlowRouter.go('admin.show', { password: "dwedwewewqscxc" });
  },
  'click #slideupdate'(e){
    FlowRouter.go('slide.update', { password: "dwedwewewqscxc" });
  },
  'click #tojadminpage'(e){
    FlowRouter.go('jadmin.show', { password: "dwedwewewqscxc" });
  },
});
