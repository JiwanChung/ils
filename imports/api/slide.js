import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';

export const Slide = new TAPi18n.Collection("slide", {base_language: 'ko'});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('slide', function slidePublication() {
    return Slide.find();
  });
}
