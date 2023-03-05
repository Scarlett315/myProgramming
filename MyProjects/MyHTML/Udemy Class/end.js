const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = ('Your Score: '+mostRecentScore);

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) =>{
    //console.log("clicked");
    e.preventDefault();

    const score = {
        //core:Math.floor(Math.random()*100), just testing :)
        score:mostRecentScore,
        name:username.value
    }
    highScores.push(score);
    //cuts off any players lower than the top 5 in the highscores list
    highScores.sort((a,b) => {
        return b.score - a.score;
    })
    highScores.splice(5);
    console.log(highScores);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("index.html")

    
};
