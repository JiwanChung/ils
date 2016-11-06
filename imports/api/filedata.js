import { Mongo } from 'meteor/mongo';

export const FileData = new Mongo.Collection('filedata');

if (Meteor.isServer) {
  FileData.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
  // This code only runs on the server
  Meteor.publish('filedata', function filedataPublication() {
    return FileData.find();
  });
}
