import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';
import { Panel } from '../../api/panel.js';
import { $ } from 'meteor/jquery';
import './panel.html';


Template.panel.onCreated(function panelOnCreated() {
});

Template.modalone.onRendered(function perOnRendered() {
  $('.modal-trigger').leanModal();
});

Template.panel.helpers({
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
  panels() {
    let items = Panel.find({type: 'panels'}).fetch();
    return items;
  },
  modal() {
    let item = Panel.findOne({type: 'modal'});
    return item;
  }
});

Template.addmodal.events({
  'submit form'(e) {
    e.preventDefault();
    const target = e.target;
    const nameko = target.nameko.value;
    const nameen = target.nameen.value;
    const content = target.content.value;
    Panel.insertTranslations({
        name: nameko,
        type: 'modal',
        content: content,
        en: {
            name: nameen
        }
    });
    target.nameen.value = '';
    target.nameko.value = '';
    target.content.value = '';
  },
  'click #submitmadd'(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".modaladd").submit();
  },
});

Template.addpanel.events({
  'submit form'(e) {
    e.preventDefault();
    const target = e.target;
    const nameko = target.nameko.value;
    const nameen = target.nameen.value;
    const link = target.link.value;
    Panel.insertTranslations({
        name: nameko,
        type: 'panels',
        link: link,
        en: {
            name: nameen
        }
    });
    target.nameen.value = '';
    target.nameko.value = '';
    target.link.value = '';
  },
  'click #submitpadd'(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".paneladd").submit();
  },
});

Template.panelone.helpers({
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.modalone.helpers({
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.panelone.events({
  'submit form'(e) {
    e.preventDefault();
    const target = e.target;
    const nameko = target.nameko.value;
    const nameen = target.nameen.value;
    const link = target.link.value;
    const instance = Template.instance();
    const data = instance.data;
    const id = data._id;
    Panel.update(id, {
        name: nameko,
        type: 'panels',
        link: link,
    });
    Panel.updateTranslations(id, {
      en: {
        name: nameen
      }
    });
    target.nameen.value = '';
    target.nameko.value = '';
    target.link.value = '';
  },
  'click #submitpan'(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".panelform").submit();
  },
});

Template.modalone.events({
  'submit form'(e) {
    e.preventDefault();
    const target = e.target;
    const nameko = target.nameko.value;
    const nameen = target.nameen.value;
    const content = target.content.value;
    const instance = Template.instance();
    const data = instance.data;
    const id = data._id;
    Panel.update(id, {
        name: nameko,
        type: 'modal',
        content: content,
    });
    Panel.updateTranslations(id, {
      en: {
        name: nameen
      }
    });
    target.nameen.value = '';
    target.nameko.value = '';
    target.content.value = '';
  },
  'click #submitman'(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".modalform").submit();
  },
});
