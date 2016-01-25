/*
* All code which accesses or deals with the virtual file system
* is stored in this JavaScript file.
*/

// Global vars
var virtualDir = [["about.txt",0,null], ["contact.txt",0,null], ["projects/",0,1] ];
var currentDir = 0;


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
    var currentList = getFilesOnLayer(currentDir);
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

function getCurrentDir(){
    switch(currentDir){
        case 0:
            return "<span id='root'>hywel-martin</span>:<span id='dir'>/</span> $ ";
        case 1:
            return "hywel-martin: /projects $ "
    }
}