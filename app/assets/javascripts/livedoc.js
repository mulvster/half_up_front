const MILESTONE_DATA_ATTRIBUTE_NAME = 'data-milestone-id';

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

function renderMilestone(milestone) {
  let container = $('<article>');
  let list = $('<dl>');
  list.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);

  let nameLabel = $('<dt>');
  nameLabel.text('Name');
  let nameValue = $('<dd>');
  nameValue.text(milestone.name);
  list.append(nameLabel, nameValue);

  let startDateLabel = $('<dt>');
  startDateLabel.text('Start Date');
  let startDateValue = $('<dd>');
  startDateValue.text(milestone.start_date);
  list.append(startDateLabel, startDateValue);

  let endDateLabel = $('<dt>');
  endDateLabel.text('End Date');
  let endDateValue = $('<dd>');
  endDateValue.text(milestone.end_date);
  list.append(endDateLabel, endDateValue);

  let requirementSummaryLabel = $('<dt>');
  requirementSummaryLabel.text('Summary of Requirements');
  let requirementSummaryValue = $('<dd>');
  requirementSummaryValue.text(milestone.requirements_summary);
  list.append(requirementSummaryLabel, requirementSummaryValue);

  let button = $('<button>');
  button.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);

  container.append(list, button);
  return container;
}

// }
// debugger;
// document.addEventListener('DOMContentLoaded', function() {
$(function(){
  var liveInfo = getLiveInfo();
  var requirement = $(".requirement");
  $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer);
  $('#allMilestones').on('input', function (event) {
    console.log('all milestone parent received', event.type, event);
    // content editable events are input events which can be propagated up to parent elements
    // since we only set the contenteditable attribute on DD elements, and their DL parents have the milestone ID value, we will extract it accordingly

  });

  $('#allMilestones').on('click', function (event) {
    console.log('detected click', arguments);
    if (event.target.nodeName === 'BUTTON') {
      var milestoneId = $(event.target).attr(MILESTONE_DATA_ATTRIBUTE_NAME);
      var list = $('#allMilestones').find('dl[data-milestone-id=' + milestoneId + ']');
      var values = $.map($.makeArray(list.find('dd')), function (dd) {
        console.log(arguments);
        return $(dd).text();
      });

      var url = '/jobs/:job_id/milestones/:id(.:format)'
      console.log("This is url:", url)
      $.ajax({
        type: "PUT",
        url:'/jobs/:job_id/milestones/:id(.:format)',
        data: values
      })
      }
    ;
  });

  $('.button_to').on('ajax:success', function(event, data, status, xhr){
    $('#allMilestones').append(renderMilestone(xhr.responseJSON));
    $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer);
  });

  // debugger;
  if(liveInfo.isEmployer) {

    dispatcher.bind("replace_field", function(message) {
      $("." + message.field).text(message.text);
    });

  } else {
    //isFreelancer
    $('.milestone .freelancer-editable').attr("contenteditable", true);
    $('.milestone .freelancer-editable').on('input', handleUpdate);

  }
});
