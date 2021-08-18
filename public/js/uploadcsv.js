$( document ).ready(function() {
    $.get( "/get_csv_date", function( data ) {
        $( "#lastImportTime" ).html( data );
    });
   
    $("#form_upload").submit(function(e) {
        $.ajax({
            url: "/submit_csv",
            type: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            success : function(res){
                alert('123');
            }
        });

        return false;
    });
});