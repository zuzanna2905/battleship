let ownTable = document.getElementById("ownTable");
let rivalTable = document.getElementById("rivalsTable");
let ownTableDom = ownTable.cloneNode(true);
let rivalTableDom = rivalTable.cloneNode(true);
let shipsRival = document.getElementById("shipsRival");
let shipsOwn = document.getElementById("shipsOwn");
let shipsRivalDom = shipsRival.cloneNode(true);
let shipsOwnDom = shipsOwn.cloneNode(true);
let shipRival = {};
let leftShipsRival = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let shipOwn = {};
let leftShipsOwn = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

initialOwn();
initialRival();

function initialOwn () {
    if (ownTable != null) {
        for (var i = 0; i < ownTable.rows.length; i++) {
            for (var j = 0; j < ownTable.rows[i].cells.length; j++)
            ownTable.rows[i].cells[j].onclick = function () {
                this.style.backgroundColor = 'grey';
                if(isHidden(this))  {  
                    shipOwn = [];
                    this.setAttribute("hitten", "true");
                    hitOthers(this, ownTable, shipOwn, shipsOwn, leftShipsOwn);
                    this.style.backgroundColor = 'red';
                }
                this.style.cursor = 'unset';
                checkIsWin(leftShipsOwn, ownTable);
            };
        }
    }
}

//add on click action on rival cells
function initialRival () {
    if (rivalTable != null) {
        for (var i = 0; i < rivalTable.rows.length; i++) {
            for (var j = 0; j < rivalTable.rows[i].cells.length; j++)
            rivalTable.rows[i].cells[j].onclick = function () {
                this.style.backgroundColor = 'grey';
                if(isHidden(this))  {  
                    shipRival = [];
                    this.setAttribute("hitten", "true");
                    hitOthers(this, rivalTable, shipRival, shipsRival, leftShipsRival);
                    this.style.backgroundColor = 'green';
                }
                this.style.cursor = 'unset';
                checkIsWin(leftShipsRival, rivalTable);
                //dodaj opoznienie i wykonuj ruch przeciwnika
            };
        }
    }
}

//check win condition
function checkIsWin(ships, table) {
    if(ships.length > 0) return false;
    console.log('You win!!!');
    notHittens(table);
    return true;
}

//color not destroyed cells
function notHittens(table){
    for (var i = 1; i < table.rows.length; i++) {
        for (var j = 1; j < table.rows[i].cells.length; j++)
            if(!table.rows[i].cells[j].hasAttribute('hitten')){
                setCell(j,i, table)
            }
    }
}

//
function resetGame(){
    ownTable.innerHTML = ownTableDom.innerHTML;
    rivalTable.innerHTML = rivalTableDom.innerHTML;
    shipsRival.innerHTML = shipsRivalDom.innerHTML;
    shipsOwn.innerHTML = shipsOwnDom.innerHTML;
    initialOwn();
    initialRival();
}


//hit neighbour cells 
function hitOthers(tableCell, table, ship, ships, lefts) {
    let x = parseInt(getX(tableCell));
    let y = parseInt(getY(tableCell));
    if(x > 1 && y > 1) {
        setCell(x-1, y-1, table);
    }
    if(x > 1 && y < 10){
        setCell(x-1, y+1, table);
    }
    if(x < 10 && y > 1){
        setCell(x+1, y-1, table);
    }
    if(x < 10 && y < 10) {
        setCell(x+1, y+1, table);
    }
    checkIsWholeShip(x,y, table, ship, ships, lefts);
}

//check is whole ship painting
function checkIsWholeShip(x, y, table, ship, ships, lefts){
    ship.push({x, y});
    checkIsLonger(x,y, table, ship);
    if(isAll(table, ship)){
        for (let i = 0; i < ship.length; i++) {
            getNeighbours(ship[i].x, ship[i].y, table)
        }
        const index = lefts.indexOf(ship.length);
        if (index > -1) {
            lefts.splice(index, 1);
        }
        setShip(ships, ship);
    }
}

