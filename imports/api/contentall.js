import { Mongo } from 'meteor/mongo';

export const Contentall = new Mongo.Collection('contentall');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('contentall', function contentsPublication() {
    return Contentall.find();
  });
}
