var listPopulation = ['Complete online javascript course','Jog around the park 3x','10 minutes meditation', 'Read for 1 hour', 'Pick up groceries','Do the locomotion'];
var listPopulationStatus = ["checked" , "", "", "", "", "", ""];
var list = document.getElementById('itemList')
window.onload = populateTable();
function populateTable(){
    //gives height of main to ul
    var listHeight = document.getElementsByTagName("main")[0].clientHeight;
    document.getElementById("itemList").style.height=listHeight+"px";
    for(var i=0; i<listPopulation.length; i++){
        alert(i);
        var node = document.createElement("li");
        node.insertAdjacentHTML('afterbegin', '<div class="d-flex justify-content-between list__item">'+
        '<label class="container__checkbox d-flex align-items-center position-relative" for="checkbox'+(i+1)+'">'+'<input type="checkbox" id="checkbox'+(i+1)+'" name="checkbox'+(i+1)+'" value="'+(i+1)+'" '+ listPopulationStatus[i] +'>'+'<span class="container__checkbox--text pe-3 ps-3">'+ listPopulation[i] +'</span></label>'+'<button class="button__delete" onclick="deleteListItem(\'1\')"></button>'+
    '</div>');
        alert(listHeight);
        node.setAttribute("style","height: "+(listHeight/5)+"px;");
        node.draggable=true;
        // node.innerHTML=listPopulation[i];
        list.appendChild(node);
    }
}
const compare = (e) =>{
    var index1 = indexOf(dragging);
    var index2 = indexOf(draggedOver);
    splice(index1, 1);
    splice(index2, 0, dragging);
}
const setDraggedOver = (e) => {
    e.preventDefault();
    draggedOver = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
}
    
const setDragging = (e) =>{
    dragging = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
}
function changeDayNight(){
    if(document.getElementById("moonIcon").classList.contains("d-none")){
        document.getElementById("moonIcon").classList.remove("d-none");
        document.getElementById("sunIcon").classList.add("d-none");
        // toogle nightmode
    }else{
        document.getElementById("sunIcon").classList.remove("d-none");
        document.getElementById("moonIcon").classList.add("d-none");
        // toggle daymode
    }
}
function deleteListItem(idToDelete){
    var elem = document.getElementsByTagName("li")[idToDelete-1];
    elem.parentNode.removeChild(elem);
    listPopulation.splice(idToDelete-1, 1);
    listPopulationStatus.splice(idToDelete-1, 1);
}