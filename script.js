const text = document.querySelector('input')
const buttons = document.querySelectorAll('button')
let values = '';
let numbers = [];
let infixToPos = [];
let res = [];
let stack = []
function onOrOff() {
    infixToPos = [];
    numbers = [];
    res = [];
    stack = [];
}
for (let b of buttons) {
    b.addEventListener('click', function () {
           
        if (b.className == 'equal') {
            try {
                text.value =infixToPostfix(values);
            }
            catch(e) {
                text.value = 'SYNTAX ERROR';
            }                
            onOrOff();
            numbers.push(text.value.toString().substring(text.value.toString().lastIndexOf('R')+1));
              
        }
        else if (b.className == 'clear') {
            text.value = '';
            onOrOff();
        } else if (b.className === 'del') {
            numbers.pop();
            text.value = numbers.toString().replaceAll(',', '');
        }
        else {
            numbers.push(b.innerText);
            text.value = numbers.toString().replaceAll(',', '');
        }
        values = numbers.toString().replaceAll(',', '');
    })
}
function getPrecedence(ch){
    if(ch === '/' || ch==='x' || ch==='*')
        return 2;
    else if(ch === '+' || ch === '-')
        return 1;
    else
        return 0;
}
function infixToPostfix(values) {
    let dig = '';
    for (let i = 0; i < values.length; i++){
        if((values[i] >= '0' && values[i] <= '9' || values[i]==='.'))
            dig = dig + values[i];
        else{
            infixToPos.push(dig);
            dig='';
            while(stack.length!==0 && getPrecedence(values[i])<=getPrecedence(stack[stack.length-1]))
            {
                dig=dig+stack[stack.length-1];
                stack.pop();
            }
            stack.push(values[i]);
            if (dig.length >= 1) {
                infixToPos.push(dig)
                dig = '';
            }
        }
    }
    infixToPos.push(dig)
    dig = '';
    while (stack.length !== 0) {
        dig=dig+stack[stack.length-1];
        stack.pop();
    }
    infixToPos.push(dig);
    const res = evaluatePostfix(infixToPos);
    return res;
}
function evaluatePostfix(infixToPos) {
    let oper = {
        '+': (a, b) => a + b,
        '-': (a, b) => b - a,
        'x': (a, b) => a * b,
        '/': (a, b) => b / a,
        '*':(a,b)=>a*b
    }    
    for (let i = 0; i < infixToPos.length; i++){
        let ch = infixToPos[i];
        if (!isNaN(parseFloat(ch)))
            res.push(parseFloat(infixToPos[i]))
        else
            res.push(oper[infixToPos[i]](res.pop(), res.pop()))
    }
    return res[0];
}
