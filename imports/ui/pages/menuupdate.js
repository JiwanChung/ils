import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';

import './menuupdate.html';

// Components used inside the template
import './app-not-found.js';

Template.menuupdate.helpers({
  addtemp() {
    return Session.get("addtemp");
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

Template.menushow.events({
  'click a'(event) {
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
    });
    console.log(id);
    $("html, body").animate({ scrollTop: 500 }, "slow");
  },
});

Template.underadd.helpers({
  name() {
    return Session.get("tempname");
  },
  hier() {
    return Session.get("hier");
  },
});

Template.newadd.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );

    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = null;
    const hier = 0;
    const type = target.menuradio.value;
    if (type == "content") {
      Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
    }

    // Insert a task into the collection
    Menus.insertTranslations({
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

    console.log("PARENT:"+ parent + " TYPE:" + type + "added!");
    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
  },
});

Template.underadd.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );
    const instance = Template.instance();
    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = Session.get("id");
    const hier = Session.get("hier");
    const type = target.menuradio.value;
    if (type == "content") {
      Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
    }
    // Insert a task into the collection
    Menus.insertTranslations({
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

    console.log("PARENT:"+ parent + " TYPE:" + type + "added!");
    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
  },
});