//choose destroyed ship
function setShip(ships, ship) {
    for (let i = 0; i < ships.rows[0].cells.length; i++){
        if(parseInt(ships.rows[0].cells[i].getAttribute('long')) === ship.length && ! ships.rows[0].cells[i].hasAttribute('colored')){
            colorShip(0,i, ship.length, ships);
            return;
        }
    }
}

//color destroyed ships
function colorShip(x, y, long, ships){
    for(let i = 0; i < long; i++){
        ships.rows[x].cells[y+i].style.backgroundColor = 'green';
        ships.rows[x].cells[y+i].setAttribute("colored", "true");
    }
}

//paint neighbours 
function getNeighbours(x,y, table){
    if(x > 1 && !isShipCell(table.rows[y].cells[x-1])){
        setCell(x-1,y, table)
    }    
    if(x < 10 && !isShipCell(table.rows[y].cells[x+1])){
        setCell(x+1,y, table)
    }    
    if(y > 1 && !isShipCell(table.rows[y-1].cells[x])){
        setCell(x,y-1, table)
    }    
    if(y < 10 && !isShipCell(table.rows[y+1].cells[x])){
        setCell(x,y+1, table)
    }
}

//save ship cells
function pushCell(x, y, ship) {
    let pair = {x, y};
    ship.push(pair);
}

//check is ship longer than 1
function checkIsLonger(x,y, table, ship){
    checkLeft(x-1, y, table, ship);
    checkRight(x+1, y, table, ship);
    checkUp(x, y-1, table, ship);
    checkDown(x, y+1, table, ship);
}

function checkLeft(x,y, table, ship){
    if(ship.includes({x,y})) return;
    if(x > 1 && isShipCell(table.rows[y].cells[x])) {    
        pushCell(x, y, ship);
        checkLeft(x-1, y, table, ship);
    } 
}

function checkRight(x,y, table, ship){
    if(ship.includes({x,y})) return;
    if(x < 10 && isShipCell(table.rows[y].cells[x])) {    
        pushCell(x, y, ship);
        checkRight(x+1, y, table, ship);
    } 
}

function checkUp(x,y, table, ship){
    if(ship.includes({x,y})) return;
    if(y > 1 && isShipCell(table.rows[y].cells[x])) {
        pushCell(x, y, ship);
        checkUp(x,y-1, table, ship)
    }
}

function checkDown(x,y, table, ship){
    if(ship.includes({x,y})) return;
    if(y < 10 && isShipCell(table.rows[y].cells[x])) {
        pushCell(x, y, ship);
        checkDown(x,y+1, table, ship)
    }
}

//check is whole ship hitten
function isAll(table, ship){
    for (var i = 0; i < ship.length; i++) {
        if (!table.rows[ship[i].y].cells[ship[i].x].hasAttribute('hitten')) return false;
    }
    return true;
}

//set hitten cell values
function setCell(x, y, table) {
    if(!table.rows[y].cells[x].hasAttribute('hitten')){
        table.rows[y].cells[x].style.backgroundColor = 'grey';
        table.rows[y].cells[x].setAttribute("hitten", "true");
        table.rows[y].cells[x].style.cursor = 'unset';
    }
}

//check is hidden ship cell
function isHiddenShipCell(cell) {
    if(cell.getAttribute('hovered') === 'true' && ! cell.hasAttribute('hitten')) return true;
    return false;
}

//check is ship cell
function isShipCell(cell){
    if(cell.getAttribute('hovered') === 'true') return true;
    return false;    
}

//check is ship cell
function isHidden(tableCell) {
    if(tableCell.getAttribute('hovered') === 'true'){
        return true;
    }
}

//get y cell position
function getX(tableCell) {
    return tableCell.getAttribute('x');
}

//get x cell position 
function getY(tableCell) {
    return tableCell.getAttribute('y');
}