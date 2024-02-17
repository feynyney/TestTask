const rowTemplate = `<div class="tiles-row" id="tiles-row"></div>`
const elementTemplate = `<div class="tiles-element" id="tiles-element"></div>`

var tiles = [];

var heightInput;
var widthInput;

function submitData() {
    tiles = []; // Очищаємо масив

    heightInput = document.getElementById("height-input").value;
    widthInput = document.getElementById("width-input").value;

    fillEmptyMatrix(tiles);
    renderLayout(tiles);
}


function updateField() {
    var tilesArray = [];

    for (var i = 0; i < tiles.length; i++) {
        tilesArray.push(tiles[i].slice()); // Створюємо копію вкладеного масиву
    }

    var jsonData = JSON.stringify({ tiles: tilesArray });
    console.log('Sending data: ', jsonData);

    $.ajax({
        url: 'https://localhost:7020/api/Tiles/UpdateField',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        success: function (response) {
            console.log('Array sent successfully');
            console.log('Server response:', response);
            document.getElementById('response-text').innerText = response.countParts;
        },
        error: function (xhr, status, error) {
            console.error('Error when sending array:', error);
        }
    });
}





/*почитати w3school jQuery
створити onclick funcion  
1- замальовувати натиснуту клітинку
2- витягувати стан поля на клієнті 
3- відправляти стан поля на контролер
4- перемальовувати поле по респонсу(завдання з *
не перемальовувати усі поле, 
а лише клітинки що відрізняться)
5- логіка для кнопки submit - створити поле за 
розміром гравця DONE, 
пустий з 0 рендерити - відправляєм на сервер
*/

function fillEmptyMatrix(tilesArray)
{
    for (var i = 0; i < heightInput; i++)
    {
        tilesArray[i] = [];
        for (var j = 0; j < widthInput; j++)
        {
            tilesArray[i][j] = 0;
            tiles[0][0] = 1; //testing whether boxes are painted black
        }
    }
}

function renderLayout(tilesArray) {
    // Видаляємо попереднє поле
    $("#tiles-container").empty();

    for (var i = 0; i < tilesArray.length; i++) {
        var newRow = $(rowTemplate);

        for (var j = 0; j < tilesArray[0].length; j++) {
            var newElement = $(elementTemplate);
            if (tilesArray[i][j] == 1) {
                newElement.addClass("disabled-tile");
            }

            newElement.attr("row", i);
            newElement.attr("col", j);
            newRow.append(newElement);
        }

        $("#tiles-container").append(newRow);
    }
}

$(document).ready(function () {
    // Додаємо обробник подій для батьківського елемента, але обробляємо кліки для всіх елементів з класом ".tiles-element"
    $("#tiles-container").on("click", ".tiles-element", toggleDisabledTile);
});

function toggleDisabledTile() {
    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));

    if ($(this).hasClass("disabled-tile")) {
        $(this).removeClass("disabled-tile");
        tiles[row][col] = 0; // Оновлюємо значення у масиві
    } else {
        $(this).addClass("disabled-tile");
        tiles[row][col] = 1; // Оновлюємо значення у масиві
    }
}




