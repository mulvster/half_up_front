const MILESTONE_DATA_ATTRIBUTE_NAME = 'data-milestone-id';

var dispatcher = new WebSocketRails('localhost:3000/websocket', false);


// function handleUpdateTitle(event) {
//   dispatcher.trigger('update_title', { title: event.target.innerText });
// }

// function handleUpdateDetails(event) {
//   dispatcher.trigger('update_details', { details: event.target.innerText });
// }

function handleUpdate(event) {
  dispatcher.trigger('update', {
    field: $(this).data("update-field"),
    idMilestone: $(this).closest("[data-milestone-id]").data('milestone-id'),
    idRequirement:  $(this).closest(
  "[data-requirement-id]").data('requirement-id'),
    text: $(this).text()
  });
}

function handleNewMilestone(event) {
  dispatcher.trigger('updatemilestone', {
    milestoneid: event
  });
}

function deleteMilestone(event) {
  console.log('THIS IS EVENT', event)
  dispatcher.trigger('destroymilestone', {
    milestone: event
  })
}

function handleRequirement(event) {
  dispatcher.trigger('updaterequirement', {
    requirementid: event
  });
}


// The following five functions
// could use some significant refactoring.
function percentRedistributor(jobBudget, allMilestones, currentMilestone) {

  // dealing with percentage distribution:
  var newPercentageRemaining = 50 - currentMilestone.find('.payment-percentage').html();
  console.log("New remaining percentage: " + newPercentageRemaining);
  var previousTotalRemainingPercentage = 0;
  allMilestones.children('.milestone').each(function() {
    console.log(currentMilestone.find('dl').html() === $(this).find('dl').html());

    console.log("milestone percentage: " + $(this).find('.payment-percentage').html());
    if ($(this).find('dl').html() !== currentMilestone.find('dl').html()) {
      previousTotalRemainingPercentage += Number($(this).find('.payment-percentage').html());
    }
    console.log("prev total remaining: " + previousTotalRemainingPercentage);
  });
  allMilestones.children('.milestone').each(function() {
    if ($(this).find('dl').html() !== currentMilestone.find('dl').html()) {
      console.log($(this).find('.payment-percentage').html())
      var newPercentage = Number($(this).find('.payment-percentage').html()) / previousTotalRemainingPercentage * newPercentageRemaining;
      console.log("new percentage: " + newPercentage);
      $(this).find('.payment-percentage').html(newPercentage.toFixed(1));
      console.log($(this).find('.payment-percentage').html())
    }
  });
}

function budgetRedistributor(jobBudget, allMilestones) {
  // dealing with amount distribution:
  var budgetRemaining = Math.ceil(jobBudget.html() / 2);
  var newAmount;
  allMilestones.children('.milestone').each(function() {

    console.log("old amount: " + $(this).find('.milestone-amount').html());

    newAmount = Math.floor(jobBudget.html() * $(this).find('.payment-percentage').html() / 100);

    console.log("new Amount: " + newAmount);
    $(this).find('.milestone-amount').html(newAmount);
    budgetRemaining -= newAmount;
    console.log($(this).find('.milestone-amount').html());
    console.log("budgetRemaining: " + budgetRemaining);
  });
  //loop over non-calling milestones, adding $1 till budgetRemaining depleted
  rotatingMilestone = allMilestones.children('.milestone').first();
  console.log("BUDGET REMAINING BEFORE DELUGE: " + budgetRemaining);
  while (budgetRemaining > 0) {
    //console.log(allMilestones.children('.milestone').length);

    // **** the following line is hideous and doesn't work. TO BE FIXED. ****
    //console.log(rotatingMilestone.find('.milestone-amount').html());
    rotatingMilestone.find('.milestone-amount').html(Number(rotatingMilestone.find('.milestone-amount').html())+1);
    //console.log(rotatingMilestone.find('.milestone-amount').html());
    if (rotatingMilestone === allMilestones.children('.milestone').last()) {
      rotatingMilestone = allMilestones.children('.milestone').first();
    } else {
      rotatingMilestone = allMilestones.children('.milestone').next();
    }
    budgetRemaining --;
  }
}

