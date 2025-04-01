export function init_major_task_state(id) {
    let part_status = localStorage.getItem(id);
    if (part_status) {
        let is_complete = part_status == 'true';
        if (is_complete) {
            var element = document.getElementById(id);
            element.classList.add('list-group-item-success');
            let subtasks = element.querySelector('ul');
            if (subtasks) {
                subtasks.classList.toggle('d-none');
            }
        }
    }
}

export function init_task_state(id) {
    let part_status = localStorage.getItem(id);
    if (part_status) {
        let is_complete = part_status == 'true';
        if (is_complete) {
            document
                .getElementById(id)
                .classList.add('list-group-item-success');
        }
    }
}
