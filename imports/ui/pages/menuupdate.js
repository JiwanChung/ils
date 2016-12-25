import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

import './menuupdate.html';

// Components used inside the template
import './app-not-found.js';
/*
var content = new MysqlSubscription('allContent');

if (Meteor.isClient){
  Meteor.methods({
    'inDoc': function(titleinput){

      // Force UI refresh
      content.changed();
    }
  });
}
*/
Template.menuupdate.helpers({
  addtemp() {
    return Session.get("addtemp");
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.menushow.helpers({
  hier0() {
    return Menus.find({hier:0}).fetch();
  },
  hier1(id) {
    return Menus.find({parent:id}).fetch();
  },
  hier2(id) {
    return Menus.find({parent:id}).fetch();
  },
});

Template.menufab.events({
  'click .green'(event) {
    event.preventDefault();
    const addtemp = $(event.currentTarget).attr("id");
    const name = $(event.currentTarget).attr("data-name2");
    const hier = $(event.currentTarget).attr("hier");
    const id = $(event.currentTarget).attr("name");
    Session.set({
      addtemp: addtemp,
      tempname: name,
      hier: hier,
      id: id
    })
    $("html, body").animate({ scrollTop: 500 }, "slow");
  },
  'click .red'(event) {
    event.preventDefault();
    const id = $(event.currentTarget).attr("name");
    Menus.remove(id);
  }
});

Template.underadd.helpers({
  name() {
    return Session.get("tempname");
  },
  hier() {
    return Session.get("hier");
  },
});

function insert(name) {
  var query = Meteor.call('inDoc', name, (err, res) => {
    if (err) {
      alert(err);
    } else {
      console.log("success");
    }
  });
};

Template.newadd.events({
  'submit form'(event) {
    event.preventDefault();


    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = null;
    const hier = 0;
    const type = target.menuradio.value;
    if (type == "content") {
      /*Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
      Contentall.insert({
        titleinput: nameen,
        doc: null,
        createdAt: new Date(), // current time
      });*/
      insert(nameko);
      insert(nameen);
    }

    // Insert a task into the collection
    const id = Menus.insertTranslations({
      name: nameko,
      type: type,
      parent: parent,
      hier: hier,
      createdAt: new Date(), // current time
    }, {
      en: {
        name: nameen
      }
    });


    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
  },
  'click #submitnew'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".newform").submit();
  },
});


Template.underadd.events({
  'submit form'(event) {
    event.preventDefault();

    const instance = Template.instance();
    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = Session.get("id");
    const hier = Session.get("hier");
    const type = target.menuradio.value;
    if (type == "content") {
      /*Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
      Contentall.insert({
        titleinput: nameen,
        doc: null,
        createdAt: new Date(), // current time
      });*/
      insert(nameko);
      insert(nameen);
    }
    // Insert a task into the collection
    const id = Menus.insertTranslations({
      name: nameko,
      type: type,
      parent: parent,
      hier: hier,
      createdAt: new Date(), // current time
    }, {
      en: {
        name: nameen
      }
    });


    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
  },
  'click #submitunder'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".underform").submit();
  },
});
