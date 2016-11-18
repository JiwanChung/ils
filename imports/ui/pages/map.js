import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

import { contentRenderHold } from '../launch-screen.js';

import './map.html';

// Components used inside the template
import './app-not-found.js';

Template.map.onCreated(function mapOnCreated() {
  this.getContentTitle = () => FlowRouter.getParam('titleinput');
});

Template.map.onRendered(function mapOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      contentRenderHold.release();
    }
  });
  var mapOptions = {
    center: new naver.maps.LatLng(37.564009, 126.936091),
    zoom: 10
  };
  var ils = new naver.maps.LatLng(37.564009, 126.936091);
  var map = new naver.maps.Map('map', mapOptions);
  marker = new naver.maps.Marker({
    map: map,
    position: ils
  });
  var HOME_PATH = window.HOME_PATH || '.';
  var contentString = [
        '<div class="iw_inner">',
        '   <h5>연세대학교 법학연구원 사무실</h5>',
        '   <p>연세대학교 학술정보원 7층 법학연구원<br />',
        '       <br />',
        '       02-2123-6015 <br />',
        '       ',
        '   </p>',
        '</div>'
  ].join('');

  var infowindow = new naver.maps.InfoWindow({
      content: contentString
  });

  naver.maps.Event.addListener(marker, "click", function(e) {
      if (infowindow.getMap()) {
          infowindow.close();
      } else {
          infowindow.open(map, marker);
      }
  });

  infowindow.open(map, marker);
});


Template.amap.onRendered(function amapOnRendered() {
  var amapOptions = {
    center: new naver.maps.LatLng(37.564615, 126.936666),
    zoom: 10
  };
  var ils = new naver.maps.LatLng(37.564615, 126.936666);
  var amap = new naver.maps.Map('amap', amapOptions);
  amarker = new naver.maps.Marker({
    map: map,
    position: ils
  });
  var HOME_PATH = window.HOME_PATH || '.';
  var acontentString = [
        '<div class="iw_inner">',
        '   <h5>광복관 법학연구원</h5>',
        '   <p>연세대학교 광복관 법학연구원<br />',
        '       <br />',
        '       02-2123-6015 <br />',
        '       ',
        '   </p>',
        '</div>'
  ].join('');

  var infowindow = new naver.maps.InfoWindow({
      content: acontentString
  });

  naver.maps.Event.addListener(amarker, "click", function(e) {
      if (infowindow.getMap()) {
          infowindow.close();
      } else {
          infowindow.open(amap, amarker);
      }
  });

  infowindow.open(amap, amarker);
});


Template.map.helpers({
  type() {
    FlowRouter.watchPathChange();
    const instance = Template.instance();
    return viewtype = instance.getContentTitle();
  },
});


/*
Template.mymap.helpers({

  id() {
    const instance = Template.instance();
    const id = instance.data._id;
    return "secret/" + id;
  },
});*/
