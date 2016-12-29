import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import './carousel.html';


Template.carousel.onCreated(function caOnCreated() {
});

Template.carousel.onRendered(function caOnRendered() {

  $('.carousel').carousel({
            dist:-100,
            shift:0,
            padding:-200
      });
  $('.materialboxed').materialbox();
});

Template.carousel.helpers({
});

Template.carousel.events({
  'click a'(e) {
    e.stopPropagation();
    $(".active1").css("zIndex", 999);
  },
  'click .carousel'(e) {
    e.stopPropagation();
  },
  'click .material-placeholder'(e) {
    e.stopPropagation();
  },
  'click img'(e) {
    e.stopPropagation();
  }
});
