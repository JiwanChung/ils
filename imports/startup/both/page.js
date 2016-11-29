import { Bulletinall } from '../../api/bulletinall.js';

this.BulletinNewsPages = new Meteor.Pagination(Bulletinall, {
  itemTemplate: "bulletindata",
  availableSettings: {
      filters: true,
      sort: true,
    },
});
