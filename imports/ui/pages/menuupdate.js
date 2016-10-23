import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';

import './menuupdate.html';

// Components used inside the template
import './app-not-found.js';

Template.menushow.menushow = function(parent) {
  if (parent) {
    return Menus.find({parent:parent}).fetch();
  } else {
    return Menus.find({parent:null});
  }
}

Template.menuadd.helpers({
  helper: namefinder = function(thisname) {
    return Menus.find({name: thisname});
  }
});

Template.menuadd.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );

    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parentname = target.parent.value;
    console.log("name: " + parentname);
    var parentthis = namefinder(target.parent.value).fetch()[0];
    console.log("retrieved: " + parentthis);
    const parent = parentthis? parentthis._id: null;
    const type = target.menuradio.value;

    // Insert a task into the collection
    Menus.insertTranslations({
      name: nameko,
      type: type,
      parent: parent,
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
    target.parent.value = '';
  },
});
