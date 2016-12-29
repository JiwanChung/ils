import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Menus } from '../../api/menus.js';
import { $ } from 'meteor/jquery';
import './jumbo.html';


Template.jumbo.onCreated(function jumboOnCreated() {
});

Template.jumbo.onRendered(function jumboOnRendered() {
});

Template.jumbo.helpers({
  jumbos() {
    const id = FlowRouter.getParam('id');
    return Menus.findOne({_id: id});
  },
  more() {
    const bigid = FlowRouter.getParam('bigid');
    if (typeof bigid === 'undefined' || ! bigid) {
      return true;
    } else {
      const instance = Template.instance();
      const moreid = instance.data.more;
      if (moreid > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
});

Template.jumboimage.helpers({
  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});
