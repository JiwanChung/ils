import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';


import './searchs.html';


Template.searchs.onCreated(function searchOnCreated() {
});

Template.searchs.onRendered(function searchOnRendered() {
  $('select').material_select();
});

let setbulletin = function(val, type) {
  const filter = {
    filters: {
      title: {$regex:
        val
      },
      type: type
    },
    sort: {
      createdAt: -1
    },
  };
  return filter;
};

let setbulletinc = function(val, type) {
  const filter = {
    filters: {
      detail: {$regex:
        val
      },
      type: type
    },
    sort: {
      createdAt: -1
    },
  };
  return filter;
};

let setbulletine = function(type) {
  const filter = {
    filters: {
      type: type
    },
    sort: {
      createdAt: -1
    },
  };
  return filter;
};

Template.searchs.events({
  'keyup input'(event) {
    const result = Session.get("searchtype");
    const instance = Template.instance();
    const type = instance.data.type;
    console.log("searchtype"+ type);
    const value = $(event.target).val();
    if (value == null || value == "") {
      Session.set({searchresult: setbulletine(type)});
      return;
    }
    if (result == null || result == "" ) {
      Session.set({searchresult: setbulletin(value, type)});
    } else if ( result == "content" ) {
      Session.set({searchresult: setbulletinc(value, type)});
    } else {
      Session.set({searchresult: setbulletin(value, type)});
    }
    return;
  },
  'submit form'(event) {
    event.preventDefault();
  },
});

Template.choosesearch.events({
  "change #chosen": function(evt) {
  const value = $(evt.target).val();
  Session.set({
    searchtype: value
  });
}
});
