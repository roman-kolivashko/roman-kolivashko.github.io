$(document).ready( function(){
    
    $("#commandLine").focus(); // Ensures a flashing cursor can been seen in the input box.
    
    $("#dateTime").html(Date()); // Display current date.
    
    $("#commandLine").keypress(function (event){
        
        if(event.which == 13){ // If the key pressed is the enter key.
            proccessCommand();
        }
        
    });
});


function proccessCommand(){
    
    // Make the current cmd input unusable and change the attr id so it can be transfered to the active input.
    $("#commandLine").prop("readonly", true);
    $("#commandLine").attr("id","");
    
    // Add a new input object and ensure it is focused.
    $("#terminalSpace").append( "<p>$> <input id=\"commandLine\" maxlength=\"40\"></input></p>" );
    $("#commandLine").focus();
    
    // Add the event handler to the new input object    
    $("#commandLine").keypress(function (event){
        if(event.which == 13){
            proccessCommand();
        }
    });
}