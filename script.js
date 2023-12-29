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
  
      const table = createEditableTable(rowCount);
      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.textContent = "Зберегти в localStorage";
      saveButton.addEventListener("click", function () {
        saveTableData(blockId, table);
      });
  
      const block = document.querySelector(`.${blockId}`);
      block.innerHTML = "";
      block.appendChild(table);
      block.appendChild(saveButton);
  
      form.remove();
    };
  
    function createEditableTable(rowCount) {
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
        cell.setAttribute("contenteditable", "true");
  
        row.appendChild(cell);
        table.appendChild(row);
      }
  
      return table;
    }
  
    function saveTableData(blockId, table) {
      const rows = table.querySelectorAll("tr");
      const rowData = [];
  
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const cellData = [];
  
        cells.forEach((cell) => {
          cellData.push(cell.textContent);
        });
  
        rowData.push(cellData);
      });
  
      const tableData = {
        rowCount: rowData.length,
        data: rowData,
      };
  
      localStorage.setItem(`${blockId}TableData`, JSON.stringify(tableData));
    }
  
    function checkLocalStorage() {
      const blockIds = ["header-main", "main-left", "main-right-bottom-left", "main-right-bottom-right", "footer-main"];
  
      blockIds.forEach((blockId) => {
        const storedData = localStorage.getItem(`${blockId}TableData`);
        if (storedData) {
          const tableData = JSON.parse(storedData);
          createTableWithStoredData(blockId, tableData.rowCount, tableData.data);
        }
      });
    }
  
    function createTableWithStoredData(blockId, rowCount, data) {
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
        cell.textContent = data[i] ? data[i].join(" | ") : `Рядок ${i + 1}`;
        cell.style.padding = "12px";
        cell.style.textAlign = "left";
  
        row.appendChild(cell);
        table.appendChild(row);
      }
  
      const clearLocalStorageButton = document.createElement("button");
      clearLocalStorageButton.type = "button";
      clearLocalStorageButton.textContent = "Очистити localStorage";
      clearLocalStorageButton.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
      });
  
      const block = document.querySelector(`.${blockId}`);
      block.innerHTML = "";
      block.appendChild(table);
      block.appendChild(clearLocalStorageButton);
    }
  
    checkLocalStorage();
  });
  