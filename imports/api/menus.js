import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';

export const Menus = new TAPi18n.Collection("menus", {base_language: 'ko'});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('menus', function menusPublication() {
    return Menus.find();
  });
}
