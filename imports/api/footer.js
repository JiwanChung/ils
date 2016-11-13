import { Mongo } from 'meteor/mongo';

export const Footer = new Mongo.Collection('footer');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('footer', function footerPublication() {
    return Footer.find();
  });
}
