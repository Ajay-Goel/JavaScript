function populate(){
    if(quiz.isEnded())
    {
        showScores();
    }
    else
    {
        //show question
        var element = document.getElementById("question");
        console.log(element);
        console.log(quiz.getQuestionIndex().text);
        element.innerHTML = quiz.getQuestionIndex().text;

        //populating choices
        console.log(quiz.getQuestionIndex().choices);
        
        var choices = quiz.getQuestionIndex().choices;
        for(var i=0; i<choices.length;i++){
            var element=document.getElementById("choice"+i);
            element.innerHTML=choices[i];
            guess("btn"+i,choices[i]); 
        }
        showProgress();
    }
};


function guess(id,guess) {
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);
        populate();
    }
};

function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " +quiz.questions.length; 
}


function showScores(){
    var gameOverHtml ="<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your Scores : "+ quiz.score + "</h2>";
    var element = document.getElementById("quiz"); 
    element.innerHTML = gameOverHtml;
}
var questions = [
    new Question("Which of these is NOT a valid keyword or reserved word in Java ?",["default","null","volatile","String"],"String"),
    new Question("Which of the following Array declaration statement is illegal ?",["int [ ] a [ ] = new int [4] [4]", "int a[ ][ ] = new int [4] [4]", "int a[ ] [ ] = new int [ ] [4]", "int [ ] a [ ] = new int [4] [ ]"],"int a[ ] [ ] = new int [ ] [4]"),
    new Question("Is 3 * 4 equivalent to 3 << 2 ?",["Yes","No","Maybe","Don't know"],"Yes"),
    new Question(" Which operator will always evaluate all the Operands?",["||","&&","?:","%"],"%")];

var quiz = new Quiz(questions);

populate();