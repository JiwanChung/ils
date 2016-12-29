import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Contentall } from '../../api/contentall.js';
var transformer = require('delta-transform-html');

import './quills.html';

Template.quills.onCreated(function quillOnCreated() {
  handle = Meteor.subscribe('contentall');
});

Template.quills.onRendered(function quillOnRendered() {
  var setinit = function() {
    let item = Session.get('item');
    let doc = item.doc;
    let obj = JSON.parse(doc);
    let rendered = transformer.transform(obj);
    quill.clipboard.dangerouslyPasteHTML(rendered);
  };


  var computation = this.autorun(function(thisComp) {
    const isReady = handle.ready();
    if(isReady) {
      setinit();
      thisComp.stop();
    }
  });
  var Delta = Quill.import('delta');
  let options = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['image'],
        [{ list: 'ordered' }],

        ['clean']
      ]
    },
    placeholder: '입력하세요',
    theme: 'snow'
  };
  Template.quill = quill = new Quill('#editor', options);

  var change = new Delta();
  quill.on('text-change', function(delta) {
    change = change.compose(delta);
  });

  Meteor.setInterval(function() {
    if (change.length() > 0) {
      /*
      Send partial changes
      $.post('/your-endpoint', {
        partial: JSON.stringify(change)
      });*/
      const type = Session.get('type');
      let item = Session.get('item');
      let pid = Session.get('pid');
      let contents = quill.getContents();
      let doc = JSON.stringify(contents, null, 2);
      var query = Meteor.call('upDoc', item.id, doc, (err, res) => {
        if (err) {
          alert(err);
        } else {
          Session.set({
            item: res
          });
        }
      });
      /*Contentall.update({
        _id: item._id
        },{
        $set: {
          doc: doc,
          createdAt: new Date()
        },
      });*/
      /*Meteor.call('upDoc', type, doc);
      Session.set({
        doc: doc
      });
      /*Send entire document
      $.post('/your-endpoint', {
        doc: JSON.stringify(quill.getContents())
      });
      */
      change = new Delta();
    }
  }, 5*1000);
});
