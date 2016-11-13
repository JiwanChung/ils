import { Mongo } from 'meteor/mongo';
import { Counts } from 'meteor/tmeasday:publish-counts';

export const Bulletinall = new Mongo.Collection('bulletinall');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('postsWithSkip', function countskip(skip, limit) {
    Counts.publish(this, 'total_posts', Bulletinall.find());
    if (skip < 0) {skip = 0;}
    options = {};
    options.skip = skip;
    options.limit = limit;
    if (options.limit > 10) {options.limit = 10;}
    options.sort = {createdAt: 1};
    Bulletinall.find({}, options);
  });
}
