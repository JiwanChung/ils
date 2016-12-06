import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Footer } from '../../api/footer.js';
import { Session } from 'meteor/session';
import { Materialize } from 'meteor/materialize:materialize';
import { contentRenderHold } from '../launch-screen.js';
import { Ip } from '../../api/ip.js';

import './footer.html';

Template.footer.onCreated(function footerOnCreated() {
});

Template.footer.onRendered(function footerOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
      Session.set({
        foottemp: 'foot'
      });
    }
  });
});

Template.footadd.onRendered(function footaddOnRendered() {
  this.autorun(() => {
      Materialize.updateTextFields();
    }
  );
});

Template.footer.helpers({
  foottemp() {
    return Session.get('foottemp');
  },
  footer() {
    this.feet = Footer.find({}).fetch();
    return this;
  },
});

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
};

Template.footadd.helpers({
  foote(param) {
    const instance = Template.instance();
    const data = instance.data.feet;
    const wow = search(param , data).value;
    return wow;
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.foot.helpers({
  foote(param) {
    const instance = Template.instance();
    const data = instance.data.feet;
    const wow = search(param , data).value;
    return wow;
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.foot.events({
  'click #footchange'(event) {
    Session.set({
      foottemp: 'footadd'
    });
    console.log(Session.get('foottemp'));
  },
});

Template.footadd.events({
  'keyup input'(event) {
    const target = event.target;
    const thisname = target.name;
    let value = target.value;
    let item = Footer.findOne({name: thisname});
    if (item) {
      Footer.update({
        _id: item._id
      },{
        $set: {
          value: value
        },
      });
    } else {
      Footer.insert({
        value: value,
        name: thisname
      });
    }

    return;
  },
  'submit form'(event) {
    event.preventDefault();
  },
  'click #foot'(event) {
    Session.set({
      foottemp: 'foot'
    });
  },
});
