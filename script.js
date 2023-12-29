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
    var inputNumbers = document.querySelectorAll('.main-right-bottom-left input');

    var numbers = [];
    inputNumbers.forEach(function (input) {
        numbers.push(parseFloat(input.value));
    });

    var minValue = Math.min.apply(null, numbers);
    var maxValue = Math.max.apply(null, numbers);

    document.cookie = 'minValue=' + minValue;
    document.cookie = 'maxValue=' + maxValue;

    window.addEventListener('beforeunload', function () {
        var savedData = 'Мінімальне число: ' + minValue + ', Максимальне число: ' + maxValue;
        if (confirm(savedData + '\nЗберегти дані?')) {
            alert('Дані збережено в cookies. Перезавантажте сторінку.');
        } else {
            document.cookie = 'minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    function calculateMinMax() {
        var inputElement = document.getElementById('numberInput');
        var inputValues = inputElement.value.split(' ').map(function (value) {
            return parseFloat(value);
        });

        var minValue = Math.min.apply(null, inputValues);
        var maxValue = Math.max.apply(null, inputValues);

        var resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Мінімальне число: ' + minValue + '<br>Максимальне число: ' + maxValue;
    }

    window.calculateMinMax = calculateMinMax;
});

document.addEventListener('DOMContentLoaded', function () {
    function calculateMinMax() {
        var inputElement = document.getElementById('numberInput');
        var inputValues = inputElement.value.split(' ').map(function (value) {
            return parseFloat(value);
        });

        var minValue = Math.min.apply(null, inputValues);
        var maxValue = Math.max.apply(null, inputValues);

        document.cookie = 'minValue=' + minValue;
        document.cookie = 'maxValue=' + maxValue;

        alert('Мінімальне число: ' + minValue + '\nМаксимальне число: ' + maxValue);

        var savedData = getCookie('minValue') + ', ' + getCookie('maxValue');
        if (savedData) {
            if (confirm(savedData + '\nЗберегти дані?')) {
                alert('Дані збережено в cookies. Перезавантажте сторінку.');
            } else {
                document.cookie = 'minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
        }
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    window.calculateMinMax = calculateMinMax;

    var savedData = getCookie('minValue') + ', ' + getCookie('maxValue');
    if (savedData) {
        if (confirm(savedData + '\nЗберегти дані?')) {
            alert('Дані збережено в cookies. Перезавантажте сторінку.');
        } else {
            document.cookie = 'minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }
});

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
document.addEventListener('DOMContentLoaded', function () {
    var imageBlocks = document.querySelectorAll('body img');

    imageBlocks.forEach(function (imageBlock) {
        var formCreated = false;
        var form;
        var table;

        imageBlock.addEventListener('mouseenter', function () {
            if (!formCreated) {
                form = document.createElement('form');
                form.innerHTML = '<label for="rowCount">Введіть кількість рядків для таблиці:</label>' +
                    '<input type="number" id="rowCount" name="rowCount" min="1" required>' +
                    '<input type="submit" value="Створити таблицю">';

                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    createTable(imageBlock.parentNode, event.target.rowCount.value);
                    formCreated = true;
                    form.remove();
                    addSaveButton();
                });

                imageBlock.parentNode.appendChild(form);
                formCreated = true;
            }
        });

        function createTable(container, rowCount) {
            if (!isNaN(rowCount) && rowCount > 0) {
                table = document.createElement('table');
                table.style.borderCollapse = 'collapse';
                table.setAttribute('contenteditable', 'true');

                for (var i = 0; i < rowCount; i++) {
                    var row = table.insertRow();
                    var cell = row.insertCell(0);
                    cell.textContent = 'Рядок ' + (i + 1);
                    cell.style.border = '1px solid #ddd';
                    cell.style.padding = '8px';
                    cell.style.backgroundColor = '#f2f2f2';
                }

                var headerRow = table.insertRow(0);
                var headerCell = headerRow.insertCell(0);
                headerCell.textContent = 'Заголовок';
                headerCell.style.border = '1px solid #ddd';
                headerCell.style.padding = '8px';
                headerCell.style.backgroundColor = '#4CAF50';
                headerCell.style.color = 'white';

                imageBlock.parentNode.insertBefore(table, form.nextSibling);
            } else {
                alert('Введіть коректне число більше 0.');
            }
        }

        function addSaveButton() {
            var saveButton = document.createElement('button');
            saveButton.textContent = 'Save to localStorage';
            saveButton.addEventListener('click', function () {
                var tableData = {
                    rowCount: table.rows.length - 1,
                    content: table.outerHTML
                };
                localStorage.setItem('tableData', JSON.stringify(tableData));

                imageBlock.parentNode.innerHTML = table.outerHTML;
            });

            imageBlock.parentNode.appendChild(saveButton);
        }

    });
});