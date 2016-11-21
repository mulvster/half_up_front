// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//require bootstrap-sprockets
//= require turbolinks
//= require parallax
//= require websocket_rails/main
//= require_tree .
//




var dispatcher = new WebSocketRails('localhost:3000/websocket');

dispatcher.on_open = function(data) {
  console.log('Connection has been established', data);
  dispatcher.trigger('hello','hello this is working')
};

dispatcher.bind('event_name', function(data) {
  console.log(data.message); // would output 'this is a message'
});


dispatcher.bind('connection_closed', function(data) {
  console.log('connection is closed');
});