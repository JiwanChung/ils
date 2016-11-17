import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { Tree } from '../../api/tree.js';

import './tree.html';

// Components used inside the template
import './app-not-found.js';

Template.tree.onCreated(function treeOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
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
});

/*
Template.mytree.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});*/



Template.chart.events({
  'click a'(e) {
    e.preventDefault();
  }
});

Template.addtree.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const detail = target.detail.value;
    const year = target.year.value;
    const thisfile = target.thisfile.files[0];

    const id = Tree.insert({
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
  'click #submittree'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".treeform").submit();
  },
});
