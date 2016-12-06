import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';

export const Tree = new TAPi18n.Collection("tree", {base_language: 'ko'});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tree', function treePublication() {
    return Tree.find();
  });
}