function quickPercentRedistribution(allMilestones) {
  console.log('quick percent redistribution');

  var oldPercentTotal = 0;
  allMilestones.children('.milestone').each(function() {
      oldPercentTotal += Number($(this).find('.payment-percentage').html());
      console.log(oldPercentTotal);
    });
  var newPercentTotal = 0;
  allMilestones.children('.milestone').each(function() {
      var newPercent = Number($(this).find('.payment-percentage').html()) * 50 / oldPercentTotal;
      newPercent = Math.floor(newPercent * 10) / 10;
      newPercentTotal += newPercent;
      $(this).find('.payment-percentage').html(newPercent);
    });
  // loop over the milestones, adding 0.1% to each till they total 50%
  rotatingMilestone = allMilestones.children('.milestone').first();

  console.log("newPercentTotal: " + newPercentTotal);

  while (newPercentTotal < 50) {
    var incrementedPercent = Number(rotatingMilestone.find('.payment-percentage').html()) + 0.1;
    rotatingMilestone.find('.payment-percentage').html(incrementedPercent);
    if (rotatingMilestone === allMilestones.children('.milestone').last()) {
      rotatingMilestone = allMilestones.children('.milestone').first();
    } else {
      rotatingMilestone = allMilestones.children('.milestone').next();
    }
    newPercentTotal += 0.1;

    console.log("newPercentTotal: " + newPercentTotal);
  }
}

function handleJobBudgetChange(event) {
  console.log('handleJobBudgetChange invoked');

  quickPercentRedistribution($('#allMilestones'));

  var jobBudgetValueNode = $(this).parent().children('.job-budget');
  if (event.type === 'click') {
    var oldValue = Number(jobBudgetValueNode.html());
    console.log(oldValue);

    var deltaBudget = event.target.className === 'job-arrow up-arrow' ? oldValue * 6.2 / 100 : oldValue * -6.2 / 100;
    var newValue = oldValue + deltaBudget;
    newValue = Math.max(0, newValue);
    //round if needed:
    var zerosCount = 0;
    while (newValue / Math.pow(10, zerosCount + 2) >=1) {
      zerosCount ++;
    }
    roundedValue = Math.round(newValue / Math.pow(10, zerosCount)) * Math.pow(10, zerosCount);
    jobBudgetValueNode.html(Math.round(roundedValue));
    actualDelta = roundedValue - oldValue;
    if (actualDelta !== 0) {
      $('.huf-budget').html(Math.floor(jobBudgetValueNode.html() / 2));
      budgetRedistributor($('.job-budget'), $('#allMilestones'));
    } else {
      $('.huf-budget').html(Math.floor(jobBudgetValueNode.html() / 2));
      budgetRedistributor($('.job-budget'), $('#allMilestones'));
    }
  }
}

function handleMilestoneBudgetChange(event) {
  console.log('handleMilestoneBudgetChange invoked');

  var budgetValueNode = $(this).parent().children('.payment-percentage');

  if (event.type === 'click') {
    var oldValue = Number(budgetValueNode.html());
    console.log(oldValue);

    var deltaBudget = event.target.className === 'arrow up-arrow' ? 1.0 : -1.0;
    var newValue = oldValue + deltaBudget;
    newValue = Math.max(0, Math.min(50, newValue));
    // round if needed:
    roundedValue = deltaBudget > 0 ? Math.floor(newValue) : Math.ceil(newValue);
    budgetValueNode.html(roundedValue.toFixed(1));
    actualDelta = roundedValue - oldValue;
    if (actualDelta !== 0) {
      percentRedistributor($('.job-budget'), $('#allMilestones'), $(this).closest('.milestone'));
      budgetRedistributor($('.job-budget'), $('#allMilestones'));
    }
  } else {
      percentRedistributor($('.job-budget'), $('#allMilestones'), $(this).closest('.milestone'));
      budgetRedistributor($('.job-budget'), $('#allMilestones'));
  }
}


