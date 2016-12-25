import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

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
import '../../ui/pages/mainupdate.js';
import '../../ui/pages/journallink.js';
import '../../ui/pages/test.js';
import '../../ui/pages/journaladmin.js';

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

FlowRouter.route('/test', {
  name: 'App.test',
  action() {
    BlazeLayout.render('App_body', { main: 'test' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

FlowRouter.route('/contents-update/:id', {
  name: 'contents.update',
  action() {
    BlazeLayout.render('App_body', { main: 'contentpage' });
  },
});

FlowRouter.route('/contents/:id', {
  name: 'contents.show',
  action() {
    BlazeLayout.render('App_body', { main: 'viewpage' });
  },
});

FlowRouter.route('/gallery/:id', {
  name: 'gallery.show',
  action() {
    BlazeLayout.render('App_body', { main: 'gallery' });
  },
});

FlowRouter.route('/bulletin/:id', {
  name: 'bulletins.show',
  action() {
    BlazeLayout.render('App_body', { main: 'bulletinpage' });
  },
});

FlowRouter.route('/people/:id', {
  name: 'people.show',
  action() {
    BlazeLayout.render('App_body', { main: 'peoplepage' });
  },
});

FlowRouter.route('/timeline/:id', {
  name: 'timeline.show',
  action() {
    BlazeLayout.render('App_body', { main: 'timeline' });
  },
});

FlowRouter.route('/journallink/:id', {
  name: 'journallink.show',
  action() {
    BlazeLayout.render('App_body', { main: 'journallink' });
  },
});

FlowRouter.route('/organization/:id', {
  name: 'tree.show',
  action() {
    BlazeLayout.render('App_body', { main: 'tree' });
  },
});

FlowRouter.route('/map/:id', {
  name: 'map.show',
  action() {
    BlazeLayout.render('App_body', { main: 'map' });
  },
});

FlowRouter.route('/site/:id', {
  name: 'site.show',
  action() {
    BlazeLayout.render('App_body', { main: 'site' });
  },
});

FlowRouter.route('/menu', {
  name: 'menu.update',
  action() {
    BlazeLayout.render('App_body', { main: 'menuupdate' });
  },
});

FlowRouter.route('/slide', {
  name: 'slide.update',
  action() {
    BlazeLayout.render('App_body', { main: 'mainupdate' });
  },
});

FlowRouter.route('/myadmin', {
  name: 'admin.show',
  action() {
    BlazeLayout.render('App_body', { main: 'admin' });
  },
});

FlowRouter.route('/myjadmin', {
  name: 'jadmin.show',
  action() {
    BlazeLayout.render('App_body', { main: 'journaladmin' });
  },
});

FlowRouter.route('/more/:bigid', {
  name: 'more.show',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'viewpage'});
  },
});

FlowRouter.route('/dnone/:bigid', {
  name: 'more.none',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'App_notFound'});
  },
});

FlowRouter.route('/dboard/:bigid/:id', {
  name: 'more.board',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'bulletinpage' });
  },
});

FlowRouter.route('/dgallery/:bigid/:id', {
  name: 'more.gallery',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'gallery' });
  },
});

FlowRouter.route('/dsite/:bigid/:id', {
  name: 'more.site',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'site' });
  },
});

FlowRouter.route('/dpeople/:bigid/:id', {
  name: 'more.people',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'peoplepage' });
  },
});

FlowRouter.route('/dmap/:bigid/:id', {
  name: 'more.map',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'map' });
  },
});

FlowRouter.route('/dhistory/:bigid/:id', {
  name: 'more.history',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'timeline' });
  },
});

FlowRouter.route('/dorganization/:bigid/:id', {
  name: 'more.tree',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'tree' });
  },
});

FlowRouter.route('/djournallink/:bigid/:id', {
  name: 'more.journallink',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'journallink' });
  },
});

FlowRouter.route('/dcontent/:bigid/:id', {
  name: 'more.content',
  action() {
    BlazeLayout.render('App_body', { main: 'morepage', sub: 'viewpage' });
  },
});
