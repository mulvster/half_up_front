var MILESTONE_DATA_ATTRIBUTE_NAME = 'data-milestone-id';

// var dispatcher = new WebSocketRails(window.location.hostname + ':' + window.location.port + '/websocket', false);

// var dispatcher = new WebSocketRails('0.0.0.0: ' + '/websocket', false);

// trying port 3000, default recommendation 3001
var dispatcher = new WebSocketRails(window.location.hostname + ':3000/websocket', false);

function handleUpdate(event) {
  dispatcher.trigger('update', {
    field: $(this).data("update-field"),
    idMilestone: $(this).closest("[data-milestone-id]").data('milestone-id'),
    idRequirement:  $(this).closest(
  "[data-requirement-id]").data('requirement-id'),
    text: $(this).text()
  });
}

function handleJobUpdate(event) {
  dispatcher.trigger('updatejob', {
    field: $(this).data("job-update-field"),
    //idJob: $(this).closest("[data-job-id]").data('job-id'),
    text: $(this).text()
  });
}

function handleNewMilestone(event) {
  dispatcher.trigger('updatemilestone', {
    milestoneid: event
  });
}

function deleteMilestone(event) {
  dispatcher.trigger('destroymilestone', {
    milestone: event
  })
}

function handleRequirement(event) {
  console.log("made it to handle requirement")
  dispatcher.trigger('updaterequirement', {
    requirementid: event
  });
}


// The following five functions
// could use some significant refactoring.
function percentRedistributor(jobBudget, allMilestones, currentMilestone) {

  // dealing with percentage distribution:
  var newPercentageRemaining = 50 - currentMilestone.find('.payment-percentage').html();
  var previousTotalRemainingPercentage = 0;
  allMilestones.children('.milestone').each(function() {
    if ($(this).find('dl').html() !== currentMilestone.find('dl').html()) {
      previousTotalRemainingPercentage += Number($(this).find('.payment-percentage').html());
    }
  });
  allMilestones.children('.milestone').each(function() {
    if ($(this).find('dl').html() !== currentMilestone.find('dl').html()) {
      // if/else added 2016.11.29
      if (previousTotalRemainingPercentage === 0) {
        var newPercentage = 0;
      } else {
        var newPercentage = Number($(this).find('.payment-percentage').html()) / previousTotalRemainingPercentage * newPercentageRemaining;
      }

      $(this).find('.payment-percentage').html(newPercentage.toFixed(1));
    }
  });
}

function budgetRedistributor(jobBudget, allMilestones) {
  // dealing with amount distribution:
  var budgetRemaining = Math.ceil(jobBudget.html() / 2);
  var newAmount;
  allMilestones.children('.milestone').each(function() {

    newAmount = Math.floor(jobBudget.html() * $(this).find('.payment-percentage').html() / 100);

    $(this).find('.milestone-amount').html(newAmount);
    budgetRemaining -= newAmount;
  });
  //loop over non-calling milestones, adding $1 till budgetRemaining depleted
  rotatingMilestone = allMilestones.children('.milestone').first();
  while (budgetRemaining > 0) {
    rotatingMilestone.find('.milestone-amount').html(Number(rotatingMilestone.find('.milestone-amount').html())+1);
    if (rotatingMilestone === allMilestones.children('.milestone').last()) {
      rotatingMilestone = allMilestones.children('.milestone').first();
    } else {
      rotatingMilestone = allMilestones.children('.milestone').next();
    }
    budgetRemaining --;
  }
}

