import { Mongo } from 'meteor/mongo';
import { FS } from 'meteor/cfs:base-package';
import { FileSystem } from 'meteor/skaro:filesystem';

export const Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: process.cwd() + "/images"})]
});

if (Meteor.isServer) {
  // This code only runs on the server
  Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
  Meteor.publish('images', function imagesPublication() {
    return Images.find();
  });
}
