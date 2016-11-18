import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Timeline } from '../../api/timeline.js';
import { Ip } from '../../api/ip.js';

import './timeline.html';

// Components used inside the template
import './app-not-found.js';

Template.timeline.onCreated(function timelineOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
  const type = this.getContentTitle();
  Session.set({
    type: type,
    change: false
  });
});

Template.timeline.onRendered(function timelineOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
});

Template.addtime.onRendered(function addtimeOnRendered() {
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

Template.timeline.helpers({
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return instance.getContentTitle();
  },
  timeline() {
    return Timeline.find({}).fetch();
  },
  ip() {
    const sip = Session.get('ip');
    return Ip.findOne({ip: sip}) ? true : false;
  },
});


Template.mytimeline.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});



Template.timeline.events({

});

Template.addtime.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const detail = target.detail.value;
    const year = target.year.value;
    const thisfile = target.thisfile.files[0];

    const id = Timeline.insert({
      name: name,
      detail: detail,
      year: year,
    });
    console.log(name);
    Cloudinary._upload_file(thisfile, {
        public_id: id,
        type: "private",
        folder: "secret"
      },
      function(err, res) {
        console.log("Upload Error: " + err);
        console.log(res);
    });
    target.name.value = '';
    target.detail.value = '';
    target.year.value = '';
    $(".dropify-clear").click();
  },
  'click #submittime'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".timeform").submit();
  },
});
