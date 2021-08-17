var listPopulation = ['Complete online javascript course','Jog around the park 3x','10 minutes meditation', 'Read for 1 hour', 'Pick up groceries','Do the locomotion'];
var listPopulationStatus = ["checked" , "", "", "", "", ""];
var listPopulationId = [1,2,3,4,5,6]; 
var list = document.getElementById('itemList');
var listHeight = document.getElementsByTagName("main")[0].clientHeight;
var dragId, dropId, dragSrcEl;
var itemsLeftText=" items left";
var thisId = false; //i set thisid false when is not in drag and drop so if it's a drag and drop operation the changeid function won't change the index of checked
let items = document.querySelectorAll('li');
//gives height to ul
document.getElementById("itemList").style.height=listHeight+"px";
window.onload = populateTable();
function populateTable(){
    for(var i=0; i<listPopulation.length; i++){
        addListElement(i);
    }
}
function refreshItemsLeft(){
    document.getElementById("items__left--label").innerHTML = listPopulation.length + itemsLeftText;
}
//given an index number populate the html with a corresponding element wid id of checkbox, value etc of [i+1]
function addListElement(i){
    //add an element with checkbox id =i+1
    var node = document.createElement("li");
        node.insertAdjacentHTML('afterbegin', '<div class="d-flex justify-content-between list__item">'+
        '<label class="container__checkbox d-flex align-items-center position-relative" for="checkbox'+(listPopulationId[i])+'">'+'<input type="checkbox" id="checkbox'+(listPopulationId[i])+'" name="checkbox'+(listPopulationId[i])+'" onchange = changePopulationStatus("'+(listPopulationId[i])+'") value="'+(listPopulationId[i])+'" '+ listPopulationStatus[i] +'>'+'<span class="container__checkbox--text pe-3 ps-3">'+ listPopulation[i] +'</span></label>'+'<button class="button__delete" onclick="deleteListItem(\''+(listPopulationId[i])+'\')"></button>'+
    '</div>');
        node.setAttribute("style","height: "+(listHeight/5)+"px;");
        node.draggable=true;
        node.addEventListener('dragstart', handleDragStart, false);
        node.addEventListener('dragend', handleDragEnd, false);
        node.addEventListener('dragover', handleDragOver, false);
        node.addEventListener('dragenter', handleDragEnter, false);
        node.addEventListener('dragleave', handleDragLeave, false);
        node.addEventListener('drop', dragDrop, false);
        node.id= listPopulationId[i];
        list.appendChild(node);
        refreshItemsLeft();
}
//start the dragging, i get this id and saves in thisId var same for the content saved in dragSrcEl
//and change this opacity to "ghost" it
function handleDragStart(e) {
    this.style.opacity = '0.33';
    dragId = this.id;
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
//return the opacity of the item i dragged to 1
function handleDragEnd(e) {
    this.style.opacity = '1';
    // items.forEach(element => element.classList.remove('over');
    // });
}
//just standard prevent devault of the browser
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
}
//i would like to add the class over to gives a different border to the item but when i go over the 
//other content of <li></li> starts the handledragleave(e) and makes a mess
function handleDragEnter(e) {
    // this.classList.add('over');
}
//messy shit start event even when i go over the div and checkbox inside the <li></li>
function handleDragLeave(e) {
    // this.classList.remove('over');
}
//swapping content on dragdrop
function dragDrop(e) {
    e.stopPropagation();
    if (dragSrcEl !== this) {
        var temp="";
        thisId = getIndexId(this.id);
        dragId = getIndexId(dragId);
        console.log("changing" + dragId +" with " + thisId);
        //nope
        temp= listPopulation[thisId];
        listPopulation[thisId]=listPopulation[dragId];
        listPopulation[dragId]=temp;
        temp= listPopulationStatus[thisId];
        listPopulationStatus[thisId]=listPopulationStatus[dragId];
        listPopulationStatus[dragId]=temp;
        temp= listPopulationId[thisId];
        document.getElementById(listPopulationId[dragId]).id=listPopulationId[thisId];
        this.id=listPopulationId[dragId];
        listPopulationId[thisId]=listPopulationId[dragId];
        listPopulationId[dragId]=temp;
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        //check if the  checkbox is still cheched, because if you press on it on the drag and drop operation it would change the icon but not the value in the array listpopulationstatus
        if( !this.getElementsByTagName("input")[0].checked && listPopulationStatus[thisId]=="checked"){
            this.getElementsByTagName("input")[0].checked=true;
        }else if( this.getElementsByTagName("input")[0].checked && listPopulationStatus[thisId]==""){
            this.getElementsByTagName("input")[0].checked=false;
        }
        dragId="null";
        thisId=false; //i set thisid false when is not in drag and drop so if it's a drag and drop operation the changeid function won't change the index of checked
    }
    return false;
}
function changeDayNight(){
    if(document.getElementById("moonIcon").classList.contains("d-none")){
        document.getElementById("moonIcon").classList.remove("d-none");
        document.getElementById("sunIcon").classList.add("d-none");
        // toogle nightmode
        document.documentElement.style.setProperty('--DarkGrayishBlue', "hsl(236,33%,92%)");
        document.documentElement.style.setProperty('--VeryDarkBlue', 'hsl(233,11%,84%)');
        document.documentElement.style.setProperty('--VeryDarkGrayishBlue', 'hsl(0,0%,98%)');
        document.documentElement.style.setProperty('--LightGrayishBlue', 'hsl(235,19%,35%)');
        document.documentElement.style.setProperty('--DarkGrayishBlueFooter', 'hsl(236,9%,61%)');
        document.documentElement.style.setProperty('--backgroundImageLg', 'url("../images/bg-mobile-light.jpg")');
        document.documentElement.style.setProperty('--backgroundImageSm', 'url("../images/bg-desktop-light.jpg")');
    }else{
        document.getElementById("sunIcon").classList.remove("d-none");
        document.getElementById("moonIcon").classList.add("d-none");
        // toggle daymode
        document.documentElement.style.setProperty('--DarkGrayishBlue', "hsl(234,11%,52%)");
        document.documentElement.style.setProperty('--VeryDarkBlue', 'hsl(235,21%,11%)');
        document.documentElement.style.setProperty('--VeryDarkGrayishBlue', 'hsl(233,14%,35%)');
        document.documentElement.style.setProperty('--LightGrayishBlue', 'hsl(234,39%,85%)');
        document.documentElement.style.setProperty('--DarkGrayishBlueFooter', 'hsl(234,11%,52%)');
        document.documentElement.style.setProperty('--backgroundImageLg', 'url("../images/bg-mobile-dark.jpg")');
        document.documentElement.style.setProperty('--backgroundImageSm', 'url("../images/bg-desktop-dark.jpg")');
    }
}
//givend the id to delete search for it in the array id, return the index and delete the corresponding index elewment in html and arrays
function deleteListItem(idToDelete){
    var indexToDelete = getIndexId(idToDelete); 
    var elem = document.getElementsByTagName("li")[indexToDelete];
    elem.parentNode.removeChild(elem);
    listPopulation.splice(indexToDelete, 1);
    listPopulationStatus.splice(indexToDelete, 1);
    listPopulationId.splice(indexToDelete, 1);
    refreshItemsLeft();
}
//functions that given an id of the checkbox (es 1 for checkbox1) return the index from the listPopulationId
function getIndexId(id){
    for(var i=0; i<listPopulationId.length;i++){
        if(id==listPopulationId[i]){
            console.log(i);
            return i;
        }
    }
}
//given the id number (es 1 for checkbox 1) get the id of the element and change both the status and the value in the listPopulationStatus where the selected id is
function changePopulationStatus(idToChange){
    //i set thisid false when is not in drag and drop so if it's a drag and drop operation it won't change the index of checked
    if(thisId == false){
        var element = document.getElementById("checkbox"+idToChange).checked;
        var elementIndex = getIndexId(idToChange);
        if(element==true){
            listPopulationStatus[elementIndex]="checked";
        }else{
            listPopulationStatus[elementIndex]="";
        }
    }
}
//show all the elements
function showAll(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
    }
}
//show just the elements that corespond for the listPopulationStatus ""
function showActive(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        if(listPopulationStatus[i]=="checked"){
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.add("d-none");
        }else{
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
        }
    }
}
//show the elementes that corespond to "checked" in the listpopulationstatus, furthermore enable the "delete all checked" button
function showCompleted(){
    for(i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        if(listPopulationStatus[i]==""){
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.add("d-none");
        }else{
            document.getElementsByTagName("main")[0].getElementsByTagName("li")[i].classList.remove("d-none");
        }
    }
}
//search for elements with "completed" value inside the listpopulationstatus and gives the delete command to it
function deleteCompleted(){
    for(var i=0; i<document.getElementsByTagName("main")[0].getElementsByTagName("li").length; i++){
        if(listPopulationStatus[i]=="checked"){
            deleteListItem(listPopulationId[i]);
            //i gives i a position back if i don't it will jump the next position because the array is  position shorter
            i--;
        }
    }
}
//shows and hide the addnew task text input and button
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
//add a new task in the html and arrays
function addNewTask(){
    var text = document.getElementById("newTaskText").value;
    var exit = false;
    if(text.length<35){
        //push the content in the lisPopulation that contains the text
        listPopulation.push(text);
        //push the content as not cecked in the LitPopulationstatus array
        listPopulationStatus.push("");
        //serch the lispopulationid array
        for(var i=0; i<(listPopulationId.length +1) && exit==false ;i++){
            //if listpopulationid doesn't contain the i number then assign it to a new element and add it to html via the function addListElement
            if(include(listPopulationId,(i+1))==false){
                listPopulationId.push(i+1);
                addListElement(listPopulationId.length-1);
                //if the id is contained i exit the loop
                exit = true;
                document.getElementById("newTaskText").value="";
            }
        }
    }
    document.getElementById("newTaskText").classList.add("d-none");
    document.getElementsByClassName("newtask")[0].getElementsByTagName("button")[1].classList.add("d-none");
    document.getElementsByClassName("newtask")[0].getElementsByTagName("span")[0].classList.remove("d-none");
}
//return true if the value is included in the array, false if isn't included
function include(array, value){
    var isIcluded = false;
    for(var i=0; i<array.length;i++){
        if(value==array[i]){
            return true;
        }
    }
    return isIcluded;
}