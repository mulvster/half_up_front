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

        $('#add').click(function() {
        $('<div><input type="text" class="field" name="dynamic[]" value="'+ '" /></div>').fadeIn('fast').appendTo('.inputs');
        });

        $('#remove').click(function() {
        $('.field:last').remove();
        });
});