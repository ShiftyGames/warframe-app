$(document).ready(function () {
    $('.collapse').on('shown.bs.collapse', function () {
        localStorage.setItem('coll_' + this.id, true);
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        localStorage.removeItem('coll_' + this.id);
    });

    $('.collapse').each(function () {
        if (localStorage.getItem('coll_' + this.id) === 'true') {
            $(this).collapse('show');
        } else {
            $(this).collapse('hide');
        }
    });
});
