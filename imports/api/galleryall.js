import { Mongo } from 'meteor/mongo';

export const Galleryall = new Mongo.Collection('galleryall');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('galleryall', function galleryPublication() {
    return Galleryall.find();
  });
}
