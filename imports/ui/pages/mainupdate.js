import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { Slide } from '../../api/slide.js';
import { Ip } from '../../api/ip.js';
import { Images } from '../../api/images.js';

import './mainupdate.html';

// Components used inside the template
import './app-not-found.js';

Template.mainupdate.helpers({

  ip() {
    const sip = Session.get('ip');
    const dip = sip[0];
    const obj = Ip.findOne({ip: dip});
    return obj ? true : false;
  },
  add() {
    const arrat = [
      { type: 1 },
      { type: 2 },
      { type: 3 },
    ];
    return arrat;
  },
});

Template.mainadd.helpers({
  image() {
    const instance = Template.instance();
    const num = instance.data.type;
    const slide = Slide.findOne({num: num});
    let afile = slide.fileId;
    afile.getFileRecord();
    return afile;
  }
});

Template.mainadd.events({
  'submit form'(event) {
    event.preventDefault();
    // Get value from form element
    const ids = $(event.target).attr('id');
    const res = ids.slice(7,8);
    const num = Number(res);
    const target = event.target;
    const nameen = target.nameen.value;
    const nameko = target.nameko.value;
    const conko = target.conko.value;
    const conen = target.conen.value;
    const thisfile = target.thisfile.files[0];
    const fileId = Images.insert(thisfile);
    const obj = Slide.findOne({num: num});
    const id = obj._id;
    if ( ! id ) {
      Slide.insertTranslations({
        name: nameko,
        content: conko,
        fileId: fileId,
        num: num
        }, {
        en: {
            name: nameen,
            content: conen
        }
      });
    } else {
      Slide.updateTranslations(id, {
        ko: {
        name: nameko,
        content: conko,
        fileId: fileId
        }
        }, {
        en: {
            name: nameen,
            content: conen
        }
      });
    }

    // Insert a task into the collection

    // Clear form
    target.nameen.value = '';
    target.nameko.value = '';
    target.conko.value = '';
    target.conen.value = '';
    $(".dropify-clear").click();
  },
  'click .sendform'(event) {
    event.preventDefault();
    event.stopPropagation();
    const id = $(event.target).attr('id');

    const res = id.slice(9,10);

    const num = Number(res);

    $("#newform" + num).submit();
  },
});

Template.mainadd.onRendered(function neonRendered() {
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
