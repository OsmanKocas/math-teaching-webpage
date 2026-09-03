// Add, Subtract, Multiply, Divide
function calculateAddition() {
    const num1 = parseFloat(document.getElementById('addNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('addNum2').value) || 0;
    document.getElementById('addResult').value = num1 + num2;
}

function calculateSubtraction() {
    const num1 = parseFloat(document.getElementById('subNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('subNum2').value) || 0;
    document.getElementById('subResult').value = num1 - num2;
}

function calculateMultiplication() {
    const num1 = parseFloat(document.getElementById('mulNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('mulNum2').value) || 0;
    document.getElementById('mulResult').value = num1 * num2;
}

function calculateDivision() {
    const num1 = parseFloat(document.getElementById('divNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('divNum2').value) || 1;
    if (num2 === 0) {
        document.getElementById('divResult').value = 'Cannot divide by 0';
    } else {
        document.getElementById('divResult').value = (num1 / num2).toFixed(2);
    }
}

function calculateFourOperations() {
    const num1 = parseFloat(document.getElementById('fourNum1').value) || 0;
    const op1 = document.getElementById('fourOp1').value;
    const num2 = parseFloat(document.getElementById('fourNum2').value) || 0;
    const op2 = document.getElementById('fourOp2').value;
    const num3 = parseFloat(document.getElementById('fourNum3').value) || 0;
    
    let temp, result;
    
    // Order of operations
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
        temp = (op1 === '*') ? (num1 * num2) : (num2 === 0 ? 0 : (num1 / num2));
        result = (op2 === '+') ? (temp + num3) : (temp - num3);
    } else if ((op1 === '+' || op1 === '-') && (op2 === '*' || op2 === '/')) {
        temp = (op2 === '*') ? (num2 * num3) : (num3 === 0 ? 0 : (num2 / num3));
        result = (op1 === '+') ? (num1 + temp) : (num1 - temp);
    } else {
        temp = (op1 === '+') ? (num1 + num2) : (op1 === '-') ? (num1 - num2) : (op1 === '*') ? (num1 * num2) : (num2 === 0 ? 0 : (num1 / num2));
        result = (op2 === '+') ? (temp + num3) : (op2 === '-') ? (temp - num3) : (op2 === '*') ? (temp * num3) : (num3 === 0 ? 0 : (temp / num3));
    }
    
    document.getElementById('fourResult').value = result.toFixed(2);
}

function generateQuizQuestion() {
    const types = ['addition', 'subtraction', 'multiplication', 'division'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let num1, num2, question, answer;
    
    switch(type) {
        case 'addition':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
            break;
        case 'subtraction':
            num1 = Math.floor(Math.random() * 100) + 50;
            num2 = Math.floor(Math.random() * num1);
            question = `${num1} - ${num2} = ?`;
            answer = num1 - num2;
            break;
        case 'multiplication':
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            question = `${num1} × ${num2} = ?`;
            answer = num1 * num2;
            break;
        case 'division':
            answer = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            num1 = answer * num2;
            question = `${num1} ÷ ${num2} = ?`;
            break;
    }
    
    window.currentQuestion = question;
    window.correctAnswer = answer;
    
    document.getElementById('quizQuestion').textContent = question;
    document.getElementById('quizAnswer').style.display = 'inline-block';
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('quizAnswer').value = '';
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizAnswer').focus();
}

function checkQuizAnswer() {
    const userAnswer = parseFloat(document.getElementById('quizAnswer').value);
    const feedback = document.getElementById('quizFeedback');
    
    if (userAnswer === window.correctAnswer) {
        feedback.textContent = '✅ Correct! Great job!';
        feedback.style.color = '#2ecc71';
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is ${window.correctAnswer}`;
        feedback.style.color = '#e74c3c';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const quizInput = document.getElementById('quizAnswer');
    if (quizInput) {
        quizInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkQuizAnswer();
        });
    }
});