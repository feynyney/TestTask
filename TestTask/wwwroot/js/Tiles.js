const rowTemplate = `<div class="tiles-row" id="tiles-row"></div>`
const elementTemplate = `<div class="tiles-element" id="tiles-element"></div>`
const validationTemplate = `<p id="validation-text"></p>`

var tiles = [];

let heightValue;
let widthValue;

function submitData() {
    tiles = []; // Очищаємо масив

    heightInput = document.getElementById("height-input").value;
    widthInput = document.getElementById("width-input").value;

    heightValue = parseInt(heightInput);
    widthValue = parseInt(widthInput);

    if (!isNaN(heightValue) && !isNaN(widthValue)) {
        // Введене значення є цілим числом
        console.log("Введене значення є цілим числом: ");
        $("#validation-text").remove();

    } else {

        var validationElement = $(validationTemplate)
            .text("Введене значення не є цілим числом. Будь ласка, введіть ціле число.");
        $("#results-container").append(validationElement);
        // Введене значення не може бути перетворене в ціле число
    }
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
            document.getElementById('result-count-text').innerText = "Result: " + response.countParts;
        },
        error: function (xhr, status, error) {
            console.error('Error when sending array:', error);
        }
    });
}

function fillEmptyMatrix(tilesArray)
{
    if (heightInput > 1 && widthValue > 1) {
        for (var i = 0; i < heightValue; i++) {
            tilesArray[i] = [];
            for (var j = 0; j < widthValue; j++) {
                tilesArray[i][j] = 0;
            }
        }
    }
    else
    {
        console.log("Matrix cannot be less then 2x2!");
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




