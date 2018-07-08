import ECalculator from './calculator/engeener';

var calc = new ECalculator();
calc.init();

function showResult() {
    calc.calculate();
}

function showEngeenerMode(){
    document.getElementById('EngModeBtns').style.display = 'flex';
}
function hideEngeenerMode(){
    document.getElementById('EngModeBtns').style.display = 'none';
}

function calcReset() {
    calc.reset();
}