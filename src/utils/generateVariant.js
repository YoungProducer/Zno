const fs = require('fs');

const getType = file => {
    let type = 0;
    const value = file.slice(file.indexOf('_') + 1, file.indexOf('.svg'));
    console.log(value);
    if (value.length === 1) {
        if (value == Number(value)) {
            type = 2;
        }
    }
    if (value.length > 1) {
        if (value.indexOf('_') === -1 && value.length === 4) {
            type = 1;
        } else {
            type = 2;
        }
        if (value.indexOf('_') !== -1) {
            type = 2;
        }
    }

    return type;
}

export default (writedir, files, type) =>
    new Promise((resolve, reject) => {
        const wstream = fs.createWriteStream(`${writedir}/tasks.json`);
        wstream.write('[\n');
        files.forEach((file, index) => {
            wstream.write(`{ "img": "${writedir}/${type}/${file}", "type": "${getType(file)}" }${index === files.length - 1 ? '' :','}\n`);
        });
        wstream.write(']\n');
        wstream.end();
    });