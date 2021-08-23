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
            contentType: false, //  "multipart/form-data", //false,
            success : function(res){
                console.log('response', res);
                if (res.status === "success" && res.data) {
                    $("#lastImportTime").html(res.data);
                }
            }
        });

        return false;
    });

    $("#updateBySheet").click(function(e){
        $.ajax({
            url: "/update_csv_by_path",
            type: "POST",
            // data: new FormData(this),
            processData: false,
            contentType: false, //  "multipart/form-data", //false,
            success : function(res){
                console.log('updateBySheet response', res);                
            }
        });
    });
});