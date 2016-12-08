import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';


import './searchnorm.html';


Template.searchnorm.onCreated(function searchnOnCreated() {
});

Template.searchnorm.onRendered(function searchnOnRendered() {
  $('select').material_select();
});

Template.searchnorm.events({
  'keyup input'(event) {
    const result = Session.get("searchtype");
    const instance = Template.instance();
    const type = result;
    const coll = instance.data.coll;
    const value = $(event.target).val();
    Session.set({keyword: value});
    let returneddata = [];
    function findit(ses) {
     return  ses.name.indexOf(value) >= 0;
    };
    returneddata = coll.filter(findit);
    Session.set({
      searched: returneddata
    });

    return;
  },
  'submit form'(event) {
    event.preventDefault();
  },
});

Template.choosesearch2.events({
  "change #chosen": function(evt) {
  const value = $(evt.target).val();
  Session.set({
    searchtype: value
  });
}
});
