import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Menus } from '../../api/menus.js';

import './jumbo.html';


Template.jumbo.onCreated(function jumboOnCreated() {
});

Template.jumbo.onRendered(function jumboOnRendered() {
});

Template.jumbo.helpers({
  jumbos() {
    const id = FlowRouter.getParam('id');
    console.log(id);
    return Menus.findOne({_id: id});
  },
});

Template.jumboimage.helpers({
  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});
