import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

Images = new Mongo.Collection('images');

export const ImagesStore = new UploadFS.store.local({
  collection: Images,
  name: 'images',
  path: '/uploads/images',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  })
});
