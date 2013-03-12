// Some general UI pack related JS

$(document).ready(function() {
    // Todo list
    $(".todo li").click(function() {
        $(".todo li").removeClass('todo-done');
        $(this).addClass("todo-done");
    });

    // Init tooltips
    $("[data-toggle=tooltip]").tooltip({ html: true });

    $('#slider').nivoSlider();

});

