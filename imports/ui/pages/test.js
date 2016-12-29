import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { contentRenderHold } from '../launch-screen.js';

import { Ip } from '../../api/ip.js';
import { Menus } from '../../api/menus.js';

import './test.html';

// Components used inside the template
import './app-not-found.js';

Template.test.onCreated(function testOnCreated() {
});


Template.test.onRendered(function testOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.addtest.onRendered(function addtestOnRendered() {
  $('.dropify').dropify(
    {
      messages: {
          'default': '파일을 드래그하거나 클릭하세요.',
          'replace': '파일을 바꾸려면 파일을 드래그하거나 클릭하세요.',
          'remove':  '지우기',
          'error':   '파일 형식 오류'
      }
  }
  );
  $("input[type='image']").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("input[id='submittime']").click();
  });
});

Template.showtest.helpers({
  image() {
    var query = Meteor.call('showPic', 4, "ㅇㄴ", (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log("success");
        console.log(res);
        Session.set({
          imageres: res
        });
      }
    });
    const res = Session.get('imageres');
    return res[0];
  },
});

Template.test.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const file = target.thisfile.files[0];
    const name = file.name;
    const type = file.type;
    console.log("mymy");
    console.log(file);
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      const data = reader.result;
      const doc = JSON.stringify(data, null, 2);
      var query = Meteor.call('inPic', name, type, doc, null, (err, res) => {
        if (err) {
          alert(err);
        } else {
          console.log("success");
          console.log(res);
        }
      });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }


    $(".dropify-clear").click();
  },
  'click #submittime'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".timeform").submit();
  },
});
