const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculateAverage(scores) {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

function readScores() {
  return new Promise((resolve, reject) => {
    let scores = [];
    let count = 1;
    function promptScore() {
      rl.question(`Enter score for Exam ${count}: `, (score) => {
        score = parseFloat(score);
        if (isNaN(score)) {
          console.log('Invalid input. Please enter a valid number.');
          promptScore();
        } else {
          scores.push(score);
          count++;
          if (count <= 4) {
            promptScore();
          } else {
            rl.close();
            resolve(scores);
          }
        }
      });
    }
    promptScore();
  });
}

async function main() {
  let examScores = await readScores();
  let average = calculateAverage(examScores);
  console.log('The average score is: ' + average.toFixed(2));
}

main();
