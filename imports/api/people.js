import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('people', function peoplePublication() {
    return People.find();
  });
}
