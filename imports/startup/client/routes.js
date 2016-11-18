import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Materialize } from 'meteor/materialize:materialize';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/contentpage.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/homepage.js';
import '../../ui/pages/viewpage.js';
import '../../ui/pages/menuupdate.js';
import '../../ui/pages/gallery.js';
import '../../ui/pages/bulletinpage.js';
import '../../ui/pages/peoplepage.js';
import '../../ui/pages/timeline.js';
import '../../ui/pages/tree.js';
import '../../ui/pages/morepage.js';
import '../../ui/pages/map.js';
import '../../ui/pages/site.js';
import '../../ui/pages/admin.js';
import '../../ui/pages/admin2.js';

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
    BlazeLayout.render('App_body', { main: 'homepage' });
  },
};

FlowRouter.route('/contents-update/:titleinput/:id', {
  name: 'contents.update',
  action() {
    BlazeLayout.render('App_body', { main: 'contentpage' });
  },
});

FlowRouter.route('/contents/:titleinput/:id', {
  name: 'contents.show',
  action() {
    BlazeLayout.render('App_body', { main: 'viewpage' });
  },
});

FlowRouter.route('/gallery/:titleinput/:id', {
  name: 'gallery.show',
  action() {
    BlazeLayout.render('App_body', { main: 'gallery' });
  },
});

FlowRouter.route('/bulletin/:titleinput/:id', {
  name: 'bulletins.show',
  action() {
    BlazeLayout.render('App_body', { main: 'bulletinpage' });
  },
});

FlowRouter.route('/people/:titleinput/:id', {
  name: 'people.show',
  action() {
    BlazeLayout.render('App_body', { main: 'peoplepage' });
  },
});

FlowRouter.route('/timeline/:titleinput/:id', {
  name: 'timeline.show',
  action() {
    BlazeLayout.render('App_body', { main: 'timeline' });
  },
});

FlowRouter.route('/organization/:titleinput/:id', {
  name: 'tree.show',
  action() {
    BlazeLayout.render('App_body', { main: 'tree' });
  },
});

FlowRouter.route('/map/:titleinput/:id', {
  name: 'map.show',
  action() {
    BlazeLayout.render('App_body', { main: 'map' });
  },
});

FlowRouter.route('/site/:titleinput/:id', {
  name: 'site.show',
  action() {
    BlazeLayout.render('App_body', { main: 'site' });
  },
});

FlowRouter.route('/menu/:password', {
  name: 'menu.update',
  action() {
    BlazeLayout.render('App_body', { main: 'menuupdate' });
  },
});

FlowRouter.route('/admin/:password', {
  name: 'admin.show',
  action() {
    BlazeLayout.render('App_body', { main: 'admin' });
  },
});

FlowRouter.route('/beetle27', {
  name: 'admin.show',
  action() {
    BlazeLayout.render('App_body', { main: 'admin2' });
  },
});

FlowRouter.route('/:biginput/:menuid/:id', {
  name: 'more.show',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage' });
  },
});

FlowRouter.route('/board/:biginput/:titleinput/:menuid/:id', {
  name: 'more.board',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'bulletinpage' });
  },
});

FlowRouter.route('/gallery/:biginput/:titleinput/:menuid/:id', {
  name: 'more.gallery',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'gallery' });
  },
});

FlowRouter.route('/site/:biginput/:titleinput/:menuid/:id', {
  name: 'more.site',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'site' });
  },
});

FlowRouter.route('/people/:biginput/:titleinput/:menuid/:id', {
  name: 'more.people',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'peoplepage' });
  },
});

FlowRouter.route('/map/:biginput/:titleinput/:menuid/:id', {
  name: 'more.map',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'map' });
  },
});

FlowRouter.route('/history/:biginput/:titleinput/:menuid/:id', {
  name: 'more.history',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'timeline' });
  },
});

FlowRouter.route('/organization/:biginput/:titleinput/:menuid/:id', {
  name: 'more.tree',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'tree' });
  },
});

FlowRouter.route('/content/:biginput/:titleinput/:menuid/:id', {
  name: 'more.content',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'viewpage' });
  },
});
