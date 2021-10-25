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

// ajout de l'écouteur d'évènement permettant la modification des tâches sur chacunes des tâches
document.addEventListener('DOMContentLoaded', function(){
    let p = document.querySelectorAll('p');
    console.log(p);
        for(let input of p){
            input.addEventListener('click', editTask)
        }
})

/* affiche un input à la place du p pour modifier le nom de la tâche
* index = index de la tâche cliqué
* task = nom de la tâche
* eventlistener quand le contenu de l'input n'est plus le même
*/
function editTask(){
    let index = this.parentNode.firstElementChild.getAttribute('index');
    let task = this.parentNode.children[1].textContent
    let p = this.parentNode.children[1];
    p.insertAdjacentHTML('afterend', '<input type=text value="'+ task + '" id ="modify">');
    p.setAttribute('style', 'display:none');
    let input = this.parentNode.querySelector('input#modify')
    input.addEventListener('change', saveModifiedTask(index)); 
}

/* enregistre le nom de la tâche modifiée quand le contenu de l'input n'est plus le même
*/
function saveModifiedTask(index){
    let modifiedTask = this.value;
    //p.removeAttribute('style');
    //p.textContent = modifiedTask;
    //this.parentNode.removeChild(input);
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    storedTasks[index]['taskDefinition'] = modifiedTask;
    localStorage.setItem('tasks',JSON.stringify(storedTasks));
    displayTasks();
}