$(function(){
	if ($('.new-job').length===0){
		return;
	} 	

	$('label.radio-btn input[type="radio"]').on('click', function(e){
		// console.log("label click")
		$(this).parents('section').find('label.radio-btn').removeClass('active');
		$(this).parents('label.radio-btn').addClass('active');
	});
});



/* 
 $(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
        $(this).parents('.entry:first').remove();

        e.preventDefault();
        return false;
    });
});

*/