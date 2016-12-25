import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';
import { contentRenderHold } from '../launch-screen.js';

import { Menus } from '../../api/menus.js';
import { Jlink } from '../../api/jlink.js';
import { Journals } from '../../api/journals.js';

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
  clientKey() {
    const instance = Template.instance();
    const type = instance.getContentTitle();
    console.log("WTF", type);
    const fetched = Journals.findOne({name: type});
    console.log("WTF", fetched);
    const ckey = fetched.CID;
    console.log("WTF", ckey);
    return ckey;
  },
  startPage() {
    return "ISS_RForm";
  },
  Session_Member() {
    const sip = Session.get('ip');
    const dip = sip[0];
    return dip;
  },
  eVal() {
    let date = new Date();
    const fYear = String(date.getFullYear());
    const y = fYear.substr(2, 4);
    const zMonth = date.getMonth();
    const m = ('0' + String(zMonth+1)).slice(-2);
    const zDate = date.getDate();

    const d = ('0' + String(zDate)).slice(-2);
    const zHour = String(date.getHours());
    const H = ('0' + zHour).slice(-2);
    const zMin = String(date.getMinutes());
    const i = ('0' + zMin).slice(-2);
    const n = String(zMonth + 1);
    const j = zDate;
    let timeStamp = y.concat(m, d, H, i);
    let strTemp = '';
    for (let intTemp = 1; intTemp <= 10; intTemp++){
        strTemp = timeStamp.substr(intTemp - 1, 1).concat(strTemp);
        if (intTemp == 1){
            strTemp = String(203 + (('0' + String(date.getSeconds())).slice(-2)*n)).concat(strTemp);
        }
        if (intTemp == 3){
            strTemp = String(189 + (j*H)).concat(strTemp);
        }
        if (intTemp == 9){
            strTemp = String(187 + Number(('0' + String(date.getSeconds())).slice(-2))).concat(strTemp);
        }
    }
    console.log(strTemp);
    return strTemp;
  }
});


/*
Template.mymap.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});*/
