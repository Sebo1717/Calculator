(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const myObject = {};
  myObject.num0 = $('[id="0"]'); // => document.getElementById("0")
  myObject.num1 = $('[id="1"]');
  myObject.num2 = $('[id="2"]');
  myObject.num3 = $('[id="3"]');
  myObject.num4 = $('[id="4"]');
  myObject.num5 = $('[id="5"]');
  myObject.num6 = $('[id="6"]');
  myObject.num7 = $('[id="7"]');
  myObject.num8 = $('[id="8"]');
  myObject.num9 = $('[id="9"]');
  myObject.addition = $('[id="+"]');
  myObject.subtraction = $('[id="-"]');
  myObject.multiplication = $('[id="x"]');
  myObject.division = $('[id="÷"]');
  myObject.equal = $('[id="="]');
  myObject.clear = $('[id="AC"]');
  myObject.calculation = $('#calculation');
  myObject.output = $('#output');
  myObject.historyContainer = $('#history');
  myObject.historyIcon = $('#icon');
  myObject.historyInner = $('#historyinner');
  myObject.history = [];
  myObject.historyIndex = null;

  const init = () => {
    addButtonEventListeners();
    document.body.addEventListener('keydown', keyHandler);
  };

  const addButtonEventListeners = () => {
    const numbers = [
      myObject.num0,
      myObject.num1,
      myObject.num2,
      myObject.num3,
      myObject.num4,
      myObject.num5,
      myObject.num6,
      myObject.num7,
      myObject.num8,
      myObject.num9,
    ];

    numbers.forEach((num) => {
      num.addEventListener('click', () => {
        myObject.output.innerHTML += num.textContent;
      });
    });

    myObject.addition.addEventListener('click', () => {
      myObject.output.innerHTML += '+';
    });

    myObject.subtraction.addEventListener('click', () => {
      myObject.output.innerHTML += '-';
    });

    myObject.multiplication.addEventListener('click', () => {
      myObject.output.innerHTML += '*';
    });

    myObject.division.addEventListener('click', () => {
      myObject.output.innerHTML += '/';
    });

    myObject.equal.addEventListener('click', calculate);

    myObject.clear.addEventListener('click', () => {
      myObject.output.innerHTML = '';
      myObject.calculation.innerHTML = '';
    });

    myObject.historyIcon.addEventListener('click', () => showHistory())
    document.addEventListener('click', e => {
      if (
        e.target !== myObject.historyContainer &&
        e.target !== myObject.historyIcon
      ) {
        myObject.historyIcon.style.color = 'rgb(112, 112, 112)'
        myObject.historyContainer.style.display = 'none'
      }
    })
  };

  const calculate = () => {
    let a = myObject.output.innerHTML;
    myObject.history.push(a)

    const expression = myObject.output.innerHTML;
    myObject.calculation.innerHTML = expression + ' ='; // nicht wichtig für die Rechnung
    // const result = eval(expression); // Sicherheitsrisiko
    const result = new Function('return ' + expression)(); // hier wird gerechnet
    myObject.output.innerHTML = result;

    let b = myObject.output.innerHTML;
    myObject.history.push(b)
    myObject.historyIndex = myObject.history.length - 1
    historyAdd(a, b, myObject.historyIndex - 1, myObject.historyIndex)
  };

  const keyHandler = event => {
    if (event.key === '0') myObject.output.innerHTML += '0'
    if (event.key === '1') myObject.output.innerHTML += '1'
    if (event.key === '2') myObject.output.innerHTML += '2'
    if (event.key === '3') myObject.output.innerHTML += '3'
    if (event.key === '4') myObject.output.innerHTML += '4'
    if (event.key === '5') myObject.output.innerHTML += '5'
    if (event.key === '6') myObject.output.innerHTML += '6'
    if (event.key === '7') myObject.output.innerHTML += '7'
    if (event.key === '8') myObject.output.innerHTML += '8'
    if (event.key === '9') myObject.output.innerHTML += '9'
    if (event.key === '+') myObject.output.innerHTML += '+'
    if (event.key === '-') myObject.output.innerHTML += '-'
    if (event.key === '*') myObject.output.innerHTML += '*'
    if (event.key === '/') myObject.output.innerHTML += '/'
    if (event.key === 'Enter') calculate()
    if (event.key === 'Escape') {
      myObject.calculation.innerHTML = ''
      myObject.output.innerHTML = ''
    }
    if (event.key === 'Backspace') myObject.output.innerHTML = myObject.output.innerHTML.substr(0, (myObject.output.innerHTML.length - 1))
    if (event.key === 'ArrowUp') {
      myObject.output.innerHTML = myObject.history[myObject.historyIndex - 1] ?? ''
      myObject.calculation.innerHTML = myObject.history[myObject.historyIndex - 2] ?? ''
      myObject.historyIndex === -1 ? null : myObject.historyIndex--
    }
    if (event.key === 'ArrowDown') {
      myObject.output.innerHTML = myObject.history[myObject.historyIndex + 1] ?? ''
      myObject.calculation.innerHTML = myObject.history[myObject.historyIndex] ?? ''
      myObject.historyIndex === myObject.history.length ? null : myObject.historyIndex++
    }
  }

  const showHistory = () => {
    if (myObject.historyInner.innerHTML.replace(/\s/g, '') != '') {
      myObject.historyIcon.style.color = 'dodgerblue'
      myObject.historyContainer.style.display = 'block'
    }
  }

  const historyClickHandler = index => {
    if (index % 2 == 0) {
      myObject.output.innerHTML = myObject.history[index] ?? ''
      myObject.calculation.innerHTML = ''
    } else {
      myObject.output.innerHTML = myObject.history[index] ?? ''
      myObject.calculation.innerHTML = myObject.history[index - 1] + ' =' ?? ''
    }
    myObject.historyIndex = index
  };

  const historyAdd = (a, b, indexA, indexB) => {
    myObject.historyInner.innerHTML += `<div class="historyitm" id="historyitm">
      <div class="historyBtn" data-index="${indexA}">
        ${a}
      </div>
      <span>=</span>
      <div class="historyBtn" data-index="${indexB}">
        ${b}
      </div>
    </div>`;
    attachHistoryEventListeners();
  };

  const attachHistoryEventListeners = () => {
    const historyItems = document.querySelectorAll('.historyBtn');
    historyItems.forEach((item) => {
      item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-index'), 10);
        historyClickHandler(index);
      });
    });
  };

  init();
})();
