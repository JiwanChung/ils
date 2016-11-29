import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import './mainparallax.html';


Template.mainparallax.onCreated(function parallOnCreated() {
});

Template.mainparallax.onRendered(function parallOnRendered() {
  $('.helpmess').parallax();
});
