$(function () {
    if ($('.new-job').length === 0) {
        return;
    }

    $('label.radio-btn input[type="radio"]').on('click', function (e) {
        console.log("label click")
        $(this).closest('section').find('label.radio-btn').removeClass('active');
        $(this).parents('label.radio-btn').addClass('active');
    });

    $('.check-btn').on("click", function () {
        var checkbox = $(this).find('input');
        if (checkbox.is(':checked')) {
            checkbox.removeProp('checked')
        }
        else {
            checkbox.prop('checked', 'checked');
        }
        console.log('checked')
        $(this).toggleClass('hovered');
    });


    var i = $('input').size() + 1;

        $('#add').click(function() {
        $('<div><input type="text" class="field" name="dynamic[]" value="' + i + '" /></div>').fadeIn('slow').appendTo('.inputs'); i++;
        });

        $('#remove').click(function() {
        if(i > 1) {
        $('.field:last').remove();
        i--;
        }
        });
        $('#reset').click(function() {
        while(i > 2) {
        $('.field:last').remove();
        i--;
        }
    });

    // here's our click function for when the forms submitted

    $('.submit').click(function(){

        var answers = [];

        $.each($('.field'), function() {

        answers.push($(this).val());

        });

        if(answers.length == 0) {

        answers = "none";

    }

    alert(answers);

    return false;

    });
});