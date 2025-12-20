// Variables to store the last generated question
let lastArithmeticQuestion = '';
let lastBasicAlgebraQuestion = '';
let lastFactorQuadraticsOneRootEasyQuestion = '';
let lastFactorQuadraticsOneRootMediumQuestion = '';
let lastFactorQuadratics2RootsQuestion = '';
let lastCompleteTheSquareQuestion = '';
let lastUnitCircleQuizQuestion = '';
let lastDoubleAngleIdentitiesEasyQuestion = '';
let lastDoubleAngleIdentitiesMediumQuestion = '';
let lastDegreesRadiansQuestion = '';

// Initialize the flag to track if an answer has been attempted
window.hasAttemptedAnswer = false;

// Add the global event listener for Cmd+Enter or Ctrl+Enter
document.addEventListener('keydown', function (event) {
   // Allow going to the next question only if an answer has been attempted
   if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && window.hasAttemptedAnswer) {
       // Click the visible "Next Question" button, if any
       document.querySelector('.next-question-button:visible')?.click();
   }
});

// Initialize the home screen when the page loads
window.onload = function() {
    console.log('Page loaded');
    document.getElementById('home-screen').style.display = 'block';
};

function getRandomDigit() {
    return Math.floor(Math.random() * 9) + 1;
}

function getRandomDigitMax3() {
    return Math.floor(Math.random() * 3) + 1;
}

function getRandomDigitMax5PosorNeg() {
    const digit = Math.floor(Math.random() * 5) + 1; // Get a random digit between 1 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function getRandomDigitPosorNeg() {
    const digit = Math.floor(Math.random() * 9) + 1; // Get a random digit between 1 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function getRandomDigitPosOrNeg2To9() {
    const digit = Math.floor(Math.random() * 8) + 2; // Generate a random integer between 2 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function homeToAlgebra() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}

function homeToArithmetic() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
}

function homeToTrigonometry() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
}

function startArithmetic() {
    const additionSelected = document.getElementById('arithmetic-addition-checkbox').checked;
    const subtractionSelected = document.getElementById('arithmetic-subtraction-checkbox').checked;

    if (!additionSelected && !subtractionSelected) {
        alert('Please select at least one attribute!');
        return;
    }

    window.selectedAttributes = {
        addition: additionSelected,
        subtraction: subtractionSelected,
    };

    document.getElementById('arithmetic-select-screen').style.display = 'none';
    document.getElementById('arithmetic-screen').style.display = 'block';
    document.getElementById('explanation-box').textContent = 'Welcome to kindergarten';
    document.getElementById('arithmetic-answer').focus(); // Automatically focus the input box
    document.getElementById('arithmetic-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkArithmeticAnswer();
        }
    };

    // Add this specific event listener for Cmd+Enter or Ctrl+Enter for arithmetic questions
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && window.hasAttemptedAnswer) {
            // Only trigger the next question button if the answer has been attempted
            document.getElementById('arithmetic-next-question').click();
        }
    });

    generateArithmeticQuestion();
}

function generateArithmeticQuestion() {
    window.hasAttemptedAnswer = false;
    let digit1, digit2, questionText;
    
    do {
        digit1 = getRandomDigit();
        digit2 = getRandomDigit();

        if (window.selectedAttributes.addition && window.selectedAttributes.subtraction) {
            const isAddition = Math.random() < 0.5;
            if (isAddition) {
                window.currentAnswer = digit1 + digit2;
                questionText = `What is ${digit1} + ${digit2}?`;
            } else {
                if (digit1 < digit2) {
                    window.currentAnswer = digit2 - digit1;
                    questionText = `What is ${digit2} - ${digit1}?`;
                } else {
                    window.currentAnswer = digit1 - digit2;
                    questionText = `What is ${digit1} - ${digit2}?`;
                }
            }
        } else if (window.selectedAttributes.addition) {
            window.currentAnswer = digit1 + digit2;
            questionText = `What is ${digit1} + ${digit2}?`;
        } else if (window.selectedAttributes.subtraction) {
            if (digit1 < digit2) {
                window.currentAnswer = digit2 - digit1;
                questionText = `What is ${digit2} - ${digit1}?`;
            } else {
                window.currentAnswer = digit1 - digit2;
                questionText = `What is ${digit1} - ${digit2}?`;
            }
        }
    } while (questionText === lastArithmeticQuestion);
    
    lastArithmeticQuestion = questionText;

    document.getElementById('arithmetic-question').textContent = questionText;
    document.getElementById('arithmetic-result').textContent = '';
    document.getElementById('arithmetic-answer').value = '';
    document.getElementById('arithmetic-next-question').style.display = 'none';
    document.getElementById('arithmetic-answer').focus(); // Automatically focus the input box
}

function checkArithmeticAnswer() {
    const userAnswer = parseInt(document.getElementById('arithmetic-answer').value, 10);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('arithmetic-result').textContent = resultText;
    document.getElementById('arithmetic-next-question').style.display = 'inline';
    document.getElementById('arithmetic-answer').blur();
    window.hasAttemptedAnswer = true; // Set flag to true after checking the answer
}

