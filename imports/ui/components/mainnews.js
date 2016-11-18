import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import './mainnews.html';
import { Three } from '../../api/three.js';
import { Menus } from '../../api/menus.js';
import { Bulletinall } from '../../api/bulletinall.js';
import { Ip } from '../../api/ip.js';

Template.mainnews.onCreated(function mainnewsOnCreated() {
});

Template.mainnews.onRendered(function mainnewsOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
  $('select').material_select();
});


Template.mainnews.helpers({
  bulletin() {
    const bulletins = Three.find({}).fetch();
    return bulletins;
  },
  ip() {
    const sip = Session.get('ip');
    return Ip.findOne({ip: sip}) ? true : false;
  },
});

Template.mainnews1.helpers({
  bbgun() {
    const instance = Template.instance();
    const type = instance.data.value;
    const bulletin = Bulletinall.find({type: type}, {sort: {createdAt: -1}, limit: 3 }).fetch();
    return bulletin;
  },
});



Template.option2.onRendered(function op2OnRendered(){
  $('select').material_select();
});




Template.addmainnews.helpers({
  newsatt() {
    const att = Menus.find({type: 'board'}).fetch();
    return att;
  },
});

Template.addmainnews.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const first = target.first.value;
    const second = target.second.value;
    const third = target.third.value;
    function upserti(name, value) {
      const option = Three.find({name:name}).fetch();
      const id = option._id;
      Three.upsert({
        _id: id
      }, {
          // Modifier
          $set: {
              name: name,
              value: value
          }
      });
    };
    console.log(first);
    upserti('first', first);
    upserti('second', second);
    upserti('third', third);
    target.first.value = '';
    target.second.value = '';
    target.third.value = '';
  },
  'click #submitnews'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".mainnewsform").submit();
  },
});
