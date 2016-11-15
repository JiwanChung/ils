import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/materialize:materialize';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import { People } from '../../api/people.js';
import './peoplepage.html';

// Components used inside the template
import './app-not-found.js';

Template.peoplepage.onCreated(function peopleOnCreated() {
  this.getPeopleType = () => FlowRouter.getParam('titleinput');
});

Template.peoplepage.onRendered(function peopleOnRendered() {

});


Template.addpeople.onRendered(function addpeopleOnRendered() {
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
        $("input[id='submitpeople']").click();
  });
});


Template.peoplepage.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  type() {
    const instance = Template.instance();
    return viewtype = instance.getPeopleType();
  },
  people() {
    return People.find({}).fetch();
  },
  peoplesearch() {
    const ses = Session.get("searched");
    if ( ses != null ) {
      return ses;
    } else {
      return People.find({});
    }
  }
});

Template.peoplecard.helpers({
  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});

Template.peoplecard.events({
  'click a'(e) {
    e.preventDefault();
    const instance = Template.instance();
    const id = instance.data._id;
    const target = $("#"+id);
    if ( !target.hasClass("active") ) {
      $(".active1").removeClass( "s12 m12 l8 active1" ).addClass( "s12 m6 l4" );
      $(".activecard1").removeClass("large activecard1").addClass("medium");

      $("#"+id).removeClass( "s12 m6 l4" ).addClass( "s12 m12 l8 active1" );
      $(id).removeClass("medium").addClass("large activecard1");
      $("#" + id + " .ishidden").show();
    }
  },
  'click .noclick'(e) {
    e.stopPropagation();
  },
});

Template.peoplepage.events({
  'click .gallerywrapper'(e) {
    $(".active1 .ishidden").hide();
    $(".active1").removeClass( "s12 m12 l8 active1" ).addClass( "s12 m6 l4" );
    $(".activecard1").removeClass("large activecard1").addClass("medium");
  },
});

Template.addpeople.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const journals = target.journals.value;
    const jobs = target.jobs.value;
    const detail = target.detail.value;
    const thisfile = target.thisfile.files[0];

    Session.set({name: name});


    const id = People.insert({
      name: name,
      detail: detail,
      job: jobs,
      journal: journals
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
    target.journals.value = '';
    target.jobs.value = '';
    $(".dropify-clear").click();
  },
  'click #submitpeople'(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".peopleform").submit();
  },
});
