const fs = require('fs');

function main() {

    var objectInfo = [];

    var rows = getFileContents();

    populateObjectInfo(objectInfo,rows);

    //      page:  1   2   3   4   5   6   7   8
    answerKey = [ [] ,[] ,[] ,[] ,[], [], [], [] ];
    objectTypes = [];
    var objectNumbers = new Map();

    setKeys(objectNumbers,objectInfo,answerKey,objectTypes);

    exports.answerKey = answerKey;
    exports.objectTypes = objectTypes;

}

main();

/**
 * Stores each row of excel data.
 * @param {Array} rows - row of the excel data.
 * @param {Array} objectInfo - contains each row of excel data.
 */
function populateObjectInfo(objectInfo,rows) {
    for (var i = 0; i < rows.length; i++) {
        objectInfo.push(rows[i].toString().split(','));
    }
}

/**
 * Reads data from excel sheet.
 * @return - Array containing data from excel sheet.
 */
function getFileContents() {
    var fileContents = fs.readFileSync(__dirname + 
        '/80_objects_no_AF_information.csv');

    var rows = fileContents.toString().split(new RegExp('\r?\n'));
    return rows.splice(1,rows.length - 2);
}

/**
 * Populates the answerKey and objectTypes arrays based on the excel sheet.
 * @param {Map} objectNumbers - contains the image number associated with 
 *                              each object.
 * @param {Array} objectInfo - contains each row of excel data.
 * @param {Array} answerKey - Contains the answers for each object.
 * @param {Array} objectTypes - Contains type of each object.
 */
function setKeys(objectNumbers,objectInfo,answerKey,objectTypes) {
    for (var i = 0; i < 8; i++) {
        for (j = 0; j < 10; j++) {
            var num;
            if (i == 0) {
                num = j;
                objectNumbers.set(objectInfo[num][0], '0' + String(num));
            } else {
                num = Number(String(i) + String(j));
                objectNumbers.set(objectInfo[num][0], String(num));
            }
            answerKey[i].push(objectInfo[num][2] == "Cell");
            objectTypes.push(objectInfo[num][3]);
        }
    }

    console.log();
    console.log("objectNumbers: ");
    console.log(objectNumbers);
}