import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { Menus } from '../../api/menus.js';
import { Bulletinall } from '../../api/bulletinall.js';
import { Slide } from '../../api/slide.js';
import { Images } from '../../api/images.js';

import './slider.html';


Template.slider.onCreated(function asOnCreated() {
});

Template.aslide.onRendered(function asOnRendered() {
  $('.slider').slider({
    full_width: false,
    height: 500
  });
});


Template.slider.helpers({
  dream() {
    const instance = Template.instance();
    const type = "행사 소식";
    let list = [];
    for (var i=0; i< 3; i++) {
      let j = i + 1;
      const slide = Slide.findOne({num: j});
      let afile = slide.fileId;
      afile.getFileRecord();
      const obj = {
        image: afile,
        title: slide.name,
        detail: slide.content
      };
      list.push(obj);
    }
    return list;
  },
});


Template.aslide.helpers({
  concatm() {
    const instance = Template.instance();
    const detail = instance.data.detail;
    const concat = detail.slice(0, 15);
    return concat;
  },
});
