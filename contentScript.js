const buttons = ['SHOW', 'HIDE', 'CLEAR ROOM', 'DELETE ESTIMATES'];

const id = setInterval(function() {
  const body = document.querySelector('body');
  if (body && body.querySelector('tbody')) {
    renderRow();

    renderAverage();

    const tbody = body.querySelector('tbody');
    tbody.addEventListener('DOMCharacterDataModified', (e) => {
      setTimeout(() => { renderAverage() }, 100);
    });

    clearInterval(id);
  }
}, 500)

function calcAverage() {
  let values = [];
  document.querySelectorAll('.cdk-cell.cdk-column-storyPoints')
    .forEach(cell => {
      if (cell.textContent
        && cell.textContent !== "  "
        && cell.textContent !== " ? ") {
        values.push(+cell.textContent);
      }
    });

  const value = values.reduce((acc, value) => value + acc, 0)
  console.log(values)
  if (value) {
    return (value / values.length).toFixed(2);
  }

  return value.toFixed(2);
}

function renderAverage() {
  document.getElementById('average').textContent = getAverageValue();
}

function renderRow() {
  const body = document.querySelector('body');
  const el = document.createElement('tr');
  el.classList.add('mat-row');
  el.innerHTML = `
    <td class="mat-cell">Average</td>
    <td id="average" class="mat-cell"></td>
  `
  body.querySelector('tbody').appendChild(el);
}

function getAverageValue() {
  const values = Array.from(
    document.querySelectorAll('.cdk-cell.cdk-column-storyPoints, .cdk-cell.cdk-column-storyPointsOnHide')
  );

  if (!values.length) {
    return '-'
  };

  let value = values.find((cell) => {
    const content = cell.textContent.trim();
    return content === 'X'
      || content === '-'
      ||isNumeric(content);
  });

  if (value) {
    value = value.textContent.trim();
  }

  if (isNumeric(value)) {
    return calcAverage();
  }

  if (value) {
    return value;
  }

  return '0.00';
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}
