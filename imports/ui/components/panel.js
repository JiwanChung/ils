import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';

import { Menus } from '../../api/menus.js';

import './panel.html';


Template.panel.onCreated(function panelOnCreated() {
});

Template.personal.onRendered(function perOnRendered() {
  $('.modal-trigger').leanModal();
});

Template.panel.helpers({
  datum() {
    const datum = [
      {
        name: "연세 법학전문대학원",
        link: "https://lawschool.yonsei.ac.kr:44931/"
      },
      {
        name: "연세대학교 홈페이지",
        link: "https://www.yonsei.ac.kr/sc/index.jsp"
      }
    ];
    return datum;
  },
});
