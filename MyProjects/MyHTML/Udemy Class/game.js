const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarFull = document.getElementById('progressBarFull')
const progressText= document.getElementById('progressText')
const scoreText= document.getElementById('score')
const loader = document.getElementById('loader');
const game=document.getElementById('game');

let currentQuestion = {}; 
let acceptingAnswers = false; //allows for small delay
let score = 0;
let questionCounter = 0; //what question user is on
let availableQuestions = {}; //copy of full questions set

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then(res =>{
    //console.log(res);
    return res.json()
 }).then(loadedQuestions =>{
     //console.log(loadedQuestions)
     questions = loadedQuestions.results.map(loadedQuestion =>{
         const formattedQuestion={
            question:loadedQuestion.question
         }
         const answerChoices = [...loadedQuestion.incorrect_answers];
         formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
         answerChoices.splice(
             formattedQuestion.answer -1, 
             0, 
             loadedQuestion.correct_answer);

         answerChoices.forEach((choice, index) =>{
             formattedQuestion["choice"+(index+1)] = choice;
         });
         return formattedQuestion;
     })
     //questions = loadedQuestions;
     
     startGame();
 }).catch(err=>{
     console.error(err);
 });

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3; //maximum questions before user finishes

startGame = () => {
    questionCounter=0;
    score=0;
    availableQuestions= [...questions]; //take array, spread out items and put into new array
    getNewQuestion();
    setTimeout(() => { 
        game.classList.remove("hidden");
        loader.classList.add('hidden')
     }, 1000);
    
}

getNewQuestion = () => {

    if(availableQuestions.length===0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to end page
        return window.location.assign('end.html');
    }
    questionCounter++; //increments to 1
    progressText.innerText= "Question"+questionCounter+ "/"+ MAX_QUESTIONS;
    //Update progress bar
    progressBarFull.style.width= `${((questionCounter)/MAX_QUESTIONS)*100}%`;

    const questionIndex= Math.floor(Math.random() * availableQuestions.length);
    //console.log(questionIndex)
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    
    availableQuestions.splice(questionIndex, 1); //gets rid of used question
    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        //delay
        if(!acceptingAnswers) return;
        acceptingAnswers= false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        //checks if answer is correct
        let classToApply='incorrect';
            if(selectedAnswer==currentQuestion.answer){
                classToApply = "correct";
            }
            if (classToApply ==='correct'){
                incrementScore(CORRECT_BONUS);
            }


        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            
        }, 1000);
        //console.log(classToApply);
        
    });
});

incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
}

