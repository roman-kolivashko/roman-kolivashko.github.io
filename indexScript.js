$(document).ready( function(){
    $("#commandLine").focus();
    $("#dateTime").html(Date());
    
    $("#commandLine").keypress(function (event){
        if(event.which == 13){
            $("#commandLine").prop("readonly", true);
        }
    });
});


function proccessCommand(){
    
}