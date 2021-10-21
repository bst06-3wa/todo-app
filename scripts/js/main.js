'use strict'
//  id input = "input";
// id button = "add";
// task status : 0 à faire 
//               1 faite
document.addEventListener('DOMContentLoaded', function(){
    let app = document.getElementById('app');
    let button = document.getElementById('add');
    
    
    button.addEventListener('click', function(){
        let inputValue = document.querySelector('#input').value;
        //console.log(inputValue);
        addTask(inputValue);
    });

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
})

