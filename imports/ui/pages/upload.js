import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { FS } from 'meteor/cfs:base-package';
import { Session } from 'meteor/session';

import './upload.html';

// Components used inside the template
import './app-not-found.js';

import { Images } from '../../api/images.js';
import { ImageData } from '../../api/imagedata.js';


Template.upload.helpers({
  mid() {
    return Session.get("filename");
  },
});


Template.uploaditall.onRendered(function uploadPageOnRendered() {
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
        $("input[id='submitit']").click();
  });
});

Template.uploaditall.helpers({
  images() {
    return Images.find();
  },
  imagedata() {
    return ImageData.find();
  },
})

Template.uploaditall.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const type = target.type.value;
    const filename = target.filename.value;
    const filedetail = target.filedetail.value;
    const thisfile = target.thisfile.files[0];

    Session.set({filename: filename});

    Cloudinary._upload_file(thisfile, {
        public_id: filename,
        type: "private"
      },
      function(err, res) {
        console.log("Upload Error: " + err);
        console.log(res);
    });
    ImageData.insert({
      type: type,
      name: filename,
      detail: filedetail
    });
    console.log(this.type);
    target.type.value = '';
    target.filename.value = '';
    target.filedetail.value = '';
    $(".dropify-clear").click();
  },
  'click #submitit'(event) {
    event.preventDefault();
    $(".uploadform").submit();
  },
});
