// Create an associated array to store through files through hashing.
var HDD = new Object();

// Set up default files ready for tree structure to point to
HDD['about.txt'] = "This is a text document about me. I need to create a CLI text editor such as node to be used.";
HDD['gitHub.txt'] = "Check out my GitHub at : <a href='https://github.com/Hywie'>https://github.com/Hywie</a>.";
HDD['siteInfo.txt'] = "This is a text document on a brief explanation of the site";

for(var hashKey in HDD){
    
    // Filter hash keys from the Object
    if(HDD.hasOwnProperty(hashKey)){
        root.addChild(new Node(hashKey, root, hashKey));
    }
}