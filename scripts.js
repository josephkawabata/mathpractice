<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose problem type</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div id="problem-type-choice">
            <p>Choose a problem type:</p>
            <button onclick="selectOperation('addition')">Addition</button>
            <button onclick="selectOperation('subtraction')">Subtraction</button>
            <button onclick="selectOperation('algebra')">Algebra</button>
        </div>
        
        <div id="digit-choice" style="display: none;">
            <p>Choose the number of digits:</p>
            <button onclick="generateMathProblem('one')">One Digit</button>
            <button onclick="generateMathProblem('two')">Two Digits</button>
            <button onclick="generateMathProblem('three')">Three Digits</button>
        </div>
        
        <div id="algebra-choice" style="display: none;">
            <div style="position: absolute; top: 10px; left: 10px; display: flex; flex-direction: column; align-items: flex-start;">
                <p>Choose an algebra problem type:</p>
                <button onclick="generateAlgebraProblem('addition')">Algebra Involving Addition</button>
                <button onclick="generateAlgebraProblem('subtraction')">Algebra Involving Subtraction</button>
                <button onclick="generateAlgebraProblem('multiplication')">Algebra Involving Multiplication</button>
            </div>
        </div>

        <p id="algebra-text" style="display: none;">Solve for x:</p>
        <p id="math-problem"></p>
        <input type="text" id="answer-box" placeholder="Enter your answer here" disabled>
        <button onclick="checkAnswer()" disabled id="submit-button">Submit</button>
        <p id="result"></p>
        
        <button id="choose-digits-button" style="display: none;" onclick="showDigitChoice()">Change # of digits</button>
        <button id="another-one-button" style="display: none;" onclick="generateAnotherOne()">Another One!</button>
        <button id="new-problem-button" style="display: none;" onclick="resetSelection()">Back Home</button>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
