//variables
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let submitted = Boolean(false);
let shownAnswer = Boolean(false);

//question dictionary/object
var allquestions = new Object();
var allquestions = {
    "a": "1",
    "b": "2",
    "c": "3"
  };

function getNewQuestion(dict){
    //gets a random key/question from the dictionary
    dlength = Object.keys(dict).length;
    qnumber = Math.floor(Math.random() * dlength);

    return [Object.keys(dict)[qnumber], qnumber];
}


function checkAnswer(){
    const inputWord = document.getElementById("word").value;
    if (inputWord == Object.values(allquestions)[questionIndex]){
        answer.innerText = ("Congratulations! The answer is correct!");
        submitted = true;
    }
    else{
        answer.innerText = ("The answer wasn't' correct. Try again or click the show answer button.");
        submitted = true;
    }
    
};

//next button
function next(){
    //console.log(submitted);
    if (submitted == true || shownAnswer == true){
        newSet = getNewQuestion(allquestions); //new question
        questionIndex = newSet[1];
        newQuestion = newSet[0];
        question.innerText = newQuestion;
        
        //clearing textboxes
        answer.innerText = ""; 
        document.getElementById('word').value = "";
        submitted = false;
    }
    else{
        answer.innerText = ("What are you doing? You haven't even put in an answer yet! :(")
    }
}

function showAnswer(){
    answer.innerText = ("The correct answer is: "+Object.values(allquestions)[qnumber]);
    shownAnswer = true;
}

//Start program
newSet = getNewQuestion(allquestions);
questionIndex = newSet[1];
newQuestion = newSet[0];

question.innerText = newQuestion;