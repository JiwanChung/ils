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

Template.searchs.events({
  'keyup input'(event) {
    const result = Session.get("searchtype");
    const instance = Template.instance();
    const data = instance.data.Arrays.fetch();
    const value = $(event.target).val();
    let findit = function(element) {
      if (!!result ) {
        if ( result == "content") {
          var stringit = element.detail;
        } else {
          var stringit = element.title;
        }
      } else {
        var stringit = element.title;
      }
      const boole = stringit.indexOf( value ) > -1;
      return boole;
    };
    const returneddata = data.filter(findit);
    Session.set({
      searchresult: returneddata
    });
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
