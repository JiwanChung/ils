import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Materialize } from 'meteor/materialize:materialize';
// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/contentpage.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/homepage.js';
import '../../ui/pages/insertpage.js';
import '../../ui/pages/viewpage.js';

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

FlowRouter.route('/add', {
  name: 'contents.add',
  action() {
    BlazeLayout.render('App_body', { main: 'insertpage' });
  },
});
