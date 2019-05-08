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
let newShip = {};
let lastMove = {};

initialOwn();
initialRival();

function initialOwn () {
    if (ownTable != null) {
        for (var i = 0; i < ownTable.rows.length; i++) {
            for (var j = 0; j < ownTable.rows[i].cells.length; j++){
            //ownTable.rows[i].cells[j].onclick = hitRival(ownTable.rows[i].cells[j]);
            }
        }
    }
}

//add on click action on rival cells
function initialRival () {
    if (rivalTable != null) {
        for (var i = 0; i < rivalTable.rows.length; i++) {
            for (var j = 0; j < rivalTable.rows[i].cells.length; j++){
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
                computerMove();
            };
            removeHovered(rivalTable.rows[i].cells[j]);
            }
        }
        setShips(rivalTable);
    }
}

function computerMove(){
    let done = false;
    do {
        let x = Math.floor(Math.random() * 10) + 1;
        let y = Math.floor(Math.random() * 10) + 1;
        if(!ownTable.rows[y].cells[x].hasAttribute('hitten')){
            hitRival(ownTable.rows[y].cells[x]);
            done = true;
        }
    } while(!done)
}

function hitRival(cell){
    cell.style.backgroundColor = 'grey';
    if(isHidden(cell))  {  
        shipOwn = [];
        cell.setAttribute("hitten", "true");
        hitOthers(cell, ownTable, shipOwn, shipsOwn, leftShipsOwn);
        cell.style.backgroundColor = 'red';
    }
    cell.style.cursor = 'unset';
    checkIsWin(leftShipsOwn, ownTable);
}

//remove default ships
function removeHovered (cell) {
    cell.removeAttribute('hovered')
}

//create new ships on field
function setShips(table) {
    const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    for (let i = 0; i < ships.length; i++){
        createNewShip(table, ships[i]);
        setNewShip(table);
        setNeighbours(table);
    }
}

function createNewShip(table, long){
    let isCreated = false;
    do {
        newShip = [];
        let x = Math.floor(Math.random() * 10) + 1;
        let y = Math.floor(Math.random() * 10) + 1;
        if(!table.rows[y].cells[x].hasAttribute('hovered') && !table.rows[y].cells[x].hasAttribute('neighbour')){
            pushCell(x,y, newShip);
            isCreated = true;
            if(long > 1){
                isCreated = createLonger(table, x, y, long);
            }
        }
    } while(!isCreated);
}

function createLonger(table, x, y, long){
    let direction = Math.floor(Math.random() * 4) + 1;
    switch (direction){
        case 1:
            return createOnRight(table, x, y, long);
        case 2:
            return createOnLeft(table, x, y, long);
        case 3:
            return createOnUp(table, x, y, long);
        case 4:
            return createOnDown(table, x, y, long);
        default: return false;
    }
}

function createOnRight(table, x, y, long){
    for(let i = 1; i < long; i++){
        if(x+i < 10 && !table.rows[y].cells[x+i].hasAttribute('hovered') && !table.rows[y].cells[x+i].hasAttribute('neighbour')){
            pushCell(x+i, y, newShip);
        }else{
            return false;
        }
    }
    return true;
}

function createOnLeft(table, x, y, long){
    for(let i = 1; i < long; i++){
        if(x-i > 1 && !table.rows[y].cells[x-i].hasAttribute('hovered') && !table.rows[y].cells[x-i].hasAttribute('neighbour')){
            pushCell(x-i, y, newShip);
        }else{
            return false;
        }
    }
    return true;
}

function createOnUp(table, x, y, long){
    for(let i = 1; i < long; i++){
        if(y-i > 1 && !table.rows[y-i].cells[x].hasAttribute('hovered') && !table.rows[y-i].cells[x].hasAttribute('neighbour')){
            pushCell(x, y-i, newShip);
        }else{
            return false;
        }
    }
    return true;
}

function createOnDown(table, x, y, long){
    for(let i = 1; i < long; i++){
        if(y+i < 10 && !table.rows[y+i].cells[x].hasAttribute('hovered') && !table.rows[y+i].cells[x].hasAttribute('neighbour')){
            pushCell(x, y+i, newShip);
        }else{
            return false;
        }
    }
    return true;
}

function setNewShip(table){
    for (let i = 0; i < newShip.length; i++){
        table.rows[newShip[i].y].cells[newShip[i].x].setAttribute('hovered', 'true');
        table.rows[newShip[i].y].cells[newShip[i].x].style.backgroundColor = 'pink';
    }
}

function setNeighbours(table){
    //sides of ship
    for (let i = 0; i < newShip.length; i++){
        if(newShip[i].x > 1 && !table.rows[newShip[i].y].cells[newShip[i].x-1].hasAttribute('hovered')){
            table.rows[newShip[i].y].cells[newShip[i].x-1].setAttribute('neighbour', 'true');
        }
        if(newShip[i].x < 10 && !table.rows[newShip[i].y].cells[newShip[i].x+1].hasAttribute('hovered')){
            table.rows[newShip[i].y].cells[newShip[i].x+1].setAttribute('neighbour', 'true');
        }
        if(newShip[i].y > 1 && !table.rows[newShip[i].y-1].cells[newShip[i].x].hasAttribute('hovered')){
            table.rows[newShip[i].y-1].cells[newShip[i].x].setAttribute('neighbour', 'true');
        }
        if(newShip[i].y < 10 && !table.rows[newShip[i].y+1].cells[newShip[i].x].hasAttribute('hovered')){
            table.rows[newShip[i].y+1].cells[newShip[i].x].setAttribute('neighbour', 'true');
        }
    }
    //front of ship
    if(newShip[0].x > 1 && newShip[0].y > 1){
        table.rows[newShip[0].y-1].cells[newShip[0].x-1].setAttribute('neighbour', 'true');
    }    
    if(newShip[0].x  > 1 && newShip[0].y  < 10){
        table.rows[newShip[0].y+1].cells[newShip[0].x-1].setAttribute('neighbour', 'true');
    }
    if(newShip[0].x  < 10 && newShip[0].y  > 1){
        table.rows[newShip[0].y-1].cells[newShip[0].x+1].setAttribute('neighbour', 'true');
    }
    if(newShip[0].x  < 10 && newShip[0].y  < 10) {
        table.rows[newShip[0].y+1].cells[newShip[0].x+1].setAttribute('neighbour', 'true');
    }
    //end of ship - zamienić to na funkcje
    if(newShip[newShip.length-1].x > 1 && newShip[newShip.length-1].y > 1){
        table.rows[newShip[newShip.length-1].y-1].cells[newShip[newShip.length-1].x-1].setAttribute('neighbour', 'true');
    }    
    if(newShip[newShip.length-1].x  > 1 && newShip[newShip.length-1].y  < 10){
        table.rows[newShip[newShip.length-1].y+1].cells[newShip[newShip.length-1].x-1].setAttribute('neighbour', 'true');
    }
    if(newShip[newShip.length-1].x  < 10 && newShip[newShip.length-1].y  > 1){
        table.rows[newShip[newShip.length-1].y-1].cells[newShip[newShip.length-1].x+1].setAttribute('neighbour', 'true');
    }
    if(newShip[newShip.length-1].x  < 10 && newShip[newShip.length-1].y  < 10) {
        table.rows[newShip[newShip.length-1].y+1].cells[newShip[newShip.length-1].x+1].setAttribute('neighbour', 'true');
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