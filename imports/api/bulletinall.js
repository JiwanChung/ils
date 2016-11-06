import { Mongo } from 'meteor/mongo';

export const Bulletinall = new Mongo.Collection('bulletinall');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('bulletinall', function bulletinsPublication() {
    return Bulletinall.find();
  });
  Meteor.publish('bulletinall', function() {
    Counts.publish(this, 'bulletincounter', Posts.find());
  });
}
