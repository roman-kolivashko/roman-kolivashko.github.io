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
        var listStringHTML = "";
        
        for(var i = 0; i < currentList.length; i++){
            if((currentList[i]).charAt(currentList[i].length-1) == "/"){
                listStringHTML += "<span id='dir' >"+currentList[i]+"</span> ";
            } else{
                listStringHTML += currentList[i]+" ";
            }
        }
        
        disMessage(listStringHTML, true);
        return true;
        
    } else{
        return false;
    }
}
/*
* searchFiles(layer of directory)
* searchFiles(layer of directory, fileName)
* return fileArray := Array contains file name, layer it resises in and layer it points to.
* return false := more than one file exists of that name in the system.
*
* Linear search through the virtual Directory for the specific file or folder.
*/
function searchFiles(pointer, fileName){
    if(fileName == undefined || fileName == "" || fileName == null){
        if(pointer == 0){
            return "/";
        } else{
            for(var i = 0; i < virtualDir.length; i++){
                if(virtualDir[i][2] == pointer){
                    return virtualDir[i];
                }
            }
        }
    } else{
        var returnFiles = [];
        for(var i = 0; i < virtualDir.length; i++){
            if(virtualDir[i][0] == fileName){
                returnFiles.push(virtualDir[i]);
            }
        }
        if(returnFiles.length == 1){
            return returnFiles[0];
        } else{
            return false;
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
    var htmlString = "<span id='root'>roman-kolivashko</span>:<span id='dir'>/</span>";
    if(currentDir.length == 1 && currentDir[0] == 0){
        return "<span id='root'>roman-kolivashko</span>:<span id='dir'>/</span> $ ";
    } else{
        
        for(var i =1; i < currentDir.length; i++){
            var tempFile = searchFiles(currentDir[i])[0];
            if(i == currentDir.length-1){
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
    } else if(arg =="~/"){
        currentDir = [0];
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
function cp(commandString) {
    commandString = commandString.split(" ");
    if (commandString.length != 3) {
        disMessage(" Error: <i>cp</i> only takes two argument.");
        disMessage(" cp [ fileToCopy ] [ nameOfCopy ]");
    }
    else {
        var arg1 = commandString[1];
        var arg2 = commandString[2];
        var sourceFile;
        var destFile;
        var fileName;
        var sourceIsFile;

       
        sourceFile = searchByDirectory(arg1);
        destFile = searchByDirectory(arg2);
        
        // Check that the sourceFile exists
        if(sourceFile == false){
            disMessage(" Error: <i>'"+arg1+"'</i> does not exist");
        }
        
        if(sourceFile[2] == null){
            sourceIsFile = true;
        } else{
            sourceIsFile = false;
        }
        
        if(!sourceIsFile && arg2.substr(arg2.length-4,arg2.length) == ".txt"){
            disMessage("Error: copy destination must be a folder, not a text file. ");
            return false;
        }
        /*
        * Check if destination is the wanted file name
        *
        */
        if(sourceIsFile && arg2.charAt(arg2.length-1) == "/"){
            if(searchByDirectory(arg2) != false){
                destFile = searchByDirectory(arg2);
                fileName = sourceFile[0];
                virtualDir.push( [fileName,destFile[2],null] );
                return true;
                
            } else{
                disMessage("Error: copy destination does not exist");
                return false;
            }
        } else if(destFile == false && sourceIsFile){
            var tempArg2 = arg2.split("/")
            tempArg2.pop();
            tempArg2 = tempArg2.join("/")+"/";
                
            // If the last file in the arg2 directory doesn't exist but the file above does then make the file.
            if( searchByDirectory(tempArg2) != false && arg2.substr(arg2.length-4,arg2.length) == ".txt"){
                
                destFile = searchByDirectory(tempArg2);
                fileName = arg2.split("/")[arg2.split("/").length-1];
                virtualDir.push( [fileName,destFile[2],null] );
            } else{
                disMessage(" Error: <i>'"+arg2+"'</i> is not a valid destination");
            }
        } else{
            var tempArg2 = arg2.split("/")
            tempArg2.pop();
            var fileNameArg2 = tempArg2[tempArg2.length-1];
            tempArg2 = tempArg2.join("/")+"/";
            
            var tempArg1 = arg2.split("/")
            tempArg1.pop();
            var fileNameArg1 = tempArg1[tempArg1.length-1];
            
            if(fileNameArg1 == fileNameArg2){
                destFile = searchByDirectory(tempArg2);
            } else{
                destFile = searchByDirectory(arg2);
            }
            if(destFile != false){
                virtualDir.push( [fileName,destFile[2],sourceFile[2]] );
                return true;
            } else{
                disMessage(" Error: <i>'"+arg2+"'</i> is not a valid destination");
            }
        }

        
        if (arg2.charAt(arg2.length - 1) == "/") {
            
            if(sourceIsFile){
                destFile = searchByDirectory(arg2);
            }

        }
        else {
            
        }
        
        console.log(sourceFile);
        console.log(destFile);
    }
}



// Should not return false;
function searchByDirectory(directory){
    var fileFound = false;
    var sourceIsDirectory = false;
    var dirStrSplit = directory.split("/");
    
    
    if(directory.charAt(directory.length-1) == "/"){
        sourceIsDirectory = true;
        // Null element is added to the end of the array which needs to removed due to splitting using the '/' char
        dirStrSplit.pop();
    }
    
    // The code knows to start the search from the root
    if(dirStrSplit[0] == "~"){
        var pointer = 0;
        var latestFile;
        
        for(var i = 1; i <= dirStrSplit.length-1; i++){

            // Will only add a '/' to the end of the string search if it's searching for a directory.
            if(i != dirStrSplit.length-1 || sourceIsDirectory){
                
               latestFile = searchFileSystemLayer((dirStrSplit[i]+"/"),pointer);
            
               if(!latestFile){
                   return false;
               } else{
                   pointer = latestFile[2];
               }
                
            } else {
                latestFile = searchFileSystemLayer(dirStrSplit[i],pointer);
                if(!latestFile){
                   return false;
               } else{
                   pointer = latestFile[2];
              }
            }
         
        }
        
        return latestFile;
    
    } else{
        // Searches for file starting from current file layer
        return searchFileSystemLayer(directory,currentDir[currentDir.length-1]);
    }
    
}

function searchFileSystemLayer(fileName, fileLayer) {
    if (fileName == undefined || fileName == "" || fileName == null || fileLayer == undefined || fileLayer == null) {
        disMessage("Error: Unexcpected amount of arguments passed to function");
    }
    else {
        var filesOnLayer = getFilesOnLayer(fileLayer, true);
        
        for (var j = 0; j <= filesOnLayer.length-1; j++) {
            
            if (fileName == filesOnLayer[j][0]) {
                return filesOnLayer[j];
            }
        }
        return false;

    }
}
