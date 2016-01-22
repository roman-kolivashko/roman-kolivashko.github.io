$(document).ready( function(){
    
    // Display current date.
    $("#dateTime").html(Date());
    
    appendNewCmdObject();
    
});

/*
* - Decides on what function to call depedning on the primary key given.
*/
function proccessCommand(){
    getKeyWord($("#commandLine").val());
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

/*
* - Removes first word from command string
* - Compares word to valid internal command words.
*/
function getKeyWord(cmdString){
    var cmdWord = cmdString.split(" ")[0];
    
    switch (cmdWord) {
        case 'help':
            helpCommand();
            break;
        
        default:
            disMessage(cmdWord+": command not found", true);
    }
    
    console.log(cmdWord);
}

/*
* - Displays string to terminal.
* - False or True determins if a break is added at the end | False by default
*/
function disMessage(messageToDisplay, hasBreak){
    if(hasBreak === null){
        hasBreak = false;
    }
    
    $("#terminalContainer").append( "<p>"+messageToDisplay+"</p>");
    if(hasBreak){
       $("#terminalContainer").append( "<br>"); 
    }
}


function helpCommand(){
    disMessage("<p> Hywie Martins Bash, Version 0.1.0 </P>", true);
    disMessage("<p> These shell commands are defined internally. Type '<i>help</i>' to see this list.</P>", true);
    disMessage("<p> | help | ls | cd | mkdir | date | cp | mv</P>", true);
}