import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { FS } from 'meteor/cfs:base-package';
import './upload.html';

// Components used inside the template
import './app-not-found.js';

import { Images } from '../../api/images.js';
import { ImageData } from '../../api/imagedata.js';


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
    let self = this;

    const target = event.target;
    this.filename = target.filename.value;
    this.filedetail = target.filedetail.value;
    this.thisfile = target.thisfile.files[0];
    //console.log("name:" + this.filename);
    //console.log("file:" + this.thisfile.name);
    let fileObj = Images.insert(this.thisfile);
    ImageData.insert({
      name: this.filename,
      detail: this.filedetail,
      photo: fileObj
    });
  },
});
