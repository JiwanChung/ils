import { Mongo } from 'meteor/mongo';
import { Counts } from 'meteor/tmeasday:publish-counts';

export const Timeline = new Mongo.Collection('timeline');

if (Meteor.isServer) {

}
