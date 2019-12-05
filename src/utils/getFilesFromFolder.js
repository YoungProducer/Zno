const fs = require('fs');
const path = require('path');

export default folderName => 
    new Promise((resolve, reject) => {
        fs.readdir(folderName, 'utf-8',(err, dir) => {
            if (err) {
                reject(err);
            }
            resolve(dir);
        })
    });