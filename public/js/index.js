$( document ).ready(function() {
    // bind template html
    $("#normal").html($("#nonDesignTemplate").html());
    $("#design").html($("#designTemplate").html());

    bindAutoComplete();

    //form submit handling
    $('.normalSubmitBtn').on('click', function(e){
        $.post( 
            '/submit_normal_form', 
            $('.form_normal').serializeArray(), 
            function(res){
                ajaxSuccess(res);
            },
        "json");
    });
    $('.designSubmitBtn').on('click', function(e){
        $.post( 
            '/submit_design_form', 
            $('.form_design').serializeArray(), 
            function(res){
                ajaxSuccess(res);
            },
        "json");
    });
  
});

function ajaxSuccess (res){
    if(res) {
        $("#resultTextarea").html(res.data);
        $("#result-tab").click();
    }
    else {
        // $("#resultTextarea").html("");
        alert("empty response");
    }
}

function bindAutoComplete(){
    // bind auto complete 
    $.getJSON('/namelist', function(data) {
    // $.getJSON('data/namelist.json', function(data) {
        // JSON result in `data` variable
        $( "#normal #name, #design .materialUsed" ).autocomplete({
            source: data,
        });
    });
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


function addRow(btnElm) {
    var btnHtml = '<button type="button"  class="btn btn-outline-secondary cleanRowBtn" onclick="removeRow(this);"> - </button>';
    var formElm = $(btnElm).parents('form');
    var firstRow = $(formElm).find('tbody tr:first').clone();
    var rowNum = formElm.find('tbody tr:last td:first').html() ;
    rowNum = isNaN(parseInt(rowNum)) ? 0 : parseInt(rowNum);

    $(firstRow).find("input").val('');
    firstRow.children("td:last").html(btnHtml);
    firstRow.children('td:first').html(rowNum+1);

    var html = firstRow[0].outerHTML;
    html = html.replaceAll('items[0]', 'items['+rowNum+']');
    formElm.find("tbody").append(html);

    bindAutoComplete();
}

function removeRow(rowBtn){
    if (rowBtn) {
        $(rowBtn).parents("tr").remove();
    }
}

// function emptyRow(btnElm){
//     $(btnElm).parent().parent().find('input').val('');
// }
