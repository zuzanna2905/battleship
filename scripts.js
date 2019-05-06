let table = document.getElementById("ownTable");
let rivalTable = document.getElementById("rivalsTable");

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
        rivalTable.rows[y-1].cells[x-1].style.backgroundColor = 'grey';
        rivalTable.rows[y-1].cells[x-1].setAttribute("hitten", "true");
    }
    if(x > 1 && y < 10){
        rivalTable.rows[y+1].cells[x-1].style.backgroundColor = 'grey';
        rivalTable.rows[y+1].cells[x-1].setAttribute("hitten", "true");
    }
    if(x < 10 && y > 1){
        rivalTable.rows[y-1].cells[x+1].style.backgroundColor = 'grey';
        rivalTable.rows[y-1].cells[x+1].setAttribute("hitten", "true");
    }
    if(x < 10 && y < 10) {
        rivalTable.rows[y+1].cells[x+1].style.backgroundColor = 'grey';
        rivalTable.rows[y+1].cells[x+1].setAttribute("hitten", "true");
    }
    checkIsWholeShip(x,y);
}

function checkIsWholeShip(x, y){
    if(checkIsAll(x,y)){
        if(x > 1 && !isHidden(rivalTable.rows[y].cells[x-1])) {
            rivalTable.rows[y].cells[x-1].style.backgroundColor = 'grey';
        }
        if(y > 1 && !isHidden(rivalTable.rows[y-1].cells[x])) {
            rivalTable.rows[y-1].cells[x].style.backgroundColor = 'grey';
        }
        if(y < 10  && !isHidden(rivalTable.rows[y+1].cells[x])){
            rivalTable.rows[y+1].cells[x].style.backgroundColor = 'grey';
        }
        if(x < 10  && !isHidden(rivalTable.rows[y].cells[x+1])) {
            rivalTable.rows[y].cells[x+1].style.backgroundColor = 'grey';
        }
    }
}

function colorFields(tab) {
    for (var i = 0; i < tab.length; i++) {
        rivalTable.rows[tab[i].x].cells[tab[i].y].onclick = function () {
            this.style.backgroundColor = 'grey';
        };
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