function renderMilestone(milestone) {
  let container = $('<article>').addClass("milestone");
  let deletebutton = $('<button>').addClass('delete-milestone-btn').text('X');
  deletebutton.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);
  deletebutton.on("click", function(event) {
    var milestone_id = milestone.id;
    var job_id = milestone.job_id;
    var url = "/jobs/" + job_id + "/milestones/" + milestone_id;
    $.ajax({
      url: url,
      method: "DELETE"
    }).done(function(data) {
      console.log("THIS IS DATA", data)
      $("dl[data-milestone-id='" + data.id + "']").parent().remove();
      deleteMilestone(data);
      })
    });

  container.append(deletebutton);


  let list = $('<dl>');
  list.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);

  let nameLabel = $('<dt>');
  nameLabel.text('Name');
  let nameValue = $('<dd>').addClass('name freelancer-editable');
  nameValue.text("");
  list.append(nameLabel, nameValue);

  let startDateLabel = $('<dt>');
  startDateLabel.text('Start Date');
  let startDateValue = $('<dd>').addClass('start-date freelancer-editable');
  startDateValue.text("");
  list.append(startDateLabel, startDateValue);

  let endDateLabel = $('<dt>');
  endDateLabel.text('End Date');
  let endDateValue = $('<dd>').addClass('end-date freelancer-editable');
  endDateValue.text("");
  list.append(endDateLabel, endDateValue);

  let requirementSummaryLabel = $('<dt>');
  requirementSummaryLabel.text('Summary of Requirements');
  let requirementSummaryValue = $('<dd>').addClass('summary freelancer-editable');
  requirementSummaryValue.text("");
  list.append(requirementSummaryLabel, requirementSummaryValue);

  let button = $('<button>').addClass('save-milestone-btn').text('Save');
  button.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);
  let requirementbutton = $('<button>').addClass('req-btn').text('+ Requirement')
  requirementbutton.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);
  requirementbutton.on("click", function(event) {
    var milestone_id = milestone.id;
    var job_id = milestone.job_id;
    var url = "/jobs/" + job_id + "/milestones/" + milestone_id + "/requirements/";
    $.ajax({
      url: url,
      method: "POST"
    }).done(function(data) {
      // console.log("THIS IS DATA", data)
      $("dl[data-milestone-id='" + data.milestone_id + "']").append(getRequirement(data));
      $('#allMilestones').find('dd').attr("contenteditable", !getLiveInfo().isEmployer);

    });
  });
  container.append(list, button, requirementbutton);
  return container;
}

