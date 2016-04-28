function Node (title, parent, dataPointer){
    this.children = [];
    this.parent = parent;
    this.dataPointer = dataPointer;
    this.title = title;
}

Node.prototype = {
    constructor:Node,
    
    addChild:function(childNode){
        this.children.push(childNode);
    },
    
    getChildren:function(){
        return this.children;
    },
    
    removeChild:function (childToRemove){
        this.children.splice(this.children.indexOf(childToRemove), 1);
    },
    
    changeParent:function(newParent){
        this.parent = newParent;
    },
    
    getTitle: function(){
        return this.title;
    },
    
    setTitle:function(newTitle){
        this.title = newTitle;
    },
    
    getDataPointer:function(){
        return this.dataPointer;
    }
    
}

var root = new Node("root",null, null);
var currentNode = root;