function startBasicAlgebra() {
    window.selectedAttributes = {
        addition: true,
        subtraction: true,
    };

    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('basic-algebra-screen').style.display = 'block';
    document.getElementById('explanation-box').textContent = 'Enter the value of x that solves the equation.';
    document.getElementById('basic-algebra-answer').focus();
    document.getElementById('basic-algebra-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkBasicAlgebraAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('basic-algebra-next-question').click();
        }
    });
    generateBasicAlgebraQuestion();
}

function generateBasicAlgebraQuestion() {
    let digit1, digit2, questionText;
    let randomOperator, xIsFirst;
    
    do {
        digit1 = getRandomDigit();
        digit2 = getRandomDigit();
        randomOperator = Math.random() < 0.5 ? '+' : '-';
        xIsFirst = Math.random() < 0.5;

        if (xIsFirst) {
            if (randomOperator === '+') {
                window.currentAnswer = digit2 - digit1;
                questionText = `x + ${digit1} = ${digit2}`;
            } else {
                window.currentAnswer = digit2 + digit1;
                questionText = `x - ${digit1} = ${digit2}`;
            }
        } else {
            if (randomOperator === '+') {
                window.currentAnswer = digit2 - digit1;
                questionText = `${digit1} + x = ${digit2}`;
            } else {
                window.currentAnswer = digit1 - digit2;
                questionText = `${digit1} - x = ${digit2}`;
            }
        }
    } while (questionText === lastBasicAlgebraQuestion);
    
    lastBasicAlgebraQuestion = questionText;

    document.getElementById('basic-algebra-question').textContent = questionText;
    document.getElementById('basic-algebra-result').textContent = '';
    document.getElementById('basic-algebra-answer').value = '';
    document.getElementById('basic-algebra-next-question').style.display = 'none';
    document.getElementById('basic-algebra-answer').focus();
}

function checkBasicAlgebraAnswer() {
    const userAnswer = parseInt(document.getElementById('basic-algebra-answer').value, 10);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('basic-algebra-result').textContent = resultText;
    document.getElementById('basic-algebra-next-question').style.display = 'inline';
    document.getElementById('basic-algebra-answer').blur();
}

function startFactorQuadraticsOneRootEasy() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('FactorQuadraticsOneRootMedium-screen').style.display = 'none';
    document.getElementById('FactorQuadraticsOneRootEasy-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = 'Enter the value of x that solves the equation. <br> <br> The quadratic formula is not needed here; just factor.';
    document.getElementById('difficulty-button').style.display = 'flex';
    document.getElementById('FactorQuadraticsOneRootEasy-answer').focus();
    document.getElementById('FactorQuadraticsOneRootEasy-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkFactorQuadraticsOneRootEasyAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('FactorQuadraticsOneRootEasy-next-question').click();
        }
    });
    selectDifficulty('easy');
    generateFactorQuadraticsOneRootEasyQuestion();
}

function generateFactorQuadraticsOneRootEasyQuestion() {
    let a = 1, b, c, questionText;
    
    do {
        b = getRandomDigitPosorNeg() * 2 * a;
        c = Math.pow(b / 2 , 2)/a;
        
        window.currentAnswer = -(b / (2 * a));
        
        const aText = a === 1 ? '' : a;

        if (b < 0) {
            questionText = `${aText}x<sup>2</sup> - ${-b}x + ${c} = 0`;
        } else {
            questionText = `${aText}x<sup>2</sup> + ${b}x + ${c} = 0`;
        }
    } while (questionText === lastFactorQuadraticsOneRootEasyQuestion);

    lastFactorQuadraticsOneRootEasyQuestion = questionText;

    document.getElementById('FactorQuadraticsOneRootEasy-question').innerHTML = questionText;
    document.getElementById('FactorQuadraticsOneRootEasy-result').textContent = '';
    document.getElementById('FactorQuadraticsOneRootEasy-answer').value = '';
    document.getElementById('FactorQuadraticsOneRootEasy-next-question').style.display = 'none';
    document.getElementById('FactorQuadraticsOneRootEasy-answer').focus();
}

function checkFactorQuadraticsOneRootEasyAnswer() {
    const userAnswer = parseFloat(document.getElementById('FactorQuadraticsOneRootEasy-answer').value);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('FactorQuadraticsOneRootEasy-result').textContent = resultText;
    document.getElementById('FactorQuadraticsOneRootEasy-next-question').style.display = 'inline';
    document.getElementById('FactorQuadraticsOneRootEasy-answer').blur();
}

function startFactorQuadraticsOneRootMedium() {
    document.getElementById('FactorQuadraticsOneRootEasy-screen').style.display = 'none';
    document.getElementById('FactorQuadraticsOneRootMedium-screen').style.display = 'block';
    document.getElementById('FactorQuadraticsOneRootMedium-answer').focus();
    document.getElementById('FactorQuadraticsOneRootMedium-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkFactorQuadraticsOneRootMediumAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('FactorQuadraticsOneRootMedium-next-question').click();
        }
    });
    generateFactorQuadraticsOneRootMediumQuestion();
}

