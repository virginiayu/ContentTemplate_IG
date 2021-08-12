$( document ).ready(function() {
    $.getJSON('data/namelist.json', function(data) {
        // JSON result in `data` variable
        $( "#category" ).autocomplete({
            source: data,
        });
    });

    $("#home").html($("#nonDesignTemplate").html());
    $("#design").html($("#designTemplate").html());

});

function addNewRow() {
    var $html = 
    '<tr>'
        +'<th scope="row">{{rowNumber}}</th>'
        +'<td><input type="text" class="form-control tableInputText"></td>'
        +'<td><input type="text" class="form-control tableInputText"></td>'
        +'<td><input type="text" class="form-control tableInputText"></td>'
        +'<td><button type="button" id="addRowBtn" class="btn btn-light" onclick="removeRow(this);"> - </button></td>'
    +'</tr>';
    var $lastRowNum = $("table tbody tr:last-child th").text();    
    if ($lastRowNum == ""){
        $lastRowNum = 1;
    } else {
        $lastRowNum = parseInt($lastRowNum) + 1;
    }
    $html = $html.replaceAll('{{rowNumber}}', $lastRowNum);
    $("table tbody").append($html);
}

function removeRow($rowBtn){
    if ($rowBtn) {
        $($rowBtn).parents("tr").remove();
    }
}

function emptyRow(btnElm){
    $(btnElm).parent().parent().find('input').val('');
}

function copyToBoard(){
    /* Get the text field */
    var $copyText = document.getElementById("resultBox");
    /* Select the text field */
    $copyText.select();
    $copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied!" );
    console.log("Copied!", $copyText);
}
