import { Mongo } from 'meteor/mongo';

export const ImageData = new Mongo.Collection('imagedata');

if (Meteor.isServer) {
  ImageData.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
  // This code only runs on the server
  Meteor.publish('imagedata', function imagedataPublication() {
    return ImageData.find();
  });
}
