import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Menus } from '../../api/menus.js';
import { Jlink } from '../../api/jlink.js';

import './journallink.html';

// Components used inside the template
import './app-not-found.js';

Template.journallink.onCreated(function journalOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  let id = this.getId();
  this.getContentTitle = () => Menus.findOne({_id: id}).name;
});

Template.journallink.onRendered(function journalOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.journallink.helpers({
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getContentTitle();
  },
  link() {
    const instance = Template.instance();
    const type = instance.getContentTitle();
    switch(type) {
      case "법학연구":
        return "http://ils.yonsei.ac.kr/sub3/JournalSearch_ils/ISS_GotoSearch.php";
        break;
      case "공공거버넌스와 법":
        return "http://ils.yonsei.ac.kr/sub3/JournalSearch_pub/ISS_GotoSearch.php";
        break;
      case "글로벌비즈니스와 법":
        return "http://ils.yonsei.ac.kr/sub3/JournalSearch_glo/ISS_GotoSearch.php";
        break;
      case "의료과학기술과 법":
        return "http://ils.yonsei.ac.kr/sub3/JournalSearch_med/ISS_GotoSearch.php";
        break;
      default:
        return "http://ils.yonsei.ac.kr/sub3/JournalSearch_ils/ISS_GotoSearch.php";
        break;
    }
  },
});


/*
Template.mymap.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});*/
