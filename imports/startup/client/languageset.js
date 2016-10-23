import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  var damn = TAPi18n.setLanguage("ko");
  console.log("language to ko!" + damn);
});
