function major_task_init() {
    let part_status = localStorage.getItem(this.id);
    if (part_status) {
        let is_complete = part_status == 'true';
        if (is_complete) {
            this.classList.add('list-group-item-success');
            let subtasks = this.querySelector('ul');
            if (subtasks) {
                subtasks.classList.toggle('d-none');
            }
        }
    }
}

function minor_task_init() {
    let node_status = localStorage.getItem(this.id);
    if (node_status) {
        let is_complete = node_status == 'true';
        if (is_complete) {
            this.classList.add('list-group-item-success');
        }
    }
}

function _handle_onclick(element, id) {
    var is_complete = false;
    if (element.hasOwnProperty('checked')) {
        is_complete = element.checked;
    } else {
        is_complete = element.classList.contains('list-group-item-success');
    }
    console.log("checkbox '" + id + "' is checked: " + is_complete);
    localStorage.setItem(id, is_complete);
}

function major_task_onclick() {
    // toggle_bs_major_task
    this.classList.toggle('list-group-item-success');
    if (this.classList.contains('list-group-item-success')) {
        let subtasks = this.querySelector('ul');
        if (subtasks) {
            subtasks.classList.add('d-none');
        }
    }
    _handle_onclick(this, this.id);
}

function minor_task_onclick() {
    event.stopPropagation();
    this.classList.toggle('list-group-item-success');
    _handle_onclick(this, this.id);
}

$(document).ready(function () {
    // init major task states
    $('label.wf-task-major').each(major_task_init);
    $('div.wf-task-major').each(major_task_init);

    // init minor task states
    $('li.wf-task-minor').each(minor_task_init);

    // connect onclick callback for major tasks
    $('label.wf-task-major').on('click', major_task_onclick);
    $('div.wf-task-major').on('click', major_task_onclick);

    // connect onclick callback for minor tasks
    $('li.wf-task-minor').on('click', minor_task_onclick);
});
