import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';
import { Ip } from '../../api/ip.js';

import { contentRenderHold } from '../launch-screen.js';

import { Menus } from '../../api/menus.js';
import { Site } from '../../api/site.js';
import './site.html';

// Components used inside the template
import './app-not-found.js';

Template.site.onCreated(function siteOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getSiteType = () => Menus.findOne({_id: id}).name;
});

Template.site.onRendered(function siteOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});




Template.site.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getSiteType();
  },
  site() {
    const instance = Template.instance();
    const type = instance.getSiteType();
    return Site.find({type: type}).fetch();
  },
  sitesearch() {
    const ses = Session.get("searched");
    if ( ses != null ) {
      return ses;
    } else {
      const instance = Template.instance();
      const type = instance.getSiteType();
      return Site.find({type: type}).fetch();
    }
  },
  siteatt() {
    function distinct() {
      var data = Site.find({}).fetch();
      var distinctData = _.uniq(data, false, function(d) {return d.category});
      return distinctData;
    };
    const att = distinct();
    if ( att.lenth != 0 ) {
      Session.set({
        attr: att
      });
    }
    console.log(Session.get('attr'));
    return Session.get('attr');
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});


Template.sitecontents.helpers({
  returndata(cat) {
    console.log("searched");
    const instance = Template.instance();
    const searched = instance.data.searched;
    const shouldreturn = searched.filter(function rundevilrun(elem) {
      return elem.category == cat;
    });
    return shouldreturn;
  },
});




Template.addsite.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const link = target.link.value;
    const cat = target.cat.value;
    const instance = Template.instance();
    const type = instance.data.type;

    const id = Site.insert({
      name: name,
      link: link,
      type: type,
      category: cat
    });
    console.log(name);
    target.name.value = '';
    target.link.value = '';
    target.cat.value = '';
  },
  'click #submitsite'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".siteform").submit();
  },
});
