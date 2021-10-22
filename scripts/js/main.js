'use strict'
//  id input = "input";
// id button = "add";
// task status : 0 à faire 
//               1 faite
document.addEventListener('DOMContentLoaded', function(){
    let app = document.getElementById('app');
    let button = document.getElementById('add');
    displayTasks();
    
    
    button.addEventListener('click', function(){
        let inputValue = document.querySelector('#input').value;
        //console.log(inputValue);
        addTask(inputValue);
        displayTasks();
        inputValue = document.querySelector('#input').value = '';
    });
})


/* fonction qui prend en paramètre la valeur de l'input
** storedTasks récupère les tâches déjà stockés dans le local storage // s'initialise en tableau vide si rien de stocké
** newTask défini la nouvelle tâche avec la valeur de l'input et un statut à faire
** newTask est push dans le tableau storedTasks et ajouté au local storage
*/
function addTask(task){
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    //console.log(storedTasks);
    if(storedTasks === null){
        storedTasks = [];
    }
    let newTask = {'taskDefinition': task, 'status' : '0'};
    storedTasks.push(newTask);
    //console.log(storedTasks);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

/*
** storedTasks récupère les tâches déjà stockés dans le local storage // ne va pas plus loin si vide
** récupère la longueur du tableau pour boucler et afficher les tâches 
*/
function displayTasks(){
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    if(storedTasks !== null){
        let length = storedTasks.length;
        //console.log(length);
        for(let i = 0; i<length; i++){
            app.insertAdjacentHTML('afterbegin', '<li class="task task-container"><div class="check-text"><input type="checkbox" class="checkbox"><p>' + storedTasks[i]['taskDefinition'] + '</p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div></li>')
        }
    }
}