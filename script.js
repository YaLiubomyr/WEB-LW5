// Обмін X та Y місцями
document.addEventListener('DOMContentLoaded', function () {
    var xElement = document.querySelector('.X');
    var yElement = document.querySelector('.Y');

    var tempHTML = xElement.innerHTML;
    xElement.innerHTML = yElement.innerHTML;
    yElement.innerHTML = tempHTML;
});

// Вивід плоці прямокутника
document.addEventListener('DOMContentLoaded', function () {
    var block4 = document.querySelector('.main-right-bottom-left');

    var length = 10;
    var width = 5;

    function calculateArea(length, width) {
        return length * width;
    }

    block4.innerHTML += 'Площа прямокутника: ' + calculateArea(length, width);
});

// Пошук мінімаксу
document.addEventListener('DOMContentLoaded', function () {
    var cookiesExist = document.cookie.indexOf('min=') !== -1 && document.cookie.indexOf('max=') !== -1;

    if (cookiesExist) {
        var min = getCookie('min');
        var max = getCookie('max');
        alert('Min: ' + min + '\nMax: ' + max);

        var saveData = confirm('Бажаєте зберегти дані у cookies?');

        if (saveData) {
            alert('Дані будуть збережені у cookies. Перезавантажте сторінку.');
        }
        else {
            document.cookie = 'min=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'max=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        }
    } else {
        document.getElementById('numbersForm').style.display = 'block';
    }
});

function calculateMinMax() {
    var input = document.getElementById('numberInput').value;
    var numbers = input.split(' ').map(Number);

    if (numbers.length > 0) {
        var min = Math.min(...numbers);
        var max = Math.max(...numbers);

        alert('Min: ' + min + '\nMax: ' + max);

        document.cookie = 'min=' + min + '; path=/;';
        document.cookie = 'max=' + max + '; path=/;';

        document.getElementById('numbersForm').style.display = 'none';
    } else {
        alert('Будь ласка, введіть числа у поле.');
    }
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}


// Встановлення жирності
document.addEventListener('DOMContentLoaded', function () {
    var boldCheckbox = document.getElementById('boldCheckbox');
    var mainRightBottomRight = document.querySelector('.main-right-bottom-right');

    function setBoldText() {
        var isBold = boldCheckbox.checked;

        var textElements = mainRightBottomRight.querySelectorAll('*:not(form)');
        textElements.forEach(function (element) {
            element.style.fontWeight = isBold ? 'bold' : 'normal';
        });

        localStorage.setItem('boldText', isBold);
    }

    function checkBoldText() {
        var isBold = localStorage.getItem('boldText') === 'true';
        var textElements = mainRightBottomRight.querySelectorAll('*:not(form)');

        textElements.forEach(function (element) {
            element.style.fontWeight = isBold ? 'bold' : 'normal';
        });

        boldCheckbox.checked = isBold;
    }

    boldCheckbox.addEventListener('change', setBoldText);
    checkBoldText();
});

