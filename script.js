// Addition Calculator
function calculateAddition() {
    const num1 = parseFloat(document.getElementById('addNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('addNum2').value) || 0;
    const result = num1 + num2;
    document.getElementById('addResult').value = result;
    updateProgress();
}

// Subtraction Calculator
function calculateSubtraction() {
    const num1 = parseFloat(document.getElementById('subNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('subNum2').value) || 0;
    const result = num1 - num2;
    document.getElementById('subResult').value = result;
    updateProgress();
}

// Multiplication Calculator
function calculateMultiplication() {
    const num1 = parseFloat(document.getElementById('mulNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('mulNum2').value) || 0;
    const result = num1 * num2;
    document.getElementById('mulResult').value = result;
    updateProgress();
}

// Division Calculator
function calculateDivision() {
    const num1 = parseFloat(document.getElementById('divNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('divNum2').value) || 1;
    
    if (num2 === 0) {
        document.getElementById('divResult').value = 'Cannot divide by 0';
        return;
    }
    
    const result = num1 / num2;
    document.getElementById('divResult').value = result.toFixed(2);
    updateProgress();
}

// Four Operations Combined Calculator
function calculateFourOperations() {
    const num1 = parseFloat(document.getElementById('fourNum1').value) || 0;
    const op1 = document.getElementById('fourOp1').value;
    const num2 = parseFloat(document.getElementById('fourNum2').value) || 0;
    const op2 = document.getElementById('fourOp2').value;
    const num3 = parseFloat(document.getElementById('fourNum3').value) || 0;
    
    let result;
    
    // Order of operations: Multiplication and Division first (left to right)
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
        // First operation is * or /, second is + or -
        let temp;
        if (op1 === '*') {
            temp = num1 * num2;
        } else {
            if (num2 === 0) {
                document.getElementById('fourResult').value = 'Cannot divide by 0';
                return;
            }
            temp = num1 / num2;
        }
        
        if (op2 === '+') {
            result = temp + num3;
        } else {
            result = temp - num3;
        }
    } else if ((op1 === '+' || op1 === '-') && (op2 === '*' || op2 === '/')) {
        // First operation is + or -, second is * or /
        let temp;
        if (op2 === '*') {
            temp = num2 * num3;
        } else {
            if (num3 === 0) {
                document.getElementById('fourResult').value = 'Cannot divide by 0';
                return;
            }
            temp = num2 / num3;
        }
        
        if (op1 === '+') {
            result = num1 + temp;
        } else {
            result = num1 - temp;
        }
    } else {
        // Same precedence, calculate left to right
        let temp;
        if (op1 === '+') {
            temp = num1 + num2;
        } else if (op1 === '-') {
            temp = num1 - num2;
        } else if (op1 === '*') {
            temp = num1 * num2;
        } else {
            if (num2 === 0) {
                document.getElementById('fourResult').value = 'Cannot divide by 0';
                return;
            }
            temp = num1 / num2;
        }
        
        if (op2 === '+') {
            result = temp + num3;
        } else if (op2 === '-') {
            result = temp - num3;
        } else if (op2 === '*') {
            result = temp * num3;
        } else {
            if (num3 === 0) {
                document.getElementById('fourResult').value = 'Cannot divide by 0';
                return;
            }
            result = temp / num3;
        }
    }
    
    document.getElementById('fourResult').value = result.toFixed(2);
    updateProgress();
}

// Fraction Calculator
function calculateFraction() {
    const numerator = parseFloat(document.getElementById('fracNum').value) || 0;
    const denominator = parseFloat(document.getElementById('fracDen').value) || 1;
    
    if (denominator === 0) {
        document.getElementById('fracResult').value = 'Cannot divide by 0';
        return;
    }
    
    const result = (numerator / denominator).toFixed(4);
    document.getElementById('fracResult').value = result;
    updateProgress();
}

// Percentage Calculator
function calculatePercentage() {
    const percent = parseFloat(document.getElementById('percentValue').value) || 0;
    const base = parseFloat(document.getElementById('percentBase').value) || 0;
    
    const result = (percent / 100) * base;
    document.getElementById('percentResult').value = result.toFixed(2);
    updateProgress();
}

// Quiz Question Generator
let currentQuestion = null;
let correctAnswer = null;

function generateQuizQuestion() {
    const types = ['addition', 'subtraction', 'multiplication', 'division', 'four-ops'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let num1, num2, num3, question, answer;
    
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
        case 'four-ops':
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            num3 = Math.floor(Math.random() * 20) + 1;
            const op1 = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
            const op2 = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
            question = `${num1} ${op1} ${num2} ${op2} ${num3} = ?`;
            
            // Calculate with order of operations
            let temp;
            if ((op1 === '×' || op1 === '÷') && (op2 === '+' || op2 === '-')) {
                if (op1 === '×') {
                    temp = num1 * num2;
                } else {
                    temp = num1 / num2;
                }
                if (op2 === '+') {
                    answer = temp + num3;
                } else {
                    answer = temp - num3;
                }
            } else if ((op1 === '+' || op1 === '-') && (op2 === '×' || op2 === '÷')) {
                if (op2 === '×') {
                    temp = num2 * num3;
                } else {
                    temp = num2 / num3;
                }
                if (op1 === '+') {
                    answer = num1 + temp;
                } else {
                    answer = num1 - temp;
                }
            } else {
                if (op1 === '+') temp = num1 + num2;
                else if (op1 === '-') temp = num1 - num2;
                else if (op1 === '×') temp = num1 * num2;
                else temp = num1 / num2;
                
                if (op2 === '+') answer = temp + num3;
                else if (op2 === '-') answer = temp - num3;
                else if (op2 === '×') answer = temp * num3;
                else answer = temp / num3;
            }
            answer = Math.round(answer * 100) / 100;
            break;
    }
    
    currentQuestion = question;
    correctAnswer = answer;
    
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
    
    // Allow for small floating point differences
    const tolerance = 0.01;
    const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance;
    
    if (isCorrect) {
        feedback.textContent = '✅ Correct! Great job!';
        feedback.style.color = '#2ecc71';
        feedback.style.fontWeight = 'bold';
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is ${correctAnswer.toFixed(2)}`;
        feedback.style.color = '#e74c3c';
        feedback.style.fontWeight = 'bold';
    }
    
    updateProgress();
}

// Progress Bar Update
let actionsCompleted = 0;

function updateProgress() {
    actionsCompleted++;
    const sections = 8; // total number of topics/sections
    const progress = Math.min((actionsCompleted / 10) * 100, 100);
    document.getElementById('progressBar').style.width = progress + '%';
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.practice input:not([readonly]), .practice-four input:not([readonly])');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.closest('.practice') ? this.closest('.practice').querySelector('button') : this.closest('.practice-four').querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Allow Enter to check quiz answer
    const quizInput = document.getElementById('quizAnswer');
    if (quizInput) {
        quizInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkQuizAnswer();
            }
        });
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
