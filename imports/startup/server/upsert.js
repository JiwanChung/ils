import { Journals } from '../../api/journals.js';
import { Panel } from '../../api/panel.js';

Meteor.methods({
  JournalsUpsert: function( name, ckey ){
    Journals.upsert({
      name: name
    }, {$set: {
      name: name,
      CID: ckey
    }});
    return "upserted";
  }
});
