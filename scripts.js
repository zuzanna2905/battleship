let table = document.getElementById("ownTable");
let rivalTable = document.getElementById("rivalsTable");
let direction = null;

if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            let x = getX(this);
            let y = getY(this);
            this.setAttribute('class', 'fill');
            this.style.cursor = 'unset';
            console.log(x,y);
        };
    }
}

if (rivalTable != null) {
    for (var i = 0; i < rivalTable.rows.length; i++) {
        for (var j = 0; j < rivalTable.rows[i].cells.length; j++)
        rivalTable.rows[i].cells[j].onclick = function () {
            this.style.backgroundColor = 'grey';
            if(isHidden(this))  {  
                direction = null;
                hitOthers(this);
                this.style.backgroundColor = 'green';
                this.setAttribute("hitten", "true");
            }
            this.style.cursor = 'unset';
        };
    }
}

function hitOthers(tableCell) {
    let x = parseInt(getX(tableCell));
    let y = parseInt(getY(tableCell));
    if(x > 1 && y > 1) {
        setCell(x-1, y-1);
    }
    if(x > 1 && y < 10){
        setCell(x-1, y+1);
    }
    if(x < 10 && y > 1){
        setCell(x+1, y-1);
    }
    if(x < 10 && y < 10) {
        setCell(x+1, y+1);
    }
    checkIsWholeShip(x,y);
}

function checkIsWholeShip(x, y){
    if(checkIsAll(x,y)){
        console.log(x,y, direction)
        if(x > 1 && 
        !isHidden(rivalTable.rows[y].cells[x-1]) && 
        (direction === null || direction === 'hor') && 
        !rivalTable.rows[y].cells[x-1].hasAttribute('hitten')) {
            direction = 'hor';
            checkIsWholeShip(x-1, y);
            setCell(x-1, y);
        }
        if(y > 1 && !isHidden(rivalTable.rows[y-1].cells[x]) && (direction === null || direction === 'ver') && ! rivalTable.rows[y-1].cells[x].hasAttribute('hitten')) {
            direction = 'ver';
            checkIsWholeShip(x, y-1);
            setCell(x, y-1);
        }
        if(y < 10  && !isHidden(rivalTable.rows[y+1].cells[x]) && (direction === null || direction === 'ver') && ! rivalTable.rows[y+1].cells[x].hasAttribute('hitten')){
            direction = 'ver';
            checkIsWholeShip(x, y+1);
            setCell(x, y+1);
        }
        if(x < 10  && !isHidden(rivalTable.rows[y].cells[x+1]) && (direction === null || direction === 'hor') && ! rivalTable.rows[y].cells[x+1].hasAttribute('hitten')){
            direction = 'hor';
            checkIsWholeShip(x+1, y);
            setCell(x+1, y);
        }
    }
}

function setCell(x, y) {
    if(!rivalTable.rows[y].cells[x].hasAttribute('hitten')){
        rivalTable.rows[y].cells[x].style.backgroundColor = 'grey';
        rivalTable.rows[y].cells[x].setAttribute("hitten", "true");
        rivalTable.rows[y].cells[x].style.cursor = 'unset';
    }
}

function checkIsAll(x, y) {
    if(x > 1 && isHiddenShipCell(rivalTable.rows[y].cells[x-1])) return false;
    if(y > 1 && isHiddenShipCell(rivalTable.rows[y-1].cells[x])) return false;
    if(x < 10 && isHiddenShipCell(rivalTable.rows[y].cells[x+1])) return false;
    if(y < 10 && isHiddenShipCell(rivalTable.rows[y+1].cells[x])) return false;
    return true;
}

function isHiddenShipCell(cell) {
    if(cell.getAttribute('hovered') === 'true' && ! cell.hasAttribute('hitten')) return true;
    return false;
}

function isHidden(tableCell) {
    if(tableCell.getAttribute('hovered') === 'true'){
        return true;
    }
}

function getX(tableCell) {
    return tableCell.getAttribute('x');
}

function getY(tableCell) {
    return tableCell.getAttribute('y');
}