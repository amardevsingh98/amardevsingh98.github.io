const obj = {
    firstNumber : 0,
    secondNumber : 0,
    displayNumber : '0',
    operator : false,
    fullstop : false,
    persen : false
}

let button = document.getElementsByClassName("box");
let number = document.getElementById('displayNumber')
let displayBox = document.getElementById('display-number')
let variabel = 10;
let fontSize = 30;
function updateDisplay() {
    let width = number['style']['width']
    if(obj['displayNumber'].length > variabel) {
        variabel*= 1.7;
        number['style']['font-size'] = `${fontSize}px`
        fontSize -= 2
        // console.log(number['style']['font-size']);
        // console.log(number['style']['width']);
    }


    // console.log(width)
    // if (width > displayBox['style']['width']) {
    //     number['style']['font-size'] = '30px';
    //     console.log('kenaa')
    // }
    
    number.innerHTML = obj['displayNumber'];
}

function clear () {
    obj['firstNumber'] = 0;
    obj['secondNumber'] = 0;
    obj['displayNumber'] = '0';

    number.innerHTML = obj['displayNumber']
}

function display(text) {
    if (obj['displayNumber'] === '0' && text === '00') {
        obj['displayNumber'] = '0';
    } else if (obj['displayNumber'] === '0' && text === '.') {
        obj['displayNumber'] += text;
    } else if (obj['displayNumber'] === '0' && text === '0') {
        obj['displayNumber'] = text;
    } else if (obj['displayNumber'] === '0') {
        obj['displayNumber'] = text;
    } else if (obj['displayNumber'] !== '0') {
        let character = obj['displayNumber'];
        if (text !== '.') {
            character += text;
        } else if (text === '.' && character[character.length - 1] !== '.') {
            character += text
        }
        obj['displayNumber'] = character;
    } 
}

function backspace() {
    let penampung = '';
    if (obj['displayNumber'].length === 1) {
        obj['displayNumber'] = '0';
        number.innerHTML = obj['displayNumber']
        return number.innerHTML;
    }
    for(let i = 0; i < obj['displayNumber'].length - 1; i++) {
        penampung += obj['displayNumber'][i];
    }

    obj['displayNumber'] = penampung;
}

function percentage () {
    if (obj['displayNumber'] === '0') {
        alert('Tetapkan Value Number Terlebih Dahulu')
    } else {
        let penampung = '';
        for (let i = 0; i < obj['displayNumber'].length; i++) {
            if (i === obj['displayNumber'].length - 1 && obj['displayNumber'][i] === '%') {
                
            } else {
                penampung += obj['displayNumber'][i];
            }
        }

        obj['displayNumber'] = penampung;
    }
}


function calculation () {
    let penampung = '';
    
    for (let i = 0; i < obj['displayNumber'].length; i++) {
        if (obj['displayNumber'][i] === 'x') {
            penampung += '*'
        } else if (obj['displayNumber'][i] === '%') {
            penampung += '/100'
        } else if (obj['displayNumber'][i] === '÷') {
            penampung += '/'
        } else {
            penampung += obj['displayNumber'][i];
        }
    }

    console.log(penampung)
    let result = eval(penampung)
    obj['displayNumber'] = result;
}


for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click',function(event){
        let target = event.target

        if (target.classList.contains('clear')) {
            clear();
            updateDisplay();
            return;
        }

        if (target.classList.contains('backspace')) {
            backspace();
            updateDisplay()
            return;
        }


        if (target.classList.contains('percentage') && obj['displayNumber'] === '0') {
            percentage();
            return;
        } else if (target.classList.contains('percentage') && obj['displayNumber'] !== '0') {
            percentage();
            obj['persen'] = true;
            updateDisplay()
        }


        if (target.classList.contains('operator') && obj['displayNumber'] === '0' )  {
            return;
        }

        if (target.classList.contains('equal')) {
            calculation();
            updateDisplay();
            return;
        }

        display(target.innerText);
        updateDisplay();
    })

}

