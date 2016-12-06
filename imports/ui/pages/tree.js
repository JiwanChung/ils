import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Tree } from '../../api/tree.js';
import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';

import './tree.html';

// Components used inside the template
import './app-not-found.js';

Template.tree.onCreated(function treeOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
  const type = this.getContentTitle();
  Session.set({
    type: type,
    change: false
  });
});

Template.tree.onRendered(function treeOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });

});

Template.addtree.onRendered(function treeOnRendered() {
  $("input[type='image']").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("input[id='submittree']").click();
  });
});

Template.tree.helpers({
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return instance.getContentTitle();
  },
  tree() {
    return Tree.find({}).fetch();
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

/*
Template.mytree.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});*/

Template.chart.helpers({
  charts() {
    let list = [];
    const diesem = Tree.find({top: ""}).fetch();
    for (i = 0; i < diesem.length; i++) {
      const top = diesem[i].name;
      const tor = Tree.find({top: top}).fetch();
      const obj = {
        top: top,
        tor: tor
      }
      list.push(obj);
    }
    return list;
  }
});

Template.achart.helpers({

});


Template.chart.events({
  'click a'(e) {
    e.preventDefault();
  }
});

Template.addtree.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const nameko = target.nameko.value;
    const nameen = target.nameen.value;
    const top = target.top.value;
    Tree.insertTranslations({
      name: nameko,
      top: top
      }, {
      en: {
          name: nameen
      }
    });
    target.nameko.value = '';
    target.nameen.value = '';
    target.top.value = '';
  },
  'click #submittree'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".treeform").submit();
  },
});
