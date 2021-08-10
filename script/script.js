var listPopulation = ['Complete online javascript course','Jog around the park 3x','10 minutes meditation', 'Read for 1 hour', 'Pick up groceries'];
var listPopulationStatus = [1 , 0, 0, 0, 0, 0];
window.onload = populateTable();
function populateTable(){
    for(var i=0; i<listPopulation.length; i++){
        document.getElementsByClassName("container__checkbox--text")[i].innerHTML=listPopulation[i];
        if(listPopulationStatus[i]==1){
            document.getElementById("checkbox"+(i+1)).setAttribute("checked", "checked");
        }else{
            document.getElementById("checkbox"+(i+1)).checked = false;
        }
    }
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
    // listPopulation.splice(idToDelete-1, 1);
    // listPopulationStatus.splice(idToDelete-1, 1);
    listPopulation.push("");
    listPopulationStatus.push(0);
    populateTable();
}