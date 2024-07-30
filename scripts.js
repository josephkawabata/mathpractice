let correctAnswer;
let operation;

function selectOperation(op) {
    operation = op;
    document.getElementById('problem-type-choice').style.display = 'none';
    document.getElementById('choose-digits-button').style.display = 'block';
    generateMathProblem('one'); // Default to one-digit problem
}

function generateMathProblem(digits) {
    let num1 = generateNumber(digits);
    let num2 = generateNumber(digits);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.disabled = false;
    submitButton.disabled = false;

    if (operation === 'addition') {
        correctAnswer = num1 + num2;
        mathProblemElement.textContent = `${num1} + ${num2} = ?`;
    } else if (operation === 'subtraction') {
        // Ensure num1 is greater than num2 for positive result
        if (num1 < num2) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        mathProblemElement.textContent = `${num1} - ${num2} = ?`;
    }
    
    // Show the digit choice button after generating the default problem
    document.getElementById('digit-choice').style.display = 'none';
    document.getElementById('choose-digits-button').style.display = 'block';
}

function generateNumber(digits) {
    if (digits === 'one') {
        return Math.floor(Math.random() * 10);
    } else if (digits === 'two') {
        return Math.floor(Math.random() * 90) + 10; // Two-digit number between 10 and 99
    } else if (digits === 'three') {
        return Math.floor(Math.random() * 900) + 100; // Three-digit number between 100 and 999
    }
}

function checkAnswer() {
    const answerBox = document.getElementById('answer-box');
    const userAnswer = parseInt(answerBox.value);
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        resultElement.style.color = 'red';
    }
    
    // Enable the problem type selection again after checking the answer
    resetSelection();
}

function showDigitChoice() {
    document.getElementById('digit-choice').style.display = 'block';
}

function resetSelection() {
    document.getElementById('problem-type-choice').style.display = 'block';
    document.getElementById('digit-choice').style.display = 'none';
    document.getElementById('choose-digits-button').style.display = 'none';
    document.getElementById('math-problem').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('answer-box').disabled = true;
    document.getElementById('submit-button').disabled = true;
}
