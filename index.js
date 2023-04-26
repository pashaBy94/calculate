function sum(a,b){
  return a + b;
}
function minus(a,b){
  return a - b
}
function module(a){
return Math.abs(a)
}
function revers(a){
  return -a
}
function division(a,b){
  return a/b
}
function multiplicat(a,b){
  return a * b
}
function clean(){
  display.innerHTML=arguments[0] === 0?arguments[0]:'';
}
function round(num){
  let strAll = String(num).length <= 11? String(num).length: 11;
  let strNum = String(num.toFixed(0)).length;
  let strDrob = strAll - strNum;
  return num.toFixed(strDrob);
}
function writeNumber(ev){
  let a = display.innerHTML;
  if(ev.target.classList.contains('number')){
    a += ev.target.innerHTML;
    let deg = /^[0]+/g;
    display.innerHTML = deg.test(a)?+a:a;
    display.scrollLeft = display.scrollWidth;
  }
  if(ev.target.classList.contains('dot') && !a.split('').includes('.')){
    display.innerHTML += ev.target.innerHTML;
  }
}
function resultSchet(a, callback){
  if(callback.length === 1) {
    display.innerHTML = round(callback(a));
    return
  }
  let equals = document.querySelector('#equals');
  equals.addEventListener('click', resultDisplay);
  function resultDisplay(ev){
    let b = isFinite(+display.innerHTML)?+display.innerHTML:0;
    display.innerHTML = round(callback(a,b));
    equals.removeEventListener('click', resultDisplay);

  }
}
function operationNum(ev){
  let o = ev.target.innerHTML;
  let a = isFinite(+display.innerHTML)?+display.innerHTML:0;
  switch(o){
    case '+': 
      resultSchet(a, sum);
      clean();
      break;
    case '-':
      if(a === 0){
        display.innerHTML = '-';
      } else{
        resultSchet(a, minus);
        clean();
      };
      break;
    case '/':
      resultSchet(a, division);
      clean();
      break;
    case '*':
      resultSchet(a, multiplicat);
      clean();
      break;
    case '%':
      resultSchet(a, module);
      break;
    case '-/+':
      resultSchet(a, revers);
      break;
    case 'C':
      clean(0);
      break;
  }
}

const calc = document.querySelector('#calc');
calc.addEventListener('pointerdown', (ev)=>{
  if(ev.target.classList.contains('btn')){
    ev.target.classList.add('press__btn');
    let currentPress = ev.target;
    window.addEventListener('pointerup',(ev)=>{
      if(ev.target.classList.contains('btn'))
      ev.target.classList.remove('press__btn');
      if(currentPress != ev.target) 
      currentPress.classList.remove('press__btn');
    })
  }
});
calc.addEventListener('click', writeNumber);
const display = document.querySelector('#display');
calc.addEventListener('click', operationNum);


