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
    /* enregistre le nom de la tâche modifiée quand le contenu de l'input n'est plus le même
    * remplace l'input par un p avec le contenu modifiée
    */
    input.addEventListener('change', function(){
        let modifiedTask = this.value;
        p.removeAttribute('style');
        p.textContent = modifiedTask;
        this.parentNode.removeChild(input);
        let storedTasks = localStorage.getItem('tasks');
        storedTasks = JSON.parse(storedTasks);
        storedTasks[index]['taskDefinition'] = modifiedTask;
        localStorage.setItem('tasks',JSON.stringify(storedTasks));
    }); 
    
}


