var activeEl = 0;

$(function () {
    var items = $('.btn-nav');
    $(items[activeEl]).addClass('active');
    $(".btn-nav").click(function () {
        $(items[activeEl]).removeClass('active');
        $(this).addClass('active');
        activeEl = $(".btn-nav").index(this);

    });

    // $('#user-full-name').on('blur', function (e) {
    //     var name = $(this).text();
    // });
    //
    // $('#user-save').on('click', function (event) {
    //     event.preventDefault();
    //
    //     var id = $(this).data('user-id');
    //     var name = $('#user-full-name').text();
    //     $.ajax({
    //         url: "/users/" + id,
    //         method: "PUT",
    //         data: {first_name: name,
    //             last_name: "last Nme"
    //         }
    //     }).success(function (data) {
    //         console.log(data);
    //     });
    // });
    //

    if (document.godHelpMe_allowed_to_edit) {
        $('.best_in_place').best_in_place()
        // could also do a bunch of jQuery modifying whatever the whatever
    }
});