var listPopulation = ['Complete online javascript course','Jog around the park 3x','10 minutes meditation', 'Read for 1 hour', 'Pick up groceries','Do the locomotion'];
var listPopulationStatus = ["checked" , "", "", "", "", ""];
var list = document.getElementById('itemList');
var listHeight = document.getElementsByTagName("main")[0].clientHeight;
//gives height to ul
document.getElementById("itemList").style.height=listHeight+"px";
window.onload = populateTable();
function populateTable(){
    for(var i=0; i<listPopulation.length; i++){
        addListElement(i);
    }
}
function addListElement(i){
    var node = document.createElement("li");
        node.insertAdjacentHTML('afterbegin', '<div class="d-flex justify-content-between list__item">'+
        '<label class="container__checkbox d-flex align-items-center position-relative" for="checkbox'+(i+1)+'">'+'<input type="checkbox" id="checkbox'+(i+1)+'" name="checkbox'+(i+1)+'" onchange = changePopulationStatus("checkbox'+(i+1)+'") value="'+(i+1)+'" '+ listPopulationStatus[i] +'>'+'<span class="container__checkbox--text pe-3 ps-3">'+ listPopulation[i] +'</span></label>'+'<button class="button__delete" onclick="deleteListItem(\''+(i+1)+'\')"></button>'+
    '</div>');
        node.setAttribute("style","height: "+(listHeight/5)+"px;");
        node.draggable=true;
        list.appendChild(node);
}
// const compare = (e) =>{
//     var index1 = indexOf(dragging);
//     var index2 = indexOf(draggedOver);
//     splice(index1, 1);
//     splice(index2, 0, dragging);
// }
// const setDraggedOver = (e) => {
//     e.preventDefault();
//     draggedOver = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
// }
    
// const setDragging = (e) =>{
//     dragging = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
// }
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
    console.log(idToDelete);
    console.log(listPopulation.splice(idToDelete-1, 1));
    console.log(listPopulationStatus.splice(idToDelete-1, 1));
}
function changePopulationStatus(idToChange){
    var element = document.getElementById(idToChange).checked;
    var elementIndex = parseInt(idToChange.slice(8,idToChange.length))-1;
    if(element==true){
        listPopulationStatus[elementIndex]="checked";
    }else{
        listPopulationStatus[elementIndex]="";
    }
}
function showAll(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
    }
}
function showActive(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        if(listPopulationStatus[i]=="checked"){
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.add("d-none");
        }else{
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
        }
    }
}
function showCompleted(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        if(listPopulationStatus[i]==""){
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.add("d-none");
        }else{
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
        }
    }
}
function showNewTask(){
    if(document.getElementById("newTaskText").classList.contains("d-none")){
        document.getElementById("newTaskText").classList.remove("d-none");
        document.getElementsByClassName("newtask")[0].getElementsByTagName("button")[1].classList.remove("d-none");
        document.getElementsByClassName("newtask")[0].getElementsByTagName("span")[0].classList.add("d-none");
    }else{
        document.getElementById("newTaskText").classList.add("d-none");
        document.getElementsByClassName("newtask")[0].getElementsByTagName("button")[1].classList.add("d-none");
        document.getElementsByClassName("newtask")[0].getElementsByTagName("span")[0].classList.remove("d-none");
    }
}
function addNewTask(){
    var text = document.getElementById("newTaskText").value;
    if(text.length<35){
        listPopulation.push(text);
        listPopulationStatus.push("");
        addListElement(listPopulation.length-1);
    }
}