import { Meteor } from 'meteor/meteor';
import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
import { Footer } from '../../api/footer.js';
/*import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';*/

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  const foot = Footer.find({}).fetch();
  const length = foot.length;
  if (length < 1) {
    Footer.insert(
      {
          "_id": "MCmN3E2GxAqGu2Q5b",
          "value": "연세대학교 법학연구원",
          "name": "name"
      }
    );
    Footer.insert(
      {
          "_id": "m4TTEzohhPQXr8mWb",
          "value": "Institute of Legal Studies",
          "name": "detail"
      }
    );
    Footer.insert(
      {
          "_id": "v3z95rXpnnoMmD4y5",
          "value": "02-2123-6015",
          "name": "tel"
      }
    );
    Footer.insert(
      {
          "_id": "x4t3ivbdmQp9rXe3k",
          "value": "Copyright Yonsei Institute for Legal Studies All Rights Reserved",
          "name": "copyright"
      }
    );
    Footer.insert(
      {
          "_id": "gqMxgpZKhS2GYkcQP",
          "value": "02-312-3544",
          "name": "fax"
      }
    );
    Footer.insert(
      {
          "_id": "PHowtq5dobpmb5QQS",
          "value": "yslaw@yonsei.ac.kr",
          "name": "email"
      }
    );
  }
});
