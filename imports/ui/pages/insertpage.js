import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Contentall } from '../../api/contentall.js';

import './insertpage.html';

// Components used inside the template
import './app-not-found.js';

Template.contentadditall.events({
  'submit form'(event) {
    event.preventDefault();

    console.log( 'Submitting form!' );

    // Get value from form element
    const target = event.target;
    const titleinput = target.titleinput.value;
    const detail = target.detail.value;

    // Insert a task into the collection
    Contentall.insert({
      titleinput: titleinput,
      detail: detail,
      createdAt: new Date(), // current time
    });

    console.log(titleinput + "added!");
    // Clear form
    target.titleinput.value = '';
    target.detail.value = '';
  },
});
