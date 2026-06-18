import readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

 
const questions = [
    {
        id: 1,
        text: "Which keyword declares a block-scoped variable that can be reassigned?",
        answer: "let"
    },
    {
        id: 2,
        text: "Which keyword declares a constant block-scoped variable?",
        answer: "const"
    },
    {
        id: 3,
        text: "Which loop iterates over the values of an iterable object?",
        answer: "for of"
    },
    {
        id: 4,
        text: "What is the result of typeof null in JavaScript?",
        answer: "object"
    },
    {
        id: 5,
        text: "Can a var variable be re-declared in the same scope without an error?",
        answer: "yes"
    }
];

async function runQuiz() {

    console.log("===== JavaScript CLI Quiz =====");

    let score = 0;
    const missedQuestions = [];

    for (const current of questions) {
        const userAnswer = await rl.question(`\nQ${current.id}. ${current.text}\n> `);
        const answer = userAnswer.trim().toLowerCase();

        let isCorrect = false;

        switch (answer) {
            case current.answer.toLowerCase():
                isCorrect = true;
                score++;
                break;
            default:
                isCorrect = false;
        }

        console.log(
            isCorrect
                ? "Correct!"
                : `Incorrect! Correct Answer: ${current.answer}`
        );

        if (!isCorrect) {
            missedQuestions.push(current.text);
        }
    }

    console.log("\n----- Quiz Finished -----");
    console.log(`Score: ${score}/${questions.length}`);

    if (missedQuestions.length > 0) {
        console.log("\nMissed Questions:");
        for (const question of missedQuestions) {
            console.log(`- ${question}`);
        }
    } else {
        console.log("\nPerfect Score!");
    }

    // Essential cleanup to shut down the terminal session smoothly
    rl.close();
}

runQuiz();
