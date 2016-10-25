import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import { ImagesStore } from '../../api/images.js';
import { Thumbnail128Store } from '../../api/images.js';

import './upload.html';

// Components used inside the template
import './app-not-found.js';

Template.uploaditall.onRendered(function uploadPageOnRendered() {
  $('.dropify').dropify(
    {
      messages: {
          'default': '파일을 드래그하거나 클릭하세요.',
          'replace': '파일을 바꾸려면 파일을 드래그하거나 클릭하세요.',
          'remove':  '지우기',
          'error':   '파일 형식 오류'
      }
  }
  );
});

Template.uploaditall.events({
  'submit form'(event) {
    event.preventDefault();
    let self = this;

    const target = event.target;
    const filename = target.filename.value;
    const filedetail = target.filedetail.value;
    const thisfile = target.filedetail.value;

    UploadFS.selectFiles(function (thisfile) {
            // Prepare the file to insert in database, note that we don't provide a URL,
            // it will be set automatically by the uploader when file transfer is complete.
            let image = {
                name: file.name,
                size: file.size,
                type: file.type,
                filename: filename,
                filedetail: filedetail
            };

            // Create a new Uploader for this file
            let uploader = new UploadFS.Uploader({
                // This is where the uploader will save the file
                // since v0.6.7, you can pass the store instance or the store name directly
                store: ImagesStore || 'images',
                // Optimize speed transfer by increasing/decreasing chunk size automatically
                adaptive: true,
                // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
                // (used only if adaptive = true)
                capacity: 0.8, // 80%
                // The size of each chunk sent to the server
                chunkSize: 8 * 1024, // 8k
                // The max chunk size (used only if adaptive = true)
                maxChunkSize: 128 * 1024, // 128k
                // This tells how many tries to do if an error occurs during upload
                maxTries: 5,
                // The File/Blob object containing the data
                data: file,
                // The document to save in the collection
                file: images,
                // The error callback
                onError: function (err) {
                    console.error(err);
                },
                onAbort: function (file) {
                    console.log(file.name + ' upload has been aborted');
                },
                onComplete: function (file) {
                    console.log(file.name + ' has been uploaded');
                },
                onCreate: function (file) {
                    console.log(file.name + ' has been created with ID ' + file._id);
                },
                onProgress: function (file, progress) {
                    console.log(file.name + ' ' + (progress*100) + '% uploaded');
                },
                onStart: function (file) {
                    console.log(file.name + ' started');
                },
                onStop: function (file) {
                    console.log(file.name + ' stopped');
                },
            });

            // Starts the upload
            uploader.start();

            // Stops the upload
            uploader.stop();

            // Abort the upload
            uploader.abort();
    });
  },
});
