console.log("ADE IT TO LIVEDOC");

var dispatcher = new WebSocketRails('localhost:3000/websocket', false);


// function handleUpdateTitle(event) {
//   dispatcher.trigger('update_title', { title: event.target.innerText });
// }

// function handleUpdateDetails(event) {
//   dispatcher.trigger('update_details', { details: event.target.innerText });
// }

function handleUpdate(event) {
  // $(this).text()
  // debugger;
  // dispatcher.trigger('u')
  dispatcher.trigger('update', {
    field: $(this).data("update-field"), //name/details/startdate
    text: $(this).text()
  });

}
// }
// debugger;
// document.addEventListener('DOMContentLoaded', function() {
$(function(){
  var liveInfo = getLiveInfo();
  var requirement = $(".requirement");
  // debugger;
  if(liveInfo.isEmployer) {
    // dispatcher.bind("replace_title", function(message) {
    //   requirement.children(".title")[0].innerText = message;
    // });

    // dispatcher.bind("replace_details", function(message) {
    //   requirement.children(".details")[0].innerText = message;
    // });

    dispatcher.bind("replace_field", function(message) {
      // requirement.children(".details")[0].innerText = message;

      $("." + message.field).text(message.text);
    });

  } else {
    //isFreelancer


    $('.milestone .freelancer-editable').attr("contenteditable", true);
    $('.milestone .freelancer-editable').on('input', handleUpdate);

  }
});
