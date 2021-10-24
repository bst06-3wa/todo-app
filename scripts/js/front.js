'use-strict';

// li.getAttribute('index')
let app = document.querySelector('#app');
let tasks = document.getElementsByTagName('li')
let checkbox = document.getElementsByClassName('checkbox');
//fonction permettant de trier les tầche dans un tableau
//et de mettre celles qui sont validé en dernière position.
function sortTask(){

}
//fonction permettant d'afficher les tâches triées.

// fonction permettant de changer le statut d'une tâche
// l'index et le status sont directement récupérés du DOM
// ces informations sont placé lors de la génaration des tâches
// par la fonction displayTasks
function taskDone(){
    let index = parseInt(this.getAttribute('index'));
    let status = !JSON.parse(this.getAttribute('status'));//on utilise JSON.parse pour convertir la sting en booléen et on lui affecte son nouveau statut
    
    this.checked = status
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    storedTasks[index]['status'] = status;
    localStorage.setItem('tasks',JSON.stringify(storedTasks));
    displayTasks();
}
