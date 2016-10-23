import { Meteor } from 'meteor/meteor';
import { Menusl } from '../../api/menusl.js';
import { Contentall } from '../../api/contentall.js';
import { Menus } from '../../api/menus.js';
/*import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';*/

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Contentall.find().count() === 0) {
    const data = [
      {
        title: '소개',
        detail: '안녕하시오'
      },
      {
        title: '으아',
        detail: '으으으으'
      },
      {
        title: '아악',
        detail: 'ㅇㄴ아즈'
      },
    ];
  }
});