function generateFactorQuadraticsOneRootMediumQuestion() {
    let a, b, c, questionText;
    
    do {
        a = getRandomDigitPosOrNeg2To9();
        b = getRandomDigitPosorNeg() * 2 * a;
        c = Math.pow(b / 2 , 2)/a;
        
        window.currentAnswer = -(b / (2 * a));
        
        const aText = a === 1 ? '' : a;

        if (b < 0) {
            questionText = `${aText}x<sup>2</sup> - ${-b}x + ${c} = 0`;
        } else {
            questionText = `${aText}x<sup>2</sup> + ${b}x + ${c} = 0`;
        }
    } while (questionText === lastFactorQuadraticsOneRootMediumQuestion);

    lastFactorQuadraticsOneRootMediumQuestion = questionText;

    document.getElementById('FactorQuadraticsOneRootMedium-question').innerHTML = questionText;
    document.getElementById('FactorQuadraticsOneRootMedium-result').textContent = '';
    document.getElementById('FactorQuadraticsOneRootMedium-answer').value = '';
    document.getElementById('FactorQuadraticsOneRootMedium-next-question').style.display = 'none';
    document.getElementById('FactorQuadraticsOneRootMedium-answer').focus();
}

function checkFactorQuadraticsOneRootMediumAnswer() {
    const userAnswer = parseFloat(document.getElementById('FactorQuadraticsOneRootMedium-answer').value);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('FactorQuadraticsOneRootMedium-result').textContent = resultText;
    document.getElementById('FactorQuadraticsOneRootMedium-next-question').style.display = 'inline';
    document.getElementById('FactorQuadraticsOneRootMedium-answer').blur();
}

function startFactorQuadratics2Roots() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('FactorQuadratics2Roots-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = 'Enter the 2 values of x that solve the equation, separated by a comma. <br> <br> The quadratic formula is not needed here; just factor.';
    document.getElementById('FactorQuadratics2Roots-answer').focus();
    document.getElementById('FactorQuadratics2Roots-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkFactorQuadratics2RootsAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('FactorQuadratics2Roots-next-question').click();
        }
    });
    generateFactorQuadratics2RootsQuestion();
}

function generateFactorQuadratics2RootsQuestion() {
    let x1, x2, questionText;
    
    do {
        x1 = getRandomDigitPosorNeg(); 
        x2 = getRandomDigitPosorNeg();
        if (x2 === x1) x2 = -x1;

        window.currentAnswer = [-(x1), -(x2)];

        const a = 1;
        const aText = a === 1 ? '' : a;

        const x1x2Sum = x1 + x2;
        const x1x2Product = x1 * x2;

        questionText = `${aText}x<sup>2</sup>`;
        if (x1x2Sum !== 0) {
            questionText += ` ${x1x2Sum > 0 ? '+ ' : '- '}${Math.abs(x1x2Sum)}x`;
        }
        questionText += ` ${x1x2Product > 0 ? '+ ' : '- '}${Math.abs(x1x2Product)} = 0`;
    } while (questionText === lastFactorQuadratics2RootsQuestion);

    lastFactorQuadratics2RootsQuestion = questionText;

    document.getElementById('FactorQuadratics2Roots-question').innerHTML = questionText;
    document.getElementById('FactorQuadratics2Roots-result').textContent = '';
    document.getElementById('FactorQuadratics2Roots-answer').value = '';
    document.getElementById('FactorQuadratics2Roots-next-question').style.display = 'none';
    document.getElementById('FactorQuadratics2Roots-answer').focus();
}

function checkFactorQuadratics2RootsAnswer() {
    const userAnswer = document.getElementById('FactorQuadratics2Roots-answer').value
                        .split(',')
                        .map(num => parseFloat(num.trim()));

    const correctAnswer1 = window.currentAnswer[0];
    const correctAnswer2 = window.currentAnswer[1];
    
    const isCorrect = (userAnswer.includes(correctAnswer1) && userAnswer.includes(correctAnswer2)) && userAnswer.length === 2;

    const resultText = isCorrect ? 'Correct!' : `Nope, answer is ${window.currentAnswer.join(', ')}.`;
    document.getElementById('FactorQuadratics2Roots-result').textContent = resultText;
    document.getElementById('FactorQuadratics2Roots-next-question').style.display = 'inline';
    document.getElementById('FactorQuadratics2Roots-answer').blur();
}

function startCompleteTheSquare() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('CompleteTheSquare-screen').style.display = 'block';
    document.getElementById('explanation-box').textContent = 'Your answer should be in the form (x+_)² + _';
    
    document.getElementById('CompleteTheSquare-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkCompleteTheSquareAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('CompleteTheSquare-next-question').click();
        }
    });
    generateCompleteTheSquareQuestion();
}

