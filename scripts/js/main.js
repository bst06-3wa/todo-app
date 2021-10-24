<<<<<<< HEAD
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
    let length = storedTasks.length-1; // pour donner un numéro d'index cohérent
    let newTask = {'taskIndex' : length+1,'taskDefinition': task, 'status' : false};
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
        let doneTasks = [];
        let toDoTasks = [];
        //console.log(length);
        app.innerHTML = ""; //permet de vider le contenu de la div app avant la génération de toute les tâches à chaque appel de la fonction.
        for(let i = 0; i<length; i++){ //ajoute les tâches à un des deux tableaux suivant leur statut
            if(storedTasks[i]['status']){
                toDoTasks.push(storedTasks[i]);
            }
            else {
                doneTasks.push(storedTasks[i]);
            }
        }
        let tasks = toDoTasks.concat(doneTasks);  //regroupe les 2 tableaux
        let tasksLength = tasks.length;
        //console.log(tasks);
        
        for(let i = 0; i < tasksLength; i++){
            if(tasks[i]['status']){
                app.insertAdjacentHTML('afterbegin', '<li class="task task-container"><div class="check-text"><input type="checkbox" class="checkbox" checked index = "' + tasks[i]['taskIndex'] + '" status="' + tasks[i]['status'] + '"><p>' + tasks[i]['taskDefinition'] + '</p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div></li>')
            }else{
    
                app.insertAdjacentHTML('afterbegin', '<li class="task task-container"><div class="check-text"><input type="checkbox" class="checkbox" index = "' + tasks[i]['taskIndex'] + '" status="' + tasks[i]['status'] + '"><p>' + tasks[i]['taskDefinition'] + '</p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div></li>')
            }
        }
        // ajout de l'écouteur d'évènement permettant la modification des tâches sur chacunes des checkbox
        let checkbox = document.getElementsByClassName('checkbox')
        for(let input of checkbox){
            input.addEventListener('click',taskDone)
        }
        // for(let task of storedTasks){
        //     let li = document.createElement('li');
        //     li.classList.add('task', 'task-container');
        //     li.innerHTML = `<div class="check-text"><input type="checkbox" class="checkbox"><p> ${task['taskDefinition']} </p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div>`;
        //     app.appendChild(li);
        //}
    }
}
=======
'use strict';
>>>>>>> f6179fdb8e0eb0b5d1b12dccd26934b6434d2e9e
