// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks

//= require jquery3
//= require popper
//= require bootstrap-sprockets

//= require underscore
//= require backbone
//= require moment
//= require Chart.bundle
//= require chartkick

//= require handlebars
//= require_tree ./templates

//= require tasks

//= require_tree .

$(function () {
  // always pass csrf tokens on ajax calls, otherwise rails throws access control exception

  $.ajaxSetup({
    headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
  });

  // helpers needed to work with dates
  Handlebars.registerHelper({
    displayDate: function (date) {
      return moment(date).format('DD.MM.YY');
    },
    datepickerDate: function (date) {
      return moment(date).format('YYYY-MM-DD');
    },
  });
});