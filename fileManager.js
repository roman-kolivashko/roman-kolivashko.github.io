/*
* All code which accesses or deals with the virtual file system
* is stored in this JavaScript file.
*/

// Global vars
var virtualDir = [["about.txt",0,null], ["contact.txt",0,null], ["projects/",0,1], ["tic-tac-toe.txt",1,null] ];
var currentDir = [0];

// Used to keeep track of what pointer numbers are in use and what is free, by default there are 2 pointers.
var usedPointers = 1;


/*
* getFilesOnLayer(layer : int)
* getFilesOnLayer(layer : int, returnAsObject : bool)
* layer := Layer number to search for files on.
* returnAsObject := [optional] Return file object not name of file if true.
*
* return filesOnLayer := Multi dimensional file array or an Array of String Objects.
* return false := If layer does not exist false is returned
*
* Searches layer and returns files / directories on that layer.
*
*/
function getFilesOnLayer(layer,returnAsObject){
    var filesOnLayer = [];
    if(returnAsObject === undefined){
            returnAsObject = false;
    }
        
    if(layer === null){
        disMessage("getFilesOnLayer : Unexpected function call with invalid parameter called");
        return false;
        
    }else {
        for(var i = 0; i < virtualDir.length; i++){
            if(virtualDir[i][1] == layer){
                console.log(returnAsObject);
                if(returnAsObject === false){
                    filesOnLayer.push(virtualDir[i][0]);
                } else{
                    filesOnLayer.push(virtualDir[i]);
                }
            }
        }
        return filesOnLayer;
    }
    
}

/*
* listCurrentDir()
*
* return true || false := If the current dir is invalid false is returned. If function performed correctly true is returned.
*
* Displays list of folders and directories in current working directory.
*/

function listCurrentDir(){
    var currentList = getFilesOnLayer(currentDir[currentDir.length-1]);
    if(currentList != false){
        var listString = "";
        
        for(var i = 0; i < currentList.length; i++){
            if((currentList[i]).charAt(currentList[i].length-1) == "/"){
                listString += "<span id='dir' >"+currentList[i]+"</span> ";
            } else{
                listString += currentList[i]+" ";
            }
        }
        
        disMessage(listString, true);
        return true;
        
    } else{
        return false;
    }
}
/*
* searchFiles(layer of directory / file)
* return fileArray := Array contains file name, layer it resises in and layer it points to.
*
* Linear search through the virtual Directory for the specific file or folder.
*/
function searchFiles(pointer){
    if(pointer == 0){
        return "/";
    } else{
        for(var i = 0; i < virtualDir.length; i++){
            if(virtualDir[i][2] == pointer){
                return virtualDir[i];
            }
        }
    }
}

/*
* getCurrentDir()
* return String := String that is in an HTML format.
* 
* Calculates the current directory and dynamically constructs the path.
*/
function getCurrentDir(){
    var htmlString = "<span id='root'>hywel-martin</span>:<span id='dir'>/</span>";
    if(currentDir.length == 1 && currentDir[0] == 0){
        return "<span id='root'>hywel-martin</span>:<span id='dir'>/</span> $ ";
    } else{
        
        for(var i =1; i < currentDir.length; i++){
            var tempFile = searchFiles(currentDir[i])[0];
            if(i == currentDir.length-1){
                console.log(tempFile);
                htmlString += "<span id='dir'>"+tempFile.substring(0, tempFile.length - 1)+"</span> $";
            } else{
                htmlString += "<span id='dir'>"+tempFile+"</span>";
            }
        }
        return htmlString;
    }
}

function cdCommand(arg){
    var currentFiles = getFilesOnLayer(currentDir[currentDir.length-1],true);
    
    if(arg == ".." && currentDir != 0){
        currentDir.pop();
        return true;
    }
    for(var i = 0; i < currentFiles.length; i++){
        if(currentFiles[i][0] === arg && currentFiles[i][2] != null){
            currentDir.push(currentFiles[i][2]);
            return true;
        }
    }
    disMessage("Error: directory does not exist");
    return false;
}


function mkDir(commandString){
    
    // Ensure there is only one argument in command statement
    if(commandString.split(" ").length > 2){
        disMessage(" Error: <i>mkdir</i> only takes one argument.");
        disMessage(" mkdir [ fileName ]");
    } else{
        var fileName = commandString.split(" ")[1];
        
        if(fileName.charAt(fileName.length-1) != "/"){
            fileName += "/";
        }
        
        // Push new directory in to file system.
        virtualDir.push([fileName, currentDir[currentDir.length-1], usedPointers+1]);
        // Increment used pointers
        usedPointers ++;
        
    }
    
}