import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
import { Ip } from '../../api/ip.js';

import './menuupdate.html';

// Components used inside the template
import './app-not-found.js';

Template.menuupdate.helpers({
  addtemp() {
    return Session.get("addtemp");
  },
  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
});

Template.menushow.helpers({
  hier0() {
    return Menus.find({hier:0}).fetch();
  },
  hier1(id) {
    return Menus.find({parent:id}).fetch();
  },
  hier2(id) {
    return Menus.find({parent:id}).fetch();
  },
});

Template.menushow.events({
  'click a'(event) {
    event.preventDefault();
    const addtemp = $(event.currentTarget).attr("id");
    const name = $(event.currentTarget).attr("data-name2");
    const hier = $(event.currentTarget).attr("hier");
    const id = $(event.currentTarget).attr("name");
    Session.set({
      addtemp: addtemp,
      tempname: name,
      hier: hier,
      id: id
    })
    $("html, body").animate({ scrollTop: 500 }, "slow");
  },
});

Template.underadd.helpers({
  name() {
    return Session.get("tempname");
  },
  hier() {
    return Session.get("hier");
  },
});

Template.newadd.events({
  'submit form'(event) {
    event.preventDefault();


    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = null;
    const hier = 0;
    const type = target.menuradio.value;
    const thisfile = target.thisfile.files[0];
    if (type == "content") {
      Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
      Contentall.insert({
        titleinput: nameen,
        doc: null,
        createdAt: new Date(), // current time
      });
    }

    // Insert a task into the collection
    const id = Menus.insertTranslations({
      name: nameko,
      type: type,
      parent: parent,
      hier: hier,
      createdAt: new Date(), // current time
    }, {
      en: {
        name: nameen
      }
    });

    Cloudinary._upload_file(thisfile, {
        public_id: id,
        type: "private",
        folder: "secret"
      },
      function(err, res) {
        console.log("Upload Error: " + err);
        console.log(res);
    });

    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
    $(".dropify-clear").click();
  },
  'click #submitnew'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".newform").submit();
  },
});

Template.newadd.onRendered(function neonRendered() {
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
        $("input[id='submitnew']").click();
  });
});

Template.underadd.onRendered(function udonRendered() {
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
        $("input[id='submitunder']").click();
  });
});

Template.underadd.events({
  'submit form'(event) {
    event.preventDefault();

    const instance = Template.instance();
    // Get value from form element
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const parent = Session.get("id");
    const hier = Session.get("hier");
    const type = target.menuradio.value;
    const thisfile = target.thisfile.files[0];
    if (type == "content") {
      Contentall.insert({
        titleinput: nameko,
        doc: null,
        createdAt: new Date(), // current time
      });
      Contentall.insert({
        titleinput: nameen,
        doc: null,
        createdAt: new Date(), // current time
      });
    }
    // Insert a task into the collection
    const id = Menus.insertTranslations({
      name: nameko,
      type: type,
      parent: parent,
      hier: hier,
      createdAt: new Date(), // current time
    }, {
      en: {
        name: nameen
      }
    });

    Cloudinary._upload_file(thisfile, {
        public_id: id,
        type: "private",
        folder: "secret"
      },
      function(err, res) {
        console.log("Upload Error: " + err);
        console.log(res);
    });

    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
  },
  'click #submitunder'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".underform").submit();
  },
});
