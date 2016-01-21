$(document).ready( function(){
    
    // Display current date.
    $("#dateTime").html(Date());
    
    appendNewCmdObject();
    
});

/*
* - Decides on what function to call depedning on the primary key given.
*/
function proccessCommand(){
    
    appendNewCmdObject();
}


/*
* - Makes the current cmd input read only to the user.
* - Removes id of current cmd for the new cmd input object to use the if 'commandLine'.
* - Appends a new input object in the div 'terminalSpace'.
*/
function appendNewCmdObject(){
    
    // Make the current cmd input unusable and change the attr id so it can be transfered to the active input.
    $("#commandLine").prop("readonly", true);
    $("#commandLine").attr("id","");
    
    // Add a new input object and ensure it is focused.
    $("#terminalContainer").append( "<p>$> <input id=\"commandLine\" maxlength=\"40\"></input></p>" );
    $("#commandLine").focus();
    
    // Add the event handler to the new input object    
    $("#commandLine").keypress(function (event){
        if(event.which == 13){
            proccessCommand();
        }
    });
}