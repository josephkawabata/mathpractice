let correctAnswer;
let operation;
let currentDigits = 'one'; // Default to one digit
let algebraType; // Store the current algebra type
let arithmeticType; // Store the current arithmetic type

function selectOperation(op) {
    operation = op;
    document.getElementById('problem-type-choice').style.display = 'none';
    document.getElementById('algebra-text').style.display = 'none';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';

    if (operation === 'algebra') {
        document.getElementById('algebra-choice').style.display = 'flex';
    } else if (operation === 'arithmetic') {
        document.getElementById('arithmetic-choice').style.display = 'flex';
    }
}

function chooseArithmeticType(type) {
    arithmeticType = type;
    document.getElementById('arithmetic-choice').style.display = 'none';
    generateMathProblem(currentDigits);
}

function generateMathProblem(digits) {
    currentDigits = digits;
    let num1 = generateNumber(digits);
    let num2 = generateNumber(digits);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.style.display = 'block';
    submitButton.style.display = 'block';
    answerBox.disabled = false;
    submitButton.disabled = false;
    answerBox.focus(); // Automatically focus on the input box

    if (arithmeticType === 'addition') {
        correctAnswer = num1 + num2;
        mathProblemElement.textContent = `${num1} + ${num2} = ?`;
    } else if (arithmeticType === 'subtraction') {
        // Ensure num1 is greater than num2 for positive result
        if (num1 < num2) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        mathProblemElement.textContent = `${num1} - ${num2} = ?`;
    }

    // Show the increase/decrease digits button for arithmetic problems
    document.getElementById('choose-digits-button').style.display = 'block';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';
    
    // Hide the digit choice buttons and header
    document.getElementById('digit-choice').style.display = 'none';
}

function generateAlgebraProblem(type) {
    algebraType = type; // Set the current algebra type
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.style.display = 'block';
    submitButton.style.display = 'block';
    answerBox.disabled = false;
    submitButton.disabled = false;
    answerBox.focus(); // Automatically focus on the input box
    
    document.getElementById('algebra-text').style.display = 'block';
    document.getElementById('algebra-choice').style.display = 'none'; // Hide algebra choices

    if (!type || type === 'addition/subtraction') {
        type = Math.random() < 0.5 ? 'addition' : 'subtraction';
    } else if (type === 'multiplication/division') {
        type = Math.random() < 0.5 ? 'multiplication' : 'division';
    }

    if (type === 'addition') {
        correctAnswer = a + b;
        mathProblemElement.textContent = `${a} + ${b} = x`;
    } else if (type === 'subtraction') {
        correctAnswer = a - b;
        mathProblemElement.textContent = `${a} - ${b} = x`;
    } else if (type === 'multiplication') {
        correctAnswer = a * b;
        mathProblemElement.textContent = `${a} * ${b} = x`;
    } else if (type === 'division') {
        // Ensure a is divisible by b and no division by zero
        if (b === 0) b = 1;
        correctAnswer = a / b;
        mathProblemElement.textContent = `${a} / ${b} = x`;
    }
    
    // Hide the increase/decrease digits button for algebra problems
    document.getElementById('choose-digits-button').style.display = 'none';
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'none';
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
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        resultElement.style.color = 'red';
    }
    
    // Disable the input and submit button to prevent further input
    answerBox.disabled = true;
    document.getElementById('submit-button').disabled = true;
    
    // Show the new problem and another one button to allow the user to reset the form
    document.getElementById('new-problem-button').style.display = 'block';
    document.getElementById('another-one-button').style.display = 'block';
}

function showDigitChoice() {
    document.getElementById('digit-choice').style.display = 'block';
    document.getElementById('digit-choice-header').style.display = 'block';
}

function generateAnotherOne() {
    if (operation === 'algebra') {
        generateAlgebraProblem(algebraType); // Use the stored algebra type to generate a new problem
    } else if (operation === 'arithmetic') {
        generateMathProblem(currentDigits); // Use the stored arithmetic type to generate a new problem
    }
}

function resetSelection() {
    document.getElementById('problem-type-choice').style.display = 'block';
    document.getElementById('digit-choice').style.display = 'none';
    document.getElementById('arithmetic-choice').style.display = 'none';
    document.getElementById('algebra-choice').style.display = 'none';
    document.getElementById('choose-digits-button').style.display = 'none';
    document.getElementById('new-problem-button').style.display = 'none';
    document.getElementById('another-one-button').style.display = 'none';
    document.getElementById('algebra-text').style.display = 'none';
    document.getElementById('math-problem').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('answer-box').style.display = 'none';
    document.getElementById('submit-button').style.display = 'none';
    document.getElementById('answer-box').disabled = true;
    document.getElementById('submit-button').disabled = true;
}
