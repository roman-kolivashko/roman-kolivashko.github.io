function Node (data, parent){
    this.children = new array();
    this.parent = parent;
    this.data = data;
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
    }
    
}