import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import './mainparallax.html';


Template.mainparallax.onCreated(function parallOnCreated() {
});

Template.mainparallax.onRendered(function parallOnRendered() {
  $('.helpme').parallax();
});