import { Mongo } from 'meteor/mongo';
import { FS } from 'meteor/cfs:base-package';

export const Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {path: process.env.PWD + "/public/files"})]
});

if (Meteor.isServer) {
  // This code only runs on the server
  Files.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
  Meteor.publish('files', function filesPublication() {
    return Files.find();
  });
}
