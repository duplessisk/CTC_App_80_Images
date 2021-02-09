/**
 * This script creates the results page. 
 */

// total number of questions in this test
var TOTAL_QUESTIONS = 80;

/**
 * Main function that reads in JSON files, and links the data with the DOM.
 */
async function main() {

    buildScorePageHeader();

    var resultsJson = await fetch("/static/results_data.json");
    var resultsJsonText = await resultsJson.text();

    var totalCorrect = getClientScore(resultsJsonText)

    addScoreToScoreHeader(totalCorrect);

}

main();

/**
 * Adds score to results page header.
 */
function buildScorePageHeader() {
    // add content to pageHeader
    overallScore = document.createElement('div');
    overallScore.id = "overallScore";
    overallAnsweredCorrect = document.createElement('div');
    overallAnsweredCorrect.id = "overallAnsweredCorrect";
    document.body.appendChild(pageHeaderDiv);
    document.querySelector("#pageHeaderDiv").appendChild(overallScore);
    document.querySelector("#pageHeaderDiv").appendChild(overallAnsweredCorrect);

    // buffer to allow for gap between pageHeader and rest of page 
    bufferDiv = document.createElement('div');
    bufferDiv.id = "bufferDiv";
    document.body.appendChild(bufferDiv);
}

/**
 * Returns the client's score on the exam.
 * @param {String} resultsString - String containing the number of questions
 *                                 the client answered correctly.
 * @return - client's score on the exam.
 */
function getClientScore(resultsText) {

    var resultsString = filterString(resultsText);
    var jsonResultsArr = resultsString.split("}");

    totalIncorrect = setTotalNumIncorrect(jsonResultsArr[0]);
    totalCorrect = TOTAL_QUESTIONS - totalIncorrect;

    return totalCorrect;
}

/**
 * Creates string representing wrong_object_paths.JSON that excludes 
 * unnecessary tokens
 * @param {String} wrongObjectPathsText - contents from wrong_object_paths.JSON
 *                                        in String form
 * @return - String containing all wrong object paths
 */
function filterString(objectPathsText) {
    objectPathsString = "";
    for (let i in objectPathsText) {
        let t = objectPathsText[i];
        if (t != '{') {
            objectPathsString += t;
        }
    } 
    return objectPathsString;
}

/**
 * Sets the total number of incorrect responses by the user 
 * @param {String} totalNumIncorrectString - String representing data from 
 *                                           results_data.json. Contains total 
 *                                           number of incorrect responses by 
 *                                           the user. 
 */
function setTotalNumIncorrect(totalNumIncorrectString) {
    return totalNumIncorrectString.substring(23, 
        totalNumIncorrectString.length);
}

/**
 * Displays the client's score on the test. 
 * @param {Number} totalCorrect - Total number of questions the client got 
 *                                correct.  
 */
function addScoreToScoreHeader(totalCorrect) {

    document.querySelector("#overallScore").innerHTML = "Score: " + 
        Math.round(100*(totalCorrect/TOTAL_QUESTIONS)) + "%";
    document.querySelector("#overallAnsweredCorrect")
        .innerHTML = totalCorrect + " out of " + TOTAL_QUESTIONS;
}


/**
 * Adds score to results page header.
 */
function addScoreToPageHeader() {
    // add content to pageHeader
    overallScore = document.createElement('div');
    overallScore.id = "overallScore";
    overallAnsweredCorrect = document.createElement('div');
    overallAnsweredCorrect.id = "overallAnsweredCorrect";
    document.body.appendChild(pageHeaderDiv);
    document.querySelector("#pageHeaderDiv").appendChild(overallScore);
    document.querySelector("#pageHeaderDiv").appendChild(overallAnsweredCorrect);

    // buffer to allow for gap between pageHeader and rest of page 
    bufferDiv = document.createElement('div');
    bufferDiv.id = "bufferDiv";
    document.body.appendChild(bufferDiv);
}