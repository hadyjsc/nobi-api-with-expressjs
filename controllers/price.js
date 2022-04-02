const csv = require('csv-parse')
const fs = require('fs');

class Price {
    static async upload(req, res) {
        const { file } = req
        let dir = file && file.path ? file.path : null;

        let csvData = [];
        fs.createReadStream(dir)
            .pipe(csv.parse())
            .on('data', function(csvrow) {
                console.log(csvrow);
                csvData.push(csvrow);
            })
            .on('end', function() {
                console.log(csvData);
            });


        console.log(csvData);
    }
}

module.exports = Price