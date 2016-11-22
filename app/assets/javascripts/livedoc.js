var dispatcher = new WebSocketRails('localhost:3000/websocket', false);

function handleUpdateTitle(event) {
  dispatcher.trigger('update_title', { title: event.target.innerText });
}

function handleUpdateDetails(event) {
  dispatcher.trigger('update_details', { details: event.target.innerText });
}
//
// function handlePostMessage(event) {
//   dispatcher.trigger('post_message', { content: "blah" });
// }

document.addEventListener('DOMContentLoaded', function() {
  var liveInfo = getLiveInfo();
  var requirement = $(".requirement");

  if(liveInfo.isEmployer) {
    dispatcher.bind("replace_title", function(message) {
      requirement.children(".title")[0].innerText = message;
    });

    dispatcher.bind("replace_details", function(message) {
      requirement.children(".details")[0].innerText = message;
    });
  } else {
    requirement.children(".title").on("input", handleUpdateTitle);
    requirement.children(".details").on("input", handleUpdateDetails);

    requirement.children(".title").attr("contenteditable", true);
    requirement.children(".details").attr("contenteditable", true);
  }
});