function quickPercentRedistribution(allMilestones) {
  var oldPercentTotal = 0;
  allMilestones.children('.milestone').each(function() {
      oldPercentTotal += Number($(this).find('.payment-percentage').html());
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

  while (newPercentTotal < 50) {
    var incrementedPercent = (Number(rotatingMilestone.find('.payment-percentage').html()) + 0.1).toFixed(1);
    rotatingMilestone.find('.payment-percentage').html(incrementedPercent);
    if (rotatingMilestone === allMilestones.children('.milestone').last()) {
      rotatingMilestone = allMilestones.children('.milestone').first();
    } else {
      rotatingMilestone = allMilestones.children('.milestone').next();
    }

    newPercentTotal += 0.1;

  }
}

function handleJobBudgetChange(event) {

  quickPercentRedistribution($('#allMilestones'));

  var jobBudgetValueNode = $(this).parent().next().find('.job-budget');
  console.log("jobBudgetValueNode: " + jobBudgetValueNode);
  if (event.type === 'click') {
    var oldValue = Number(jobBudgetValueNode.html());
    if (oldValue === 0 && event.target.className === 'fa fa-arrow-up') {
      var deltaBudget = 100;
    } else {
      var deltaBudget = event.target.className === 'fa fa-arrow-up' ? oldValue * 6.2 / 100 : oldValue * -6.2 / 100;
    }
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
    $('.huf-budget').html(Math.floor(jobBudgetValueNode.html() / 2));
    budgetRedistributor($('.job-budget'), $('#allMilestones'));
  }
  if (event.type === 'blur') {

    $('.huf-budget').html(Math.floor(jobBudgetValueNode.html() / 2));
    budgetRedistributor($('.job-budget'), $('#allMilestones'));
  }
}

function handleMilestoneBudgetChange(event) {
  var budgetValueNode = $(this).parent().children('.payment-percentage');

  if (event.type === 'click') {
    var oldValue = Number(budgetValueNode.html());

    var deltaBudget = event.target.className === 'fa fa-arrow-up arrow up-arrow' ? 1.0 : -1.0;
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
  var container = $('<article>').addClass("milestone");
  var deletebutton = $('<button>').addClass('delete-milestone-btn').text('X').attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);

  deletebutton.on("click", function(event) {
    var milestone_id = milestone.id;
    var job_id = milestone.job_id;
    var url = "/jobs/" + job_id + "/milestones/" + milestone_id;
    $.ajax({
      url: url,
      method: "DELETE"
    }).done(function(data) {
      $("dl[data-milestone-id='" + data.id + "']").parent().remove();
      deleteMilestone(data);
      })
    });

  container.append(deletebutton);

  var nameLabel = $('<dt>').text('Name');
  var nameValue = $('<dd>').addClass('name freelancer-editable').text("");
  nameValue.attr("data-update-field", "name")


  var budgetLabel = $('<dt>').text('Budget');

  var paymentPercentage = $('<dd>').addClass('payment-percentage freelancer-editable')
  .attr('data-update-field', 'payment-percentage');
  paymentPercentage.text("0");

  var milestoneAmount = $('<dd>').addClass('milestone-amount')
  .attr('data-update-field', 'milestone-amount');
  milestoneAmount.text("");

  var budgetValue = $('<span class="budget-container">')
    .append($('<span>Percent (%) </span>'))
    .append($('<i class="fa fa-arrow-up arrow up-arrow"></i>'))
    .append($('<i class="fa fa-arrow-down arrow down-arrow"></i>'))
    .append(paymentPercentage)
    .append($('<span>Amount ($)</span>'))
    .append(milestoneAmount)
    .append($('</span>'));

  budgetValue.on('click', '.arrow', handleMilestoneBudgetChange);
  budgetValue.on('click', '.arrow', function(event) {
      $('#allMilestones').children('.milestone').each(function() {
        $(this).find('.payment-percentage').trigger('input');
        $(this).find('.milestone-amount').trigger('input');
      });
    });
  budgetValue.on('blur', '.payment-percentage', handleMilestoneBudgetChange);
  budgetValue.on('blur', '.payment-percentage', function(event) {
      $('#allMilestones').children('.milestone').each(function() {
        $(this).find('.milestone-amount').trigger('input');
      });
    });
  budgetValue.on('keydown', '.payment-percentage', function(event) {
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

  var startDateLabel = $('<dt>').text('Start Date');
  var startDateValue = $('<dd>').addClass('start-date freelancer-editable').text("");
  startDateValue.attr("data-update-field", "start-date")

  var endDateLabel = $('<dt>').text('End Date');
  var endDateValue = $('<dd>').addClass('end-date freelancer-editable').text("");
  endDateValue.attr("data-update-field", "end-date")
  var requirementSummaryLabel = $('<dt>').text('Summary of Requirements');
  var requirementSummaryValue = $('<dd>').addClass('summary freelancer-editable').text("");

  var list = $('<dl>').attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id)
    .append(nameLabel, nameValue)
    .append(budgetLabel, budgetValue)
    .append(startDateLabel, startDateValue)
    .append(endDateLabel, endDateValue)
    .append(requirementSummaryLabel, requirementSummaryValue);

  var button = $('<button>').addClass('save-milestone-btn').text('Save').attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);
  var requirementbutton = $('<button>').addClass('req-btn').text('+ Requirement')
  requirementbutton.attr("form_class", "new-requirement-form")
  // var requirementbutton = $('<form>').addClass('new-requirement-form');
  // requirementbutton.append($('<input>')).addClass('req-btn');


  requirementbutton.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);
  requirementbutton.on("click", function(event) {
    var milestone_id = milestone.id;
    var job_id = milestone.job_id;
    var url = "/jobs/" + job_id + "/milestones/" + milestone_id + "/requirements/";
    $.ajax({
      url: url,
      method: "POST"
    }).done(function(data) {
      $("dl[data-milestone-id='" + data.milestone_id + "']").append(getRequirement(data));
      $('#allMilestones').find('dd').attr("contenteditable", !getLiveInfo().isEmployer);
      handleRequirement(data);
      console.log("ajax request complete")
    });
  });
  var savebutton = $('<button>').addClass('save-milestone-btn').text('Save');
  savebutton.attr(MILESTONE_DATA_ATTRIBUTE_NAME, milestone.id);

list.append(savebutton, requirementbutton)
  container.append(list);
  return container;
}

function getRequirement(requirement) {
    var newReq = '<dl class="requirement" data-requirement-id="' + requirement.id + '">Requirement<dt>Name</dt><dd class="req-name freelancer-editable" data-update-field="req-name"> </dd><dt>Details</dt><dd class="details freelancer-editable" data-update-field="details"></dd></dl>';
    return $(newReq);
}

// }
// debugger;
// document.addEventListener('DOMContentLoaded', function() {
$(function() {
    if(typeof getLiveInfo === 'undefined') {
        return;
    }
  var liveInfo = getLiveInfo();
  var requirement = $(".requirement");
  $('.job-budget').attr("contenteditable", !liveInfo.isEmployer);
  $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer);

  //updates milestones to db on click of SAVE button
  $('#allMilestones').on('click', '.save-milestone-btn', function (event) {
    var milestoneId = $(event.target).attr(MILESTONE_DATA_ATTRIBUTE_NAME);
    var list = $('#allMilestones').find('dl[data-milestone-id=' + milestoneId + ']');

    var values = $.map($.makeArray(list.find('dd')), function (dd) {
      return $(dd).text();
    });
    var fields = ["name", "payment_percentage", "payment_amount", "start_date", "end_date", "requirements_summary"]
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
    $('#allMilestones').append(renderMilestone(xhr.responseJSON));
    $('#allMilestones').find('dd').attr("contenteditable", !liveInfo.isEmployer);
    $('.new-milestone-form').on('click', handleNewMilestone(xhr.responseJSON));
  });


  $('#allMilestones').on('blur', '.payment-percentage', handleUpdate);


  $('.new-requirement-form').on('ajax:success', function(event, data, status, xhr){
    console.log("made it to ajax success", data)
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
    var job_id = parseInt(window.location.pathname.substring(6));
    var url_j = '/jobs/' + job_id;
    var data_j = {
      budget: Number($('.job-budget').html())
    }
    $.ajax({
      type: "PUT",
      url: url_j,
      data: {jobs: data_j}
    });
    $('#allMilestones').children('.milestone').each(function() {
      var milestoneId = $(this).find('.save-milestone-btn').attr(MILESTONE_DATA_ATTRIBUTE_NAME);
      var list = $('#allMilestones').find('dl[data-milestone-id=' + milestoneId + ']');

      var values = $.map($.makeArray(list.find('dd')), function (dd) {
        return $(dd).text();
      });
      var fields = ["name", "payment_percentage", "payment_amount", "start_date", "end_date", "requirements_summary"]
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
  });

  if(liveInfo.isEmployer) {

    dispatcher.bind("replace_field", function(message) {
      if (!message.idRequirement) {
        var element = $("dl[data-milestone-id='" + message.idMilestone + "'] ." +  message.field).text(message.text);
      } else {
        var element = $("dl[data-requirement-id='" + message.idRequirement + "'] ." + message.field).text(message.text);
      }
    });

    dispatcher.bind("replace_job_field", function(message) {
      $(".job-budget").text(message.text);
      $(".huf-budget").text(Math.floor(message.text / 2));
    });

    dispatcher.bind("new_milestone", function(message) {
      $('#allMilestones').append(renderMilestone(message.milestoneid));
    });

    dispatcher.bind("new_requirement", function(message) {
      $("dl[data-milestone-id='" + message.requirementid.milestone_id + "']").append(getRequirement(message.requirementid));
    });
     dispatcher.bind("bye_milestone", function(message) {
      $("dl[data-milestone-id='" + message.milestone.id + "']").parent().remove();
    });

  } else {
    //isFreelancer
    $('.milestone .freelancer-editable #allMilestones').attr("contenteditable", true);
    $('#allMilestones').on('input', '[data-update-field]', handleUpdate);

    $('.arrow').on('click', handleMilestoneBudgetChange);

    $('.arrow').on('click', function(event) {
      $('#allMilestones').children('.milestone').each(function() {
        $(this).find('.payment-percentage').trigger('input');
        $(this).find('.milestone-amount').trigger('input');
      });
    });

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

    // job budget changing functions

    $('.job-budget').attr("contenteditable", true);

    $('.job-budget').on('input', handleJobUpdate);

    // added 2016.11.29
    $('.job-budget').on('input', function(event) {
      $('#allMilestones').children('.milestone').each(function() {
        $(this).find('.milestone-amount').trigger('input');
      });
      var huf = Math.floor($(this).html() / 2);
      //console.log("HUF: " + huf);
      //console.log($(this).parent().parent().parent().next().find('.huf-budget').html());
      $(this).parent().parent().parent().next().find('.huf-budget').html(huf);
    });

    $('.job-arrow').on('click', handleJobBudgetChange);
    $('.job-arrow').on('click', function(event) {
      $(this).parent().next().find('.job-budget').trigger('input');
      $(this).parent().next().find('.milestone-amount').trigger('input');
    });

    $('.job-budget').on('input', handleJobBudgetChange);
    $('.job-budget').on('keydown', function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        event.preventDefault();
        $(this).trigger('blur');
      }
    });
  }
});


