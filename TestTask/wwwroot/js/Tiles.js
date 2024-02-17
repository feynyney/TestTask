const rowTemplate = `<div class="tiles-row" id="tiles-row"></div>`
const elementTemplate = `<div class="tiles-element" id="tiles-element"></div>`

var tiles = [];

var heightInput;
var widthInput;

function submitData() {
    tiles = []; // Очищаємо масив

    heightInput = document.getElementById("height-input").value;
    widthInput = document.getElementById("width-input").value;
    console.log(heightInput, widthInput);

    fillEmptyMatrix(tiles);
    console.log(tiles);
    renderLayout(tiles);
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
розміром гравця, 
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
