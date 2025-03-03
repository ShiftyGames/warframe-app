import { update_checkbox, update_part_data, update_cetus_clock } from './utils.js';

//const WF_API = 'https://api.warframestat.us'


if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    console.log(5 + 6);
} else {
    // Sorry! No Web Storage support..
    console.log("Sorry! no web storage for you");
}


if (localStorage.getItem("de_id")) {
    say_hello()
} else {
    //console.log(document.getElementById('myForm'))
    //document.getElementById('myForm').addEventListener('submit',
    //    function(event) {
    //        event.preventDefault(); // Prevent form from submitting the traditional way
    //        const user_id = document.getElementById('de_id').value;
    //        localStorage.setItem('de_id', user_id);
    //        //alert('de_id stored in LocalStorage!');
    //        say_hello()
    //    }
    //);
}

update_part_data()

//const warframe = "Wisp Prime"
//const wisp_info = get_wf_info(warframe)

update_cetus_clock()
