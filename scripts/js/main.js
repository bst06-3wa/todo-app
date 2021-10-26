'use strict'

const inputAddTask = document.querySelector('#input');
const button = document.getElementById('add');
let versionLabel = document.querySelector('.version')
document.addEventListener('DOMContentLoaded', function(){
    const app = document.getElementById('app');
    displayTasks();
    
    
    button.addEventListener('click', function(){
        let inputValue = inputAddTask.value;
        addTask(inputValue);
        displayTasks();
        inputValue = document.querySelector('#input').value = '';
    });
    inputAddTask.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){
            let inputValue = inputAddTask.value;
            addTask(inputValue);
            displayTasks();
            inputValue = document.querySelector('#input').value = '';
        }
    })

    /* 
        petit script qui va chercher la version du projet dans package.json
        et qui l'affiche dans le DOM
    */
    fetch('package.json').then((res)=>{
        let data = res.json();
        return data;
    }).then(res=>{
        versionLabel.innerHTML = res.version;
    })
})


/* fonction qui prend en paramètre la valeur de l'input
** storedTasks récupère les tâches déjà stockés dans le local storage // s'initialise en tableau vide si rien de stocké
** newTask défini la nouvelle tâche avec la valeur de l'input et un statut à faire
** newTask est push dans le tableau storedTasks et ajouté au local storage
*/
function addTask(task){
    if(task != ""){

        let storedTasks = localStorage.getItem('tasks');
        let newTask;
        storedTasks = JSON.parse(storedTasks);
        if(storedTasks === null || storedTasks.length == 0 ){
            storedTasks = [];
            newTask = {'taskIndex' : storedTasks.length,'taskDefinition': task, 'status' : false};
        }else{
            /*
             on prend le dernier index créé et on l'incrémente de 1, de cette façon on aura jamais 
             deux fois le même index (peut importe l'élément supprimé)
             */
            let index = storedTasks[storedTasks.length-1]['taskIndex'] +1; 
            newTask = {'taskIndex' : index,'taskDefinition': task, 'status' : false};
        }
        
        storedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }else{
        displayEmptyTaskError()
    }
}
function displayEmptyTaskError(){
    inputAddTask.style.border="1px solid red";
    inputAddTask.style.borderRadius="5px";
    inputAddTask.setAttribute('placeholder',"Veuillez remplir le champ avant de le soumettre");
     
    setTimeout(()=>{
        inputAddTask.style.border="none";
        inputAddTask.setAttribute('placeholder',"Add a task");
    },4000)
 }
/*
** storedTasks récupère les tâches déjà stockés dans le local storage // ne va pas plus loin si vide
** récupère la longueur du tableau pour boucler et afficher les tâches 
*/
function displayTasks(){
    let storedTasks = localStorage.getItem('tasks');
    storedTasks = JSON.parse(storedTasks);
    let doneTasks = [];
    let toDoTasks = [];
    if(storedTasks !== null){
        let length = storedTasks.length;
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
        
        for(let i = 0; i < tasksLength; i++){
            if(tasks[i]['status']){
                app.insertAdjacentHTML('afterbegin', '<li class="task task-container" array-position="' + i + '"><div class="check-text"><input type="checkbox" class="checkbox" checked index = "' + tasks[i]['taskIndex'] + '" status="' + tasks[i]['status'] + '"><p>' + tasks[i]['taskDefinition'] + '</p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div></li>')
            }else{
    
                app.insertAdjacentHTML('afterbegin', '<li class="task task-container" array-position="' + i + '"><div class="check-text" ><input type="checkbox" class="checkbox" index = "' + tasks[i]['taskIndex'] + '" status="' + tasks[i]['status'] + '"><p>' + tasks[i]['taskDefinition'] + '</p></div><div class="trash-content"><i class="far fa-trash-alt"></i></div></li>')
            }
        }
        // ajout de l'écouteur d'évènement permettant la modification des tâches sur chacunes des checkbox
        let checkbox = document.getElementsByClassName('checkbox')
        for(let input of checkbox){
            input.addEventListener('click',taskDone)
        }

        // ajout de l'écouteur d'évènement permettant la suppréssion des tâches sur chacunes des icons "trash"
        let delBtn = document.querySelectorAll('.trash-content i')
        for(let input of delBtn){
            input.addEventListener('click',delTask)
        }

         // ajout de l'écouteur d'évènement permettant la modification des tâches sur chaque p créé
         let task = document.querySelectorAll('.check-text p')
         for(let input of task){
             input.addEventListener('click',editTask)
         }
    }

    
}