function getRequirement(requirement) {

return $newRequirement = $(`
  <dl class="requirement" data-requirement-id="${requirement.id}">
    Requirement
    <dt>Name</dt>
    <dd class="req-name freelancer-editable" data-update-field="req-name"> </dd>
    <dt>Details</dt>
    <dd class="details freelancer-editable" data-update-field="details"> </dd>
  </dl>

  `)
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



  //updates milestones to db on click of SAVE button
  $('#allMilestones').on('click', '.save-milestone-btn', function (event) {
    console.log('detected click', arguments);
    var milestoneId = $(event.target).attr(MILESTONE_DATA_ATTRIBUTE_NAME);
    var list = $('#allMilestones').find('dl[data-milestone-id=' + milestoneId + ']');
    // var milestoneparams = {
    //   'name': list.find('dd[class="name"]'),
    //   'start-date': list.find('dd[class="start-date"]'),
    //   'end-date': list.find('dd[class="end-date"]'),
    //   'summary': list.find('dd[class="summary"]'),
    //   'requirements': []
    // }
    // console.log("MILESTONE PARAMS", milestoneparams);
    // console.log('milestone name dot notation', milestoneparams.name);
    // console.log('milestone name bracket notation', milestoneparams['name']);

    // $('dl.requirement"]').children().find(dl.class=)
    // var requirements = list.find('dl[class="requirement"]')
    // requirements.map(function(index, req){
    //   var newreq = (req.find('dd[class="req-name"]'))
    //   console.log('XXX', newreq)
    //   console.log("INDEX", index)
    //   console.log("REQ", req)
    // })
    // console.log("THIS IS REQ", requirements)
    // milestoneparams['requirements']['summary'] = list.find('dd[class="req-name"')

    console.log()

    var values = $.map($.makeArray(list.find('dd')), function (dd) {
      return $(dd).text();
    });
    var fields = ["name", "start_date", "end_date", "requirements_summary"]
    var data = fields.reduce(function(previous, current, index) {
      previous[current] = values[index];
      return previous;
    }, {});
    var requirements = list.children('.requirement');

    data.requirements_attributes = []
    requirements.each(function(index, value) {
      var element = $(value);
      var id = element.data('requirement-id');
      var name = $(element.children('.req-name')[0]).text();
      var details = $(element.children('.details')[0]).text();
      data.requirements_attributes.push({
        id: id,
        name: name,
        details: details
      });
    });

    var job_id = parseInt(window.location.pathname.substring(6)); // really not proud
    var url = '/jobs/' + job_id + '/milestones/' + milestoneId;
    $.ajax({
      type: "PUT",
      url: url,
      data: { milestone: data }
    });
  });

  $('.new-milestone-form').on('ajax:success', function(event, data, status, xhr){
    console.log("THIS IS XHR", xhr)
    $('#allMilestones').append(renderMilestone(xhr.responseJSON));
    $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer);
    $('.new-milestone-form').on('click', handleNewMilestone(xhr.responseJSON));
  });

  $('.new-requirement-form').on('ajax:success', function(event, data, status, xhr){
    $(this).closest('.milestone').append(getRequirement(xhr.responseJSON));
    $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer)
    $('.new-requirement-form').on('click', handleRequirement(xhr.responseJSON));
  });

  $('.delete-milestone-btn').on('ajax:success', function(event, milestone, status, xhr){
    var targetmilestone = $(this).closest('.milestone')
    $(this).closest('.milestone').remove();
    deleteMilestone(milestone);


  });

  // save whole job, fields saved to be added
  $('#save-job').on('click', function (event) {
    console.log($('.job-budget').html());
   var job_id = parseInt(window.location.pathname.substring(6));
   console.log("job_id: " + job_id);
    var url = '/jobs/' + job_id;
    var data = {budget: Number($('.job-budget').html())}
    console.log(data)
    $.ajax({
      type: "PUT",
      url: url,
      data: data,
      error: function(jqe, err_str, err) {
          console.log("oh my god there was a jobs saving error, I have no idea what to do: " + err_str);
      }
    })
  });

  // $('.delete-milestone-btn').on('click', function (event) {
  //   $(this).closest('.milestone').remove();
  // });

  // debugger;
  if(liveInfo.isEmployer) {

    dispatcher.bind("replace_field", function(message) {
      if (!message.idRequirement) {
      var element = $("dl[data-milestone-id='" + message.idMilestone + "'] ." +  message.field)
      element.text(message.text);
    } else {
      var element = $("dl[data-requirement-id='" + message.idRequirement + "'] ." + message.field)
      element.text(message.text);
    }
    });

    dispatcher.bind("new_milestone", function(message) {
      // $('#allMilestones').find("dl[data-milestone-id='" + message.milestoneid + "']")
      $('#allMilestones').append(renderMilestone(message.milestoneid));

    });

    dispatcher.bind("new_requirement", function(message) {
      $("dl[data-milestone-id='" + message.requirementid.milestone_id + "']").append(getRequirement(message.requirementid));

    });
     dispatcher.bind("bye_milestone", function(message) {
      console.log("MESSAGE", message.milestone.id)
      $("dl[data-milestone-id='" + message.milestone.id + "']").parent().remove();

    });

  } else {
    //isFreelancer
    $('.milestone .freelancer-editable #allMilestones').attr("contenteditable", true);
    // $('.milestone .freelancer-editable #allMilestones').on('input', handleUpdate);
    $('#allMilestones').on('input', '[data-update-field]', handleUpdate);

    // added sections
    $('.arrow').on('click', handleMilestoneBudgetChange);
    $('.payment-percentage').on('blur', handleMilestoneBudgetChange);
    $('.payment-percentage').on('keydown', function(event) {

      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        event.preventDefault();
        $(this).trigger('blur');
      } else {
        // digits, delete and decimal only. Hacky for now.
        if ((keycode < '48' || keycode > '57') && (keycode != '8' && keycode != '190')) {
          event.preventDefault();
        }
      }
    });

    $('.job-arrow').on('click', handleJobBudgetChange);
    $('.job-budget').on('blur', handleJobBudgetChange);
    $('.job-budget').on('keydown', function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        event.preventDefault();
        $(this).trigger('blur');
        //handleJobBudgetChange;
      }
    });
  }
});


