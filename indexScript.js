$(document).ready( function(){
    
    // Display current date.
    $("#dateTime").html(Date());
    
    appendNewCmdObject();
    
});

/*
* commandHandler()
* return null
*
* Function called on enter key event on current command.
*/
function commandHandler(){
    processCommand($("#commandLine").val());
    appendNewCmdObject();
}


/*
* appendNewCmdObject()
*
* - Makes the current cmd input read only to the user.
* - Removes id of current cmd for the new cmd input object to use the if 'commandLine'.
* - Appends a new input object in the div 'terminalSpace'.
*/
function appendNewCmdObject(){
    
    // Make the current cmd input unusable and change the attr id so it can be transfered to the active input.
    $("#commandLine").prop("readonly", true);
    $("#commandLine").attr("id","");
    
    // Add a new input object and ensure it is focused.
    $("#terminalContainer").append( "<p> "+getCurrentDir()+" <input id=\"commandLine\" maxlength=\"80\" /></p>" );
    $("#commandLine").focus();
    
    // Add the event handler to the new input object    
    $("#commandLine").keypress(function (event){
        if(event.which == 13){
            commandHandler();
        }
    });
}

/*
* processCommand(commandString : String)
* 
* commandString := The string the keyword will be extracted from.
* 
* returns true | false =: true if a command has been successfully executed, false if an error has occured.
* Extracts command word, first word of string, and compares the keyword. The correct functions are executed depending on the command word.
*
*/
function processCommand(cmdString){
    var cmdWord = cmdString.split(" ")[0];
    
    switch (cmdWord) {
        case 'help':
            helpCommand();
            return true;
        
        case 'ls':
            listCurrentDir();
            return true;
        
        case 'cd':
            cdCommand(cmdString.split(" ")[1]);
            return true;
            
        case 'date':
            disMessage(Date());
            return true;
            
        case 'mkdir':
            mkDir(cmdString);
            return true;
        
        case 'cp':
            cp(cmdString);
            return true;
            
        case 'clear':
             $("#terminalContainer").empty();
             return true;
            
        default:
            disMessage(cmdWord+": command not found", true);
            return false;
    }
    
    console.log(cmdWord);
}

/*
* disMessage(messageToDisplay : String)
* disMessage(messageToDisplay : String, addNewLine : bool)
*
* messageToDisplay := The string will be outputed in a <p> object on the html page.
* addNewLine := [Optional] Adds a <br> tag at the end of the <p> object. If no parameter is passed then a <br> is not added.
*
* return null
*
* - Outputs a message to the terminal using a paragraph html object which is appended to the #terminalContainer div.
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

/*
* helpCommand()
* return null
*
* Displays valid bash commands by executing disMessage() function.
*/
function helpCommand(){
    disMessage("<p> Hywie Martins Bash, Version 0.1.0 </P>", true);
    disMessage("<p> These shell commands are defined internally. Type '<i>help</i>' to see this list.</P>", true);
    disMessage("<p> | help | ls | cd | mkdir <br>| date | cp | mv | tree | clear</P>", true);
}