function generateCompleteTheSquareQuestion() {
    const a = 1; 
    const b = getRandomDigitPosorNeg() * 2;
    const c = Math.pow(b / 2 , 2) / a;
    const d = getRandomDigit();

    let answerText;
    if (b < 0) {
        if ((c - d) < 0) {
            answerText = `(x-${Math.abs(b / 2)})^2 + ${Math.abs(d - c)}`;
        } else {
            answerText = `(x-${Math.abs(b / 2)})^2 - ${Math.abs(c - d)}`;
        }
    } else {
        if ((c - d) < 0) {
            answerText = `(x+${b / 2})^2 + ${Math.abs(d - c)}`;
        } else {
            answerText = `(x+${b / 2})^2 - ${Math.abs(c - d)}`;
        }
    }

    window.currentAnswer = answerText;

    const aText = a === 1 ? '' : a;
    let questionText;
    if (b < 0) {
        questionText = `${aText}x<sup>2</sup> - ${Math.abs(b)}x + ${d}`;
    } else {
        questionText = `${aText}x<sup>2</sup> + ${b}x + ${d}`;
    }

    document.getElementById('CompleteTheSquare-question').innerHTML = questionText;
    document.getElementById('CompleteTheSquare-result').textContent = '';
    document.getElementById('CompleteTheSquare-answer').value = '';
    document.getElementById('CompleteTheSquare-next-question').style.display = 'none';
    document.getElementById('CompleteTheSquare-answer').focus();
}

function formatExponent() {
    const input = document.getElementById('CompleteTheSquare-answer');
    input.value = input.value.replace(/\^2/g, '²');
}

function formatSquareRoot() {
    const input = document.getElementById('UnitCircleQuiz-answer');
    input.value = input.value.replace(/sqrt/g, '√');
}

function checkCompleteTheSquareAnswer() {
    const input = document.getElementById('CompleteTheSquare-answer');
    let userAnswer = input.value.trim();

    const standardizedAnswer = userAnswer.replace(/²/g, '^2').replace(/\s+/g, '');
    const correctAnswer = window.currentAnswer.replace(/\s+/g, '');

    const resultText = standardizedAnswer === correctAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('CompleteTheSquare-result').textContent = resultText;
    document.getElementById('CompleteTheSquare-next-question').style.display = 'inline';
    document.getElementById('CompleteTheSquare-answer').blur();
}

function startDegreesRadians() {
    document.getElementById('trigonometry-select-screen').style.display = 'none';
    document.getElementById('DegreesRadiansMedium-screen').style.display = 'none';
    document.getElementById('DegreesRadiansHard-screen').style.display = 'none';
    document.getElementById('DegreesRadians-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Just degrees to radians<br><br>Type pi to type π";
    document.getElementById('DegreesRadians-answer').oninput = formatPiSymbol;
    document.getElementById('difficulty-button').style.display = 'block';
    document.getElementById('DegreesRadians-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkDegreesRadiansAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('DegreesRadians-next-question').click();
        }
    });
    selectDifficulty('easy');
    generateDegreesRadiansQuestion();
    //const teachBox = document.getElementById('teach-box');
    //teachBox.style.display = 'flex';
   // teachBox.innerHTML = 'Look up a unit circle if you need help!';
}

function formatPiSymbol(event) {
    const input = event.target; // Get the input element that triggered the event
    const cursorPosition = input.selectionStart; // Remember cursor position
    const valueBefore = input.value;

    // Only replace "pi" with "π" if it follows a valid numeric input or appears as "pi" on its own
    input.value = input.value.replace(/(\d*)pi/g, '$1π'); 

    // Restore the cursor position after replacing
    const newLength = input.value.length;
    const lengthDifference = newLength - valueBefore.length;
    input.selectionStart = cursorPosition + lengthDifference;
    input.selectionEnd = cursorPosition + lengthDifference;
}

function generateDegreesRadiansQuestion() {
    // Define the main degrees values and their corresponding radians
    const degreesToRadians = {
        '30': 'π/6',
        '45': 'π/4',
        '60': 'π/3',
        '90': 'π/2',
        '120': '2π/3',
        '135': '3π/4',
        '150': '5π/6',
        '180': 'π',
        '210': '7π/6',
        '225': '5π/4',
        '240': '4π/3',
        '270': '3π/2',
        '300': '5π/3',
        '315': '7π/4',
        '330': '11π/6',
        '360': '2π'
    };

    // Get a random degree value
    const degreeValues = Object.keys(degreesToRadians);
    let randomDegree;

    do {
        randomDegree = degreeValues[Math.floor(Math.random() * degreeValues.length)];
    } while (randomDegree === lastDegreesRadiansQuestion); // Ensure the new question is different from the last one

    // Update the last question
    lastDegreesRadiansQuestion = randomDegree;

    // Set the question text and the correct answer
    const questionText = `How many radians are ${randomDegree} degrees?`;
    window.currentAnswer = degreesToRadians[randomDegree];

    // Update the UI elements
    document.getElementById('DegreesRadians-question').textContent = questionText;
    document.getElementById('DegreesRadians-result').textContent = '';
    document.getElementById('DegreesRadians-answer').value = '';
    document.getElementById('DegreesRadians-next-question').style.display = 'none';
    document.getElementById('DegreesRadians-answer').focus();
}

function checkDegreesRadiansAnswer() {
    const userAnswer = document.getElementById('DegreesRadians-answer').value.trim().toLowerCase();
    const correctAnswer = window.currentAnswer.toLowerCase();

    // Convert both answers to comparable formats
    const standardizedUserAnswer = userAnswer.replace(/\s+/g, '').replace('π', 'pi');
    const standardizedCorrectAnswer = correctAnswer.replace('π', 'pi');

    // Use math.js or a custom fraction evaluator to simplify and compare answers
    const isCorrect = standardizedUserAnswer === standardizedCorrectAnswer || evaluateEquivalentFractions(standardizedUserAnswer, standardizedCorrectAnswer);

    const resultText = isCorrect ? 'Correct!' : `Nope, the answer is ${window.currentAnswer}.`;

    document.getElementById('DegreesRadians-result').textContent = resultText;
    document.getElementById('DegreesRadians-next-question').style.display = 'inline';
    document.getElementById('DegreesRadians-answer').blur();
}

