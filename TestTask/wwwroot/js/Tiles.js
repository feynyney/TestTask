const rowTemplate = `<div class="tiles-row"></div>`
const elementTemplate = `<div class="tiles-element"></div>`

var tiles = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];

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

function renderLayout(tilesArray)
{
    for (var i = 0; i < tilesArray.length; i++)
    {
        var newRow = $(rowTemplate);

        for (var j = 0; j < tilesArray[0].length; j++)
        {
            var newElement = $(elementTemplate);
            if (tilesArray[i][j] == 1)
            {
                newElement.addClass("disabled-tile");
            }

            newElement.attr("row", i);
            newElement.attr("col", j);
            newRow.append(newElement);
        }

        $("#tiles-container").append(newRow);
    }
}

renderLayout(tiles);