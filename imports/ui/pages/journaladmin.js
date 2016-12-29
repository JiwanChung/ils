import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';
import { contentRenderHold } from '../launch-screen.js';

import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';
import { Journals } from '../../api/journals.js';

import './journaladmin.html';

// Components used inside the template
import './app-not-found.js';

Template.journaladmin.onCreated(function ipOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
});

Template.journaladmin.onRendered(function ipOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});


Template.journaladmin.helpers({
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
  seeip() {
    const sip = Session.get('ip');
    return sip[0];
  },
  journals() {
    const journals = Menus.find({type : "journallink"}).fetch();
    return journals;
  },
});

Template.jadmin.onRendered(function jadonRendered() {
  Materialize.updateTextFields();
});

Template.jadmin.helpers({
  name() {
    const instance = Template.instance();
    const data = instance.data;
    const name = data.name;
    return name;
  },
  ckey() {
    const instance = Template.instance();
    const data = instance.data;
    const name = data.name;
    const temp = Journals.findOne({name: name});
    const CID = temp.CID;
    return CID;
  }
});

Template.jadmin.events({
  'submit form'(event){
    event.preventDefault();
    const instance = Template.instance();
    const data = instance.data;
    const name = data.name;
    const target = event.target;
    const ckey = target.ckey.value;
    Meteor.call( 'JournalsUpsert', name, ckey );
  }
});
