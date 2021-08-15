$( document ).ready(function() {
    // bind template html
    $("#normal").html($("#nonDesignTemplate").html());
    $("#design").html($("#designTemplate").html());

    // bind auto complete 
    $.getJSON('data/namelist.json', function(data) {
        // console.log("namelist", data);
        // JSON result in `data` variable
        $( "#normal #category, #design .materialUsed" ).autocomplete({
            source: data,
        });
    });

    //form submit handling
    $('.normalSubmitBtn').on('click', function(e){
        $.post( 
            '/submit_normal_form', 
            $('.form_normal').serializeArray() , 
            function( res ) {
                if(res) {
                    $("#resultTextarea").html(res.data);
                    $("#result-tab").click();
                }
                else {
                    alert("empty response");
                }
            },
        "json");
    });
  
});

function emptyRow(btnElm){
    $(btnElm).parent().parent().find('input').val('');
}

function copyToBoard(){
    /* Get the text field */
    var copyText = document.getElementById("resultTextarea");
    copyText.focus();
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied!" );
    console.log("Copied!", copyText);
}


// function addNewRow() {
//     var $html = 
//     '<tr>'
//         +'<th scope="row">{{rowNumber}}</th>'
//         +'<td><input type="text" class="form-control tableInputText"></td>'
//         +'<td><input type="text" class="form-control tableInputText"></td>'
//         +'<td><input type="text" class="form-control tableInputText"></td>'
//         +'<td><button type="button" id="addRowBtn" class="btn btn-light" onclick="removeRow(this);"> - </button></td>'
//     +'</tr>';
//     var $lastRowNum = $("table tbody tr:last-child th").text();    
//     if ($lastRowNum == ""){
//         $lastRowNum = 1;
//     } else {
//         $lastRowNum = parseInt($lastRowNum) + 1;
//     }
//     $html = $html.replaceAll('{{rowNumber}}', $lastRowNum);
//     $("table tbody").append($html);
// }

// function removeRow($rowBtn){
//     if ($rowBtn) {
//         $($rowBtn).parents("tr").remove();
//     }
// }
