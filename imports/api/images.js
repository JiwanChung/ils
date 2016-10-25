import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

Images = new Mongo.Collection('images');
Thumbnails128 = new Mongo.Collection('thumbnails-128');

export const ImagesStore = new UploadFS.store.Local({
  collection: Images,
  name: 'images',
  path: '/uploads/images',
  permissions: new UploadFS.StorePermissions({
        insert: function (userId, doc) {
            return userId;
        },
        update: function (userId, doc) {
            return true;
        },
        remove: function (userId, doc) {
            return true;
        }
  }),
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  copyTo: [
    Thumbnail128Store
  ]
});

export const Thumbnail128Store = new UploadFS.store.Local({
  collection: Thumbnails128,
  name: 'thumbnails-128',
  path: '/uploads/thumbnails/128x128',
  permissions: new UploadFS.StorePermissions({
        insert: function (userId, doc) {
            return userId;
        },
        update: function (userId, doc) {
            return true;
        },
        remove: function (userId, doc) {
            return true;
        }
  }),
  transformWrite: function(readStream, writeStream, fileId, file) {
        let gm = Npm.require('gm');
        if (gm) {
            gm(from)
                .resize(128, 128)
                .gravity('Center')
                .extent(128, 128)
                .quality(75)
                .stream().pipe(to);
        } else {
            console.error("gm is not available", file);
        }
    }
})
