import { Mongo } from 'meteor/mongo';
import { Counts } from 'meteor/tmeasday:publish-counts';

export const Tree = new Mongo.Collection('tree');

if (Meteor.isServer) {

}
