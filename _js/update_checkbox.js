export function update_checkbox(id) {
    console.log("checkbox '" + id + "' is checked: " + document.getElementById(id).checked)
    localStorage.setItem(id, document.getElementById(id).checked)
}
