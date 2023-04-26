'use strict';

const table = document.querySelector('table');
const tbodyRows = [...table.tBodies[0].rows];
const tbody = document.querySelector('tbody');

let direction = null;

const sortTableString = (cellIndex) => {
  const sortString = tbodyRows.sort((prev, current) => {
    const prevStr = prev.cells[cellIndex].textContent;
    const currentStr = current.cells[cellIndex].textContent;

    if (direction === 'desc') {
      return currentStr.localeCompare(prevStr);
    }

    return prevStr.localeCompare(currentStr);
  });

  table.tBodies[0].append(...sortString);
};

function sortTableNumber(cellNumber) {
  const sortNumber = tbodyRows.sort((prevStr, currentStr) => {
    const prevNum = toNumber(prevStr.cells[cellNumber].innerText);
    const currentNum = toNumber(currentStr.cells[cellNumber].innerText);

    if (direction === 'desc') {
      return currentNum - prevNum;
    }

    return prevNum - currentNum;
  });

  table.tBodies[0].append(...sortNumber);
}

function toNumber(string) {
  const numb = +string.replace(/\D/g, '');

  return numb;
}

table.tHead.addEventListener('click', (e) => {
  switch (true) {
    case (e.target.cellIndex === 0):
      if (direction === null) {
        sortTableString(0);
        direction = 'asc';
      } else if (direction === 'asc') {
        sortTableString(0);
        direction = 'desc';
      } else {
        sortTableString(0);
        direction = 'asc';
      }

      return;

    case (e.target.cellIndex === 1):
      if (direction === null) {
        sortTableString(10);
        direction = 'asc';
      } else if (direction === 'asc') {
        sortTableString(1);
        direction = 'desc';
      } else {
        sortTableString(1);
        direction = 'asc';
      }

      return;

    case (e.target.cellIndex === 2):
      if (direction === null) {
        sortTableString(2);
        direction = 'asc';
      } else if (direction === 'asc') {
        sortTableString(2);
        direction = 'desc';
      } else {
        sortTableString(2);
        direction = 'asc';
      }

      return;

    case (e.target.cellIndex === 3):
      if (direction === null) {
        sortTableNumber(3);
        direction = 'asc';
      } else if (direction === 'asc') {
        sortTableNumber(3);
        direction = 'desc';
      } else {
        sortTableNumber(3);
        direction = 'asc';
      }

      return;

    case (e.target.cellIndex === 4):
      if (direction === null) {
        sortTableNumber(4);
        direction = 'asc';
      } else if (direction === 'asc') {
        sortTableNumber(4);
        direction = 'desc';
      } else {
        sortTableNumber(4);
        direction = 'asc';
      }
  }
});

tbody.addEventListener('click', (e) => {
  tbodyRows.forEach(elem => {
    elem.classList = '';
  });

  e.target.parentNode.classList = 'active';
});

table.insertAdjacentHTML('afterend', `
  <form class= "new-employee-form">
    <label>
      Name: <input name="name" type="text" data-qa="name" required>
    </label>
    <label>
      Position: <input name="position" type="text" data-qa="position" required>
    </label>
    <label>Office:
      <select name="office" data-qa="office" required>
        <option selected>Tokyo</option>
        <option>Singapore</option>
        <option>London</option>
        <option>New York</option>
        <option>Edinburgh</option>
        <option>San Francisco</option>
      </select>
    </label>
    <label>
      Age: <input name="age" type="number"
      data-qa="age" min= 0 max= 100 required>
    </label>
    <label>
      Salary: <input name="salary" type="number"
        data-qa="salary" min= 0 max= 100 required>
    </label>
    <button name="button" type="submit">Save to table</button>
  </form>
`);

const form = document.querySelector('.new-employee-form');

function createNotification(titleAndClass) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="notification data-qa="notification" ${titleAndClass}">
      <span class="title">${titleAndClass}</span>
      <p>You have provided incorrect information</p>
    </div>
  `);

  const message = document.querySelector('.notification');

  setTimeout(() => {
    message.remove();
  }, 2000);
}

form.elements.button.addEventListener('click', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const f = Object.fromEntries(data.entries());

  if (f.name.length < 4 || +f.age < 18 || +f.age > 90) {
    createNotification('error');

    return;
  }

  tbody.insertAdjacentHTML('beforebegin', `
    <tr>
      <td>${f.name}</td>
      <td>${f.position}</td>
      <td>${f.office}</td>
      <td>${f.age}</td>
      <td>$${f.salary.toLocaleString('en-US')}</td>
    </tr>
  `);

  createNotification('success');
});