// Створення таблиці
document.addEventListener("DOMContentLoaded", function () {
    const formShown = {};
  
    addEventListenerToBlock("header-main");
    addEventListenerToBlock("main-left");
    addEventListenerToBlock("main-right-bottom-left");
    addEventListenerToBlock("main-right-bottom-right");
    addEventListenerToBlock("footer-main");
  
    function addEventListenerToBlock(blockId) {
      const block = document.querySelector(`.${blockId}`);
      const img = block.querySelector("img");
  
      img.addEventListener("mouseover", function () {
        if (!formShown[blockId]) {
          createTableForm(blockId);
          formShown[blockId] = true;
        }
      });
    }
  
    function createTableForm(blockId) {
      const form = document.createElement("form");
      form.id = "tableForm";
      form.innerHTML = `
        <label for="rowCountInput">Кількість рядків:</label>
        <input type="number" id="rowCountInput" name="rowCountInput" required>
        <button type="button" onclick="createTable('${blockId}')">Створити таблицю</button>
      `;
  
      const block = document.querySelector(`.${blockId}`);
      block.appendChild(form);
    }
  
    window.createTable = function (blockId) {
      const form = document.getElementById("tableForm");
      const rowCountInput = form.querySelector("#rowCountInput");
      const rowCount = parseInt(rowCountInput.value);
  
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginBottom = "20px";
      table.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      table.style.borderRadius = "8px";
      table.style.overflow = "hidden";
  
      for (let i = 0; i < rowCount; i++) {
        const row = document.createElement("tr");
        row.style.border = "1px solid #ddd";
  
        const cell = document.createElement("td");
        cell.textContent = `Рядок ${i + 1}`;
        cell.style.padding = "12px";
        cell.style.textAlign = "left";
  
        row.appendChild(cell);
        table.appendChild(row);
      }
  
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.textContent = "Редагувати таблицю";
      editButton.addEventListener("click", function () {
        enableTableEditing(table);
        editButton.disabled = true;
        saveButton.disabled = false;
      });
      editButton.style.marginTop = "10px";
      editButton.style.padding = "10px 20px";
      editButton.style.backgroundColor = "#2196F3";
      editButton.style.color = "white";
      editButton.style.border = "none";
      editButton.style.borderRadius = "4px";
      editButton.style.cursor = "pointer";
      editButton.style.fontSize = "16px";
      editButton.style.transition = "background-color 0.3s";
  
      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.textContent = "Зберегти таблицю";
      saveButton.addEventListener("click", function () {
        disableTableEditing(table);
        saveButton.disabled = true;
        editButton.disabled = false;
        clearLocalStorageButton.disabled = false;
      });
      saveButton.style.marginTop = "10px";
      saveButton.style.padding = "10px 20px";
      saveButton.style.backgroundColor = "#4CAF50";
      saveButton.style.color = "white";
      saveButton.style.border = "none";
      saveButton.style.borderRadius = "4px";
      saveButton.style.cursor = "pointer";
      saveButton.style.fontSize = "16px";
      saveButton.style.transition = "background-color 0.3s";
      saveButton.disabled = true;
  
      const clearLocalStorageButton = document.createElement("button");
      clearLocalStorageButton.type = "button";
      clearLocalStorageButton.textContent = "Очистити localStorage";
      clearLocalStorageButton.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
      });
      clearLocalStorageButton.style.marginTop = "10px";
      clearLocalStorageButton.style.padding = "10px 20px";
      clearLocalStorageButton.style.backgroundColor = "#FF0000";
      clearLocalStorageButton.style.color = "white";
      clearLocalStorageButton.style.border = "none";
      clearLocalStorageButton.style.borderRadius = "4px";
      clearLocalStorageButton.style.cursor = "pointer";
      clearLocalStorageButton.style.fontSize = "16px";
      clearLocalStorageButton.style.transition = "background-color 0.3s";
  
      const block = document.querySelector(`.${blockId}`);
      block.innerHTML = "";
      block.appendChild(table);
      block.appendChild(editButton);
      block.appendChild(saveButton);
      block.appendChild(clearLocalStorageButton);
  
      const thCells = table.querySelectorAll("th, td");
      thCells.forEach((cell) => {
        cell.style.border = "1px solid #ddd";
        cell.style.padding = "12px";
        cell.style.textAlign = "left";
      });
  
      const thElements = table.querySelectorAll("th");
      thElements.forEach((th) => {
        th.style.backgroundColor = "#f2f2f2";
      });
  
      form.remove();
    };
  
    function enableTableEditing(table) {
      table.setAttribute("contenteditable", "true");
      const cells = table.querySelectorAll("td");
      cells.forEach((cell) => {
        cell.setAttribute("contenteditable", "true");
      });
    }
  
    function disableTableEditing(table) {
      table.setAttribute("contenteditable", "false");
      const cells = table.querySelectorAll("td");
      cells.forEach((cell) => {
        cell.setAttribute("contenteditable", "false");
      });
    }
  });
  