import paper from 'paper';

let local = {
    path: null,
    group: null
};




function createLine() {
    if (local.path) {
        local.path.remove();
    }

    local.group = new Group();

    
    for (var i = 0; i < 1550; i=i+30) {
        local.path = new paper.Path.Line({
            from: new Point(i, 0),
            to: new Point(i, 750),
            strokeColor: 'black',
            size: 1,
        });

        local.group.addChild(local.path);
    }

    for (var i = 0; i < 750; i=i+40) {
        local.path = new paper.Path.Line({
            from: new Point(0, i),
            to: new Point(1550, i),
            strokeColor: 'black',
            size: 1,
        });

        local.group.addChild(local.path);
    }
    local.path = null;


    
}

function removegrid(){
    local.group.remove();
}


export default {createLine,removegrid};