// Function to evaluate equivalent fractions
function evaluateEquivalentFractions(userAnswer, correctAnswer) {
    // Check if userAnswer and correctAnswer are fractions and normalize them for comparison
    if (userAnswer.includes('/') && correctAnswer.includes('/')) {
        const [userNumerator, userDenominator] = userAnswer.split('/').map(f => parseFloat(f));
        const [correctNumerator, correctDenominator] = correctAnswer.split('/').map(f => parseFloat(f));
        
        // Return true if both fractions are equal when cross-multiplied
        return userNumerator * correctDenominator === correctNumerator * userDenominator;
    }
    return false;
}

function startDegreesRadiansMedium() {
    document.getElementById('DegreesRadians-screen').style.display = 'none';
    document.getElementById('DegreesRadiansMedium-screen').style.display = 'block';
    document.getElementById('DegreesRadiansHard-screen').style.display = 'none';
    document.getElementById('explanation-box').innerHTML = "Degrees to radians <br>AND radians to degrees<br><br>Type pi to type π";
    document.getElementById('DegreesRadiansMedium-answer').oninput = formatPiSymbol; 
    document.getElementById('DegreesRadiansMedium-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkDegreesRadiansMediumAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('DegreesRadiansMedium-next-question').click();
        }
    });
    selectDifficulty('medium'); // Highlight medium button
    generateDegreesRadiansMediumQuestion();
}

let isDegreesToRadiansMediumNext = false; // Start with radians for medium questions

function generateDegreesRadiansMediumQuestion() {
    // Define degrees and their corresponding radians at 30-degree increments
    const degreesToRadians = {
        '30': 'π/6',
        '60': 'π/3',
        '90': 'π/2',
        '120': '2π/3',
        '150': '5π/6',
        '180': 'π',
        '210': '7π/6',
        '240': '4π/3',
        '270': '3π/2',
        '300': '5π/3',
        '330': '11π/6',
        '360': '2π'
    };

    // Get all degree values
    const degreeValues = Object.keys(degreesToRadians);
    let randomDegree;

    do {
        // Randomly select a degree value
        randomDegree = degreeValues[Math.floor(Math.random() * degreeValues.length)];
    } while (randomDegree === lastDegreesRadiansQuestion); // Ensure the new question is different from the last one

    // Update the last question
    lastDegreesRadiansQuestion = randomDegree;

    // Set question and answer based on the alternating question type
    let questionText;
    if (isDegreesToRadiansMediumNext) {
        questionText = `How many radians are ${randomDegree} degrees?`;
        window.currentAnswer = degreesToRadians[randomDegree];
    } else {
        // Find the corresponding degree for a given radian
        const radiansToDegrees = Object.fromEntries(Object.entries(degreesToRadians).map(([deg, rad]) => [rad, deg]));
        const randomRadian = degreesToRadians[randomDegree];
        questionText = `How many degrees are ${randomRadian} radians?`;
        window.currentAnswer = radiansToDegrees[randomRadian];
    }

    // Toggle for next question type
    isDegreesToRadiansMediumNext = !isDegreesToRadiansMediumNext;

    // Update the UI elements for the medium screen
    document.getElementById('DegreesRadiansMedium-question').textContent = questionText;
    document.getElementById('DegreesRadiansMedium-result').textContent = '';
    document.getElementById('DegreesRadiansMedium-answer').value = '';
    document.getElementById('DegreesRadiansMedium-next-question').style.display = 'none';
    document.getElementById('DegreesRadiansMedium-answer').focus();
}

function checkDegreesRadiansMediumAnswer() {
    const userAnswer = document.getElementById('DegreesRadiansMedium-answer').value.trim().toLowerCase();
    const correctAnswer = window.currentAnswer.toLowerCase();

    // Convert both answers to comparable formats
    const standardizedUserAnswer = userAnswer.replace(/\s+/g, '').replace('π', 'pi'); // Ensure π is converted back to 'pi'
    const standardizedCorrectAnswer = correctAnswer.replace('π', 'pi');

    // Check if the user's answer is correct in various formats
    const isCorrect =
        standardizedUserAnswer === standardizedCorrectAnswer ||
        evaluateEquivalentFractions(standardizedUserAnswer, standardizedCorrectAnswer) ||
        comparePiExpressions(standardizedUserAnswer, standardizedCorrectAnswer);

    const resultText = isCorrect ? 'Correct!' : `Nope, the answer is ${window.currentAnswer}.`;

    document.getElementById('DegreesRadiansMedium-result').textContent = resultText;
    document.getElementById('DegreesRadiansMedium-next-question').style.display = 'inline';
    document.getElementById('DegreesRadiansMedium-answer').blur();
}

function startDegreesRadiansHard() {
    document.getElementById('DegreesRadians-screen').style.display = 'none';
    document.getElementById('DegreesRadiansMedium-screen').style.display = 'none';
    document.getElementById('DegreesRadiansHard-screen').style.display = 'block';
    document.getElementById('difficulty-button').style.display = 'block'; // Show difficulty
    document.getElementById('explanation-box').innerHTML = "Round to 2 decimal points";
    document.getElementById('DegreesRadiansHard-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkDegreesRadiansHardAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('DegreesRadiansHard-next-question').click();
        }
    });
    selectDifficulty('hard');
    generateDegreesRadiansHardQuestion(); // Start generating the hard questions
}

let isDegreesToRadiansHardNext = true; // Start with degrees to radians for hard questions

function generateDegreesRadiansHardQuestion() {
    let questionText, randomValue;

    do {
        if (isDegreesToRadiansHardNext) {
            // Generate a random degree value between 0.1 and 720
            randomValue = (Math.random() * (720 - 0.1) + 0.1).toFixed(1);
            questionText = `How many radians are ${randomValue} degrees?`;
            window.currentAnswer = parseFloat((parseFloat(randomValue) * (Math.PI / 180)).toFixed(2)); // Convert and keep only 2 decimal points
        } else {
            // Generate a random radian value between 0.1 and 4π, in increments of 0.1
            const maxRadians = 4 * Math.PI; // Maximum value of 4π
            randomValue = (Math.random() * (maxRadians - 0.1) + 0.1);
            randomValue = (Math.round(randomValue * 10) / 10).toFixed(1); // Round to nearest increment of 0.1
            questionText = `How many degrees are ${randomValue} radians?`;
            window.currentAnswer = parseFloat((parseFloat(randomValue) * (180 / Math.PI)).toFixed(2)); // Convert and keep only 2 decimal points
        }
    } while (questionText === lastDegreesRadiansQuestion); // Ensure the new question is different from the last one

    // Toggle for next question type
    isDegreesToRadiansHardNext = !isDegreesToRadiansHardNext;

    lastDegreesRadiansQuestion = randomValue; // Store last question

    document.getElementById('DegreesRadiansHard-question').textContent = questionText;
    document.getElementById('DegreesRadiansHard-result').textContent = '';
    document.getElementById('DegreesRadiansHard-answer').value = '';
    document.getElementById('DegreesRadiansHard-next-question').style.display = 'none';
    document.getElementById('DegreesRadiansHard-answer').focus();
}

function checkDegreesRadiansHardAnswer() {
    const userAnswer = parseFloat(document.getElementById('DegreesRadiansHard-answer').value.trim());
    const correctAnswer = parseFloat(window.currentAnswer.toFixed(2)); // Keep only 2 decimal points

    // Allow a small margin of error due to floating-point precision issues
    const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.01; // Acceptable margin of 0.01

    const resultText = isCorrect ? 'Correct!' : `Nope, the answer is ${correctAnswer}.`;
    document.getElementById('DegreesRadiansHard-result').textContent = resultText;
    document.getElementById('DegreesRadiansHard-next-question').style.display = 'inline';
    document.getElementById('DegreesRadiansHard-answer').blur();
}

// New function to compare pi expressions
function comparePiExpressions(userAnswer, correctAnswer) {
    // Convert π expressions to numerical approximations
    const pi = Math.PI;
    const userExpression = userAnswer.replace('pi', pi);
    const correctExpression = correctAnswer.replace('pi', pi);

    // Evaluate if the numerical values are close enough
    return Math.abs(eval(userExpression) - eval(correctExpression)) < 0.01;
}

function startUnitCircleQuiz() {
    document.getElementById('trigonometry-select-screen').style.display = 'none';
    document.getElementById('UnitCircleQuiz-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Your answer should either be a whole number or a fraction. <br> <br> Type sqrt to type √.";
    document.getElementById('UnitCircleQuiz-answer').oninput = formatSquareRoot;
    document.getElementById('UnitCircleQuiz-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkUnitCircleQuizAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('UnitCircleQuiz-next-question').click();
        }
    });
    generateUnitCircleQuizQuestion();
}

function generateUnitCircleQuizQuestion() {
    let questionText;
    
    do {
        const angles = ['0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6'];
        const trigFunctions = ['cos', 'sin'];

        const randomAngle = angles[Math.floor(Math.random() * angles.length)];
        const randomTrigFunction = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];

        questionText = `What is ${randomTrigFunction}(${randomAngle})?`;

        // Calculate the correct answer based on the angle and trig function
        let correctAnswer;
        if (randomTrigFunction === 'cos') {
            const cosValues = {
                '0': '1',
                'π/6': '√3/2',
                'π/4': '√2/2',
                'π/3': '1/2',
                'π/2': '0',
                '2π/3': '-1/2',
                '3π/4': '-√2/2',
                '5π/6': '-√3/2',
                'π': '-1',
                '7π/6': '-√3/2',
                '5π/4': '-√2/2',
                '4π/3': '-1/2',
                '3π/2': '0',
                '5π/3': '1/2',
                '7π/4': '√2/2',
                '11π/6': '√3/2'
            };
            correctAnswer = cosValues[randomAngle];
        } else if (randomTrigFunction === 'sin') {
            const sinValues = {
                '0': '0',
                'π/6': '1/2',
                'π/4': '√2/2',
                'π/3': '√3/2',
                'π/2': '1',
                '2π/3': '√3/2',
                '3π/4': '√2/2',
                '5π/6': '1/2',
                'π': '0',
                '7π/6': '-1/2',
                '5π/4': '-√2/2',
                '4π/3': '-√3/2',
                '3π/2': '-1',
                '5π/3': '-√3/2',
                '7π/4': '-√2/2',
                '11π/6': '-1/2'
            };
            correctAnswer = sinValues[randomAngle];
        }

        window.currentAnswer = correctAnswer;

    } while (questionText === lastUnitCircleQuizQuestion);

    lastUnitCircleQuizQuestion = questionText;

    document.getElementById('UnitCircleQuiz-question').innerHTML = questionText;
    document.getElementById('UnitCircleQuiz-result').textContent = '';
    document.getElementById('UnitCircleQuiz-answer').value = '';
    document.getElementById('UnitCircleQuiz-next-question').style.display = 'none';
    document.getElementById('UnitCircleQuiz-answer').focus();
}

function checkUnitCircleQuizAnswer() {
    const userAnswer = document.getElementById('UnitCircleQuiz-answer').value.trim();

    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('UnitCircleQuiz-result').textContent = resultText;
    document.getElementById('UnitCircleQuiz-next-question').style.display = 'inline';
    document.getElementById('UnitCircleQuiz-answer').blur();
}

function startDoubleAngleIdentitiesEasy() {
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'none'; // Hide the medium screen
    document.getElementById('trigonometry-select-screen').style.display = 'none'; // Hide the medium screen
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'block';
    document.getElementById('difficulty-button').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Enter a double angle identity.";
    document.getElementById('DoubleAngleIdentitiesEasy-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkDoubleAngleIdentitiesEasyAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('DoubleAngleIdentitiesEasy-next-question').click();
        }
    });
    selectDifficulty('easy');
    generateDoubleAngleIdentitiesEasyQuestion();
}

let easyQuestionIndex = 0; // Initialize index to track the current question

function generateDoubleAngleIdentitiesEasyQuestion() {
    const identities = [
        { question: "2sinxcosx = ?", answer: "sin2x" },
        { question: "cos²x - sin²x = ?", answer: "cos2x" },
        { question: "2cos²x - 1 = ?", answer: "cos2x" },
        { question: "1 - 2sin²x = ?", answer: "cos2x" },
        { question: "<div style='display: inline-block;'><div style='text-align: center;'>2tanx</div><hr style='margin: 0;'><div style='text-align: center;'>1 - tan²x</div></div> = ?", answer: "tan2x" }
    ];

    const selectedIdentity = identities[easyQuestionIndex];
    easyQuestionIndex = (easyQuestionIndex + 1) % identities.length; // Move to the next question in the sequence

    window.currentAnswer = selectedIdentity.answer.replace(/\s+/g, '').replace(/\((.*?)\)/g, '$1');

    document.getElementById('DoubleAngleIdentitiesEasy-question').innerHTML = selectedIdentity.question;
    document.getElementById('DoubleAngleIdentitiesEasy-result').textContent = '';
    document.getElementById('DoubleAngleIdentitiesEasy-answer').value = '';
    document.getElementById('DoubleAngleIdentitiesEasy-next-question').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesEasy-answer').focus();
}

function checkDoubleAngleIdentitiesEasyAnswer() {
    let userAnswer = document.getElementById('DoubleAngleIdentitiesEasy-answer').value.trim();

    userAnswer = userAnswer.replace(/\s+/g, '');
    userAnswer = userAnswer.replace(/\((.*?)\)/g, '$1');

    let correctAnswer = window.currentAnswer.replace(/\s+/g, '').replace(/\((.*?)\)/g, '$1');

    const resultText = userAnswer === correctAnswer ? 'Correct!' : `Nope, answer is ${window.currentAnswer}.`;
    document.getElementById('DoubleAngleIdentitiesEasy-result').textContent = resultText;
    document.getElementById('DoubleAngleIdentitiesEasy-next-question').style.display = 'inline';
    document.getElementById('DoubleAngleIdentitiesEasy-answer').blur();
}

function startDoubleAngleIdentitiesMedium() {
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'block';
    document.getElementById('difficulty-button').style.display = 'block'; // Show difficulty buttons
    document.getElementById('DoubleAngleIdentitiesMedium-answer').onkeydown = function(event) {
        if (event.key === 'Enter') {
            checkDoubleAngleIdentitiesMediumAnswer();
        }
    };
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { // Detect Cmd (Mac) or Ctrl (Windows)
            document.getElementById('DoubleAngleIdentitiesMedium-next-question').click();
        }
    });
    selectDifficulty('medium');
    generateDoubleAngleIdentitiesMediumQuestion();
}

let mediumQuestionIndex = 0; // Initialize index to track the current question

function generateDoubleAngleIdentitiesMediumQuestion() {
    const identities = [
        { question: "sin2x = ?", answer: "2sin(x)cos(x)" },
        { question: "cos2x = ?", answers: ["cos^2(x) - sin^2(x)", "2cos^2(x) - 1", "1 - 2sin^2(x)"] },
        { question: "tan2x = ?", answer: "2tan(x) / (1 - tan^2(x))" }
    ];

    const selectedIdentity = identities[mediumQuestionIndex];
    mediumQuestionIndex = (mediumQuestionIndex + 1) % identities.length; // Move to the next question in the sequence

    if (selectedIdentity.answers) {
        window.currentAnswers = selectedIdentity.answers.map(ans => ans.replace(/\s+/g, '').replace(/²/g, '^2').replace(/\((.*?)\)/g, '$1'));
    } else {
        window.currentAnswers = [selectedIdentity.answer.replace(/\s+/g, '').replace(/²/g, '^2').replace(/\((.*?)\)/g, '$1')];
    }

    document.getElementById('DoubleAngleIdentitiesMedium-question').innerHTML = selectedIdentity.question;
    document.getElementById('DoubleAngleIdentitiesMedium-result').textContent = '';
    document.getElementById('DoubleAngleIdentitiesMedium-answer').value = '';
    document.getElementById('DoubleAngleIdentitiesMedium-next-question').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesMedium-answer').focus();
}

function formatExponentMedium() {
    const input = document.getElementById('DoubleAngleIdentitiesMedium-answer');
    input.value = input.value.replace(/\^2/g, '²');
}

function checkDoubleAngleIdentitiesMediumAnswer() {
    function normalizeAnswer(answer) {
        return answer
            .replace(/\s+/g, '')
            .replace(/²/g, '^2')
            .replace(/\((.*?)\)/g, '$1')
            .replace(/(\d)\(/g, '$1*(')
            .replace(/\^2/g, '²')
            .replace(/\/+/g, '/')
            .replace(/([\+\-\*\/])\1+/g, '$1')
            .toLowerCase();
    }

    const userAnswer = normalizeAnswer(document.getElementById('DoubleAngleIdentitiesMedium-answer').value.trim());
    const correctAnswers = window.currentAnswers.map(answer => normalizeAnswer(answer));

    const isCorrect = correctAnswers.some(correctAnswer => correctAnswer === userAnswer);

    const resultText = isCorrect ? 'Correct!' : `Nope, answer is ${window.currentAnswers[0]}.`;
    document.getElementById('DoubleAngleIdentitiesMedium-result').textContent = resultText;
    document.getElementById('DoubleAngleIdentitiesMedium-next-question').style.display = 'inline';
    document.getElementById('DoubleAngleIdentitiesMedium-answer').blur();
}

function startDoubleAngleIdentitiesHard() {
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'block';
    document.getElementById('difficulty-button').style.display = 'block'; // Show difficulty buttons
    generateDoubleAngleIdentitiesHardQuestion();
}

function generateDoubleAngleIdentitiesHardQuestion() {
   
}

// Back button section!
function AlgebraSelectBackToHome() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function ArithmeticSelectBackToHome() {
    document.getElementById('arithmetic-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function TrigonometrySelectBackToHome() {
    document.getElementById('trigonometry-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function ArithmeticBackToArithmeticSelect() {
    document.getElementById('arithmetic-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function BasicAlgebraBackToAlgebraSelect() {
    document.getElementById('basic-algebra-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function FactorQuadraticsOneRootEasyBackToAlgebraSelect() {
    document.getElementById('FactorQuadraticsOneRootEasy-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function FactorQuadraticsOneRootMediumBackToAlgebraSelect() {
    document.getElementById('FactorQuadraticsOneRootMedium-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function FactorQuadratics2RootsBackToAlgebraSelect() {
    document.getElementById('FactorQuadratics2Roots-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function CompleteTheSquareBackToAlgebraSelect() {
    document.getElementById('CompleteTheSquare-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function DegreesRadiansBackToTrigonometrySelect() {
    document.getElementById('DegreesRadians-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
    document.getElementById('teach-box').style.display = 'none'; // Hide the teach box
}

function DegreesRadiansMediumBackToTrigonometrySelect() {
    document.getElementById('DegreesRadiansMedium-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
    document.getElementById('teach-box').style.display = 'none';
}

function DegreesRadiansHardBackToTrigonometrySelect() {
    document.getElementById('DegreesRadiansHard-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
    document.getElementById('teach-box').style.display = 'none';
}

function UnitCircleQuizBackToTrigonometrySelect() {
    document.getElementById('UnitCircleQuiz-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function DoubleAngleIdentitiesEasyBackToTrigonometrySelect() {
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function DoubleAngleIdentitiesMediumBackToTrigonometrySelect() {
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    document.getElementById('explanation-box').innerHTML = "Welcome!<br><br> Choose the type of problem you'd like to improve on.";
}

function selectDifficulty(difficulty) {
    document.getElementById('easy-button').classList.remove('button-selected');
    document.getElementById('medium-button').classList.remove('button-selected');
    document.getElementById('hard-button').classList.remove('button-selected');
    
    if (difficulty === 'easy') {
        document.getElementById('easy-button').classList.add('button-selected');
    } else if (difficulty === 'medium') {
        document.getElementById('medium-button').classList.add('button-selected');
    } else if (difficulty === 'hard') {
        document.getElementById('hard-button').classList.add('button-selected');
    }
}
