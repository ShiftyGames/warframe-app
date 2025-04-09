$(document).ready(function () {
    $('.collapse').on('shown.bs.collapse', function () {
        localStorage.setItem('coll_show_' + this.id, true);
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        localStorage.setItem('coll_show_' + this.id, false);
    });

    $('.collapse').each(function () {
        if (localStorage.getItem('coll_show_' + this.id) === 'true') {
            $(this).collapse('show');
        } else if (localStorage.getItem('coll_show_' + this.id) === 'false') {
            $(this).collapse('hide');
        }
    });
});
