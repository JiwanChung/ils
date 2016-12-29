import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';
import './mainparallax.html';


Template.mainparallax.onCreated(function parallOnCreated() {
});

Template.mainparallax.onRendered(function parallOnRendered() {
  $('.helpmess').parallax();
});
