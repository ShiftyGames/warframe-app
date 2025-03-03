import fs from 'fs';

//fetch('https://api.warframestat.us/items/')
//    .then( data => data.text())
//    .then(text => fs.writeFile('item-dump.json', text, function(err) {})
//);

fs.readFile('item-dump.json', function(_, data) {
    let j = JSON.parse(data);
    var c = 1;
    var items = [];
    for (let i = 0; i < j.length; i++) {
        items.push(j[i]);
        if (i % 1000 == 0) {
            console.log("outputing to file " + c)
            fs.writeFileSync('items/item-dump-' + (c).toString().padStart(4,0) + '.json', JSON.stringify(items))
            c = c + 1;
            items = [];
        }
    }
    if (items.length > 0) {
        console.log("last file " + c)
        fs.writeFileSync('items/item-dump-' + (c).toString().padStart(4,0) + '.json', JSON.stringify(items))
    }
})
