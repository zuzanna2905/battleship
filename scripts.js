let table = document.getElementById("ownTable");
let rivalTable = document.getElementById("rivalsTable");
let shipsRival = document.getElementById("shipsRival");
let ship = {};
let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            let x = getX(this);
            let y = getY(this);
            this.style.cursor = 'unset';
        };
    }
}

//add on click action on rival cells
if (rivalTable != null) {
    for (var i = 0; i < rivalTable.rows.length; i++) {
        for (var j = 0; j < rivalTable.rows[i].cells.length; j++)
        rivalTable.rows[i].cells[j].onclick = function () {
            this.style.backgroundColor = 'grey';
            if(isHidden(this))  {  
                ship = [];
                direction = null;
                this.setAttribute("hitten", "true");
                hitOthers(this);
                this.style.backgroundColor = 'green';
            }
            this.style.cursor = 'unset';
            checkIsWin();
        };
    }
}

//check win condition
function checkIsWin() {
    if(ships.length > 0) return false;
    console.log('You win!!!');
    notHittens();
    return true;
}

//color not destroyed cells
function notHittens(){
    for (var i = 1; i < rivalTable.rows.length; i++) {
        for (var j = 1; j < rivalTable.rows[i].cells.length; j++)
            if(!rivalTable.rows[i].cells[j].hasAttribute('hitten')){
                setCell(j,i)
            }
    }
}

//hit neighbour cells 
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

//check is whole ship painting
function checkIsWholeShip(x, y){
    ship.push({x, y});
    checkIsLonger(x,y);
    if(isAll()){
        for (let i = 0; i < ship.length; i++) {
            getNeighbours(ship[i].x, ship[i].y)
        }
        const index = ships.indexOf(ship.length);
        if (index > -1) {
            ships.splice(index, 1);
        }
        getShip();
    }
}

//choose destroyed ship
function getShip() {
    for (let i = 0; i < shipsRival.rows[0].cells.length; i++){
        if(parseInt(shipsRival.rows[0].cells[i].getAttribute('long')) === ship.length && ! shipsRival.rows[0].cells[i].hasAttribute('colored')){
            colorShip(0,i, ship.length);
            return;
        }
    }
}

//color destroyed ships
function colorShip(x, y, long){
    for(let i = 0; i < long; i++){
        shipsRival.rows[x].cells[y+i].style.backgroundColor = 'green';
        shipsRival.rows[x].cells[y+i].setAttribute("colored", "true");
    }
}

//paint neighbours 
function getNeighbours(x,y){
    if(x > 1 && !isShipCell(rivalTable.rows[y].cells[x-1])){
        setCell(x-1,y)
    }    
    if(x < 10 && !isShipCell(rivalTable.rows[y].cells[x+1])){
        setCell(x+1,y)
    }    
    if(y > 1 && !isShipCell(rivalTable.rows[y-1].cells[x])){
        setCell(x,y-1)
    }    
    if(y < 10 && !isShipCell(rivalTable.rows[y+1].cells[x])){
        setCell(x,y+1)
    }
}

//save ship cells
function pushCell(x, y) {
    let pair = {x, y};
    ship.push(pair);
}

//check is ship longer than 1
function checkIsLonger(x,y){
    checkLeft(x-1, y);
    checkRight(x+1, y);
    checkUp(x, y-1);
    checkDown(x, y+1);
}

function checkLeft(x,y){
    if(ship.includes({x,y})) return;
    if(x > 1 && isShipCell(rivalTable.rows[y].cells[x])) {    
        pushCell(x, y);
        checkLeft(x-1, y);
    } 
}

function checkRight(x,y){
    if(ship.includes({x,y})) return;
    if(x < 10 && isShipCell(rivalTable.rows[y].cells[x])) {    
        pushCell(x, y);
        checkRight(x+1, y);
    } 
}

function checkUp(x,y){
    if(ship.includes({x,y})) return;
    if(y > 1 && isShipCell(rivalTable.rows[y].cells[x])) {
        pushCell(x, y);
        checkUp(x,y-1)
    }
}

function checkDown(x,y){
    if(ship.includes({x,y})) return;
    if(y < 10 && isShipCell(rivalTable.rows[y].cells[x])) {
        pushCell(x, y);
        checkDown(x,y+1)
    }
}

//check is whole ship hitten
function isAll(){
    for (var i = 0; i < ship.length; i++) {
        if (!rivalTable.rows[ship[i].y].cells[ship[i].x].hasAttribute('hitten')) return false;
    }
    return true;
}

//set hitten cell values
function setCell(x, y) {
    if(!rivalTable.rows[y].cells[x].hasAttribute('hitten')){
        rivalTable.rows[y].cells[x].style.backgroundColor = 'grey';
        rivalTable.rows[y].cells[x].setAttribute("hitten", "true");
        rivalTable.rows[y].cells[x].style.cursor = 'unset';
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