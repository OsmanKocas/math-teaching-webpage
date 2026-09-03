// Addition Calculator
function calculateAddition() {
    const num1 = parseFloat(document.getElementById('addNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('addNum2').value) || 0;
    const result = num1 + num2;
    document.getElementById('addResult').value = result;
}

// Subtraction Calculator
function calculateSubtraction() {
    const num1 = parseFloat(document.getElementById('subNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('subNum2').value) || 0;
    const result = num1 - num2;
    document.getElementById('subResult').value = result;
}

// Multiplication Calculator
function calculateMultiplication() {
    const num1 = parseFloat(document.getElementById('mulNum1').value) || 0;
    const num2 = parseFloat(document.getElementById('mulNum2').value) || 0;
    const result = num1 * num2;
    document.getElementById('mulResult').value = result;
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
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.practice input:not([readonly])');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.closest('.practice').querySelector('button');
                button.click();
            }
        });
    });
});