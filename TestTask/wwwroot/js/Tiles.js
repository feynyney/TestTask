const rowTemplate = `<div class="tiles-row" id="tiles-row"></div>`;
const elementTemplate = `<div class="tiles-element" id="tiles-element"></div>`;
const validationTemplate = `<p id="validation-text"></p>`;

var tiles = [];
let heightValue;
let widthValue;
let minSize = 2;
let maxSize = 30;

var validationElement = $(validationTemplate);
var result = $('#result-count-text');

function submitData() {
    tiles = []; // Clearing an array
    result.text("");
    heightInput = document.getElementById("height-input").value;
    widthInput = document.getElementById("width-input").value;

    heightValue = parseInt(heightInput);
    widthValue = parseInt(widthInput);

    $("#validation-text").remove();

    //if entered values are integers
    if (!isNaN(heightValue) && !isNaN(widthValue)) {
        if (heightValue < minSize || heightValue > maxSize || widthValue < minSize || widthValue > maxSize) {
            validationElement
                .text("Matrix size must be between 2x2 and 30x30!");
            $("#results-container").append(validationElement);
            result.text("");
        }
        else {
            // Checking if entered values are ok
            console.log("Entered value is an integer OK ");
        }
    }
    else {
        // Entered value is not an integer
        validationElement
            .text("Entered value must be an integer!");
        $("#results-container").append(validationElement);
        result.text("");
    }
    fillEmptyMatrix(tiles);
    renderLayout(tiles);
}


function updateField() {
    var tilesArray = [];

    for (var i = 0; i < tiles.length; i++) {
        tilesArray.push(tiles[i].slice()); // Copy array
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
            result.text("Result: " + response.countParts);
        },
        error: function (xhr, status, error) {
            console.error('Error when sending array:', error);
        }
    });
}

function fillEmptyMatrix(tilesArray) {
    if (heightInput >= minSize && widthValue >= minSize && heightInput <= maxSize && widthValue <= maxSize) {
        for (var i = 0; i < heightValue; i++) {
            tilesArray[i] = [];
            for (var j = 0; j < widthValue; j++) {
                tilesArray[i][j] = 0;
            }
        }
    }
    else {
        console.log("error!");
    }
}

function renderLayout(tilesArray) {
    // delete previous field
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
    // Events for clicking on fields
    $("#tiles-container").on("click", ".tiles-element", toggleDisabledTile);
});

function toggleDisabledTile() {
    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));

    if ($(this).hasClass("disabled-tile")) {
        $(this).removeClass("disabled-tile");
        tiles[row][col] = 0; // Update array values
    } else {
        $(this).addClass("disabled-tile");
        tiles[row][col] = 1; // Update array values
    }
    updateField();
}
