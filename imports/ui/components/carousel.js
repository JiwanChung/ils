import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import './carousel.html';


Template.carousel.onCreated(function caOnCreated() {
});

Template.carousel.onRendered(function caOnRendered() {
  $('.materialboxed').materialbox();
  $('.carousel').carousel();

});

Template.carousel.events({
  'click img'(e) {
    e.stopPropagation();
  },
});
