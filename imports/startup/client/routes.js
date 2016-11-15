import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Materialize } from 'meteor/materialize:materialize'

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/contentpage.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/homepage.js';
import '../../ui/pages/viewpage.js';
import '../../ui/pages/menuupdate.js';
import '../../ui/pages/upload.js';
import '../../ui/pages/gallery.js';
import '../../ui/pages/bulletinpage.js';
import '../../ui/pages/peoplepage.js';
import '../../ui/pages/timeline.js';
import '../../ui/pages/tree.js';

// Import to override accounts templates
//import '../../ui/accounts/accounts-templates.js';

/*FlowRouter.route('/lists/:_id', {
  name: 'Lists.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Lists_show_page' });
  },
});*/

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'homepage' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

FlowRouter.route('/contents-update/:titleinput', {
  name: 'contents.update',
  action() {
    BlazeLayout.render('App_body', { main: 'contentpage' });
  },
});

FlowRouter.route('/contents/:titleinput', {
  name: 'contents.show',
  action() {
    BlazeLayout.render('App_body', { main: 'viewpage' });
  },
});

FlowRouter.route('/gallery/:titleinput', {
  name: 'gallery.show',
  action() {
    BlazeLayout.render('App_body', { main: 'gallery' });
  },
});

FlowRouter.route('/bulletin/:titleinput', {
  name: 'bulletins.show',
  action() {
    BlazeLayout.render('App_body', { main: 'bulletinpage' });
  },
});

FlowRouter.route('/people/:titleinput', {
  name: 'people.show',
  action() {
    BlazeLayout.render('App_body', { main: 'peoplepage' });
  },
});

FlowRouter.route('/timeline/:titleinput', {
  name: 'timeline.show',
  action() {
    BlazeLayout.render('App_body', { main: 'timeline' });
  },
});

FlowRouter.route('/organization/:titleinput', {
  name: 'tree.show',
  action() {
    BlazeLayout.render('App_body', { main: 'tree' });
  },
});

FlowRouter.route('/menu', {
  name: 'menu.update',
  action() {
    BlazeLayout.render('App_body', { main: 'menuupdate' });
  },
});

FlowRouter.route('/upload', {
  name: 'file.upload',
  action() {
    BlazeLayout.render('App_body', { main: 'upload' });
  },
});
