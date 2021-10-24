'use-strict';

// li.getAttribute('index')
let app = document.querySelector('#app');
let tasks = document.getElementsByTagName('li')
let checkbox = document.getElementsByClassName('checkbox');
let delBtn = document.querySelector(".trash-content i")

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
/* 
    fonctionnant permmettant la suppréssion de tâches
*/
function delTask(){
    /* 
        l'index est placé sur la checkbox donc je suis obligé de remonter jusqu'à l'élément parent
         le "li", pour redescendre jusqu'à la checbox et récupérer l'index
    */
    let index = parseInt(this.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute('index'));
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    storedTasks.pop(storedTasks[index]);
    localStorage.setItem('tasks',JSON.stringify(storedTasks));
    displayTasks();
}
