export function update_checkbox(id) {
    const e = document.getElementById(id);
    var is_complete = false;
    if (e.checked) {
        is_complete = e.checked;
    } else {
        is_complete = e.classList.contains('list-group-item-success');
    }
    console.log("checkbox '" + id + "' is checked: " + is_complete)
    localStorage.setItem(id, is_complete);
}
