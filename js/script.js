
let form = document.querySelector('#task_form');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

form.addEventListener('submit', addTask);
tasklist.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);

function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a Task')
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link)

        tasklist.appendChild(li)

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value='';
    }
}

function removeTask(e){
    if(e.target.hasAttribute("href")){
        if (confirm("Are you sure?")){
            // console.log(e.target)
            let ele = e.target.parentElement;
            // console.log(ele)
            ele.remove()
            removeFormLS(ele);
        }
        
    }
    
}

function clearTask(e){

    // tasklist.innerHTML=""
    localStorage.clear();
    location.reload();
}

function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1) {
            task.style.display = 'block';

        }else{
            task.style.display = 'none'
        }
    })
}

function storeTaskInLocalStorage(task){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks =[];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks =[];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link)

        tasklist.appendChild(li);
    });
}

function removeFormLS(taskItem){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks =[];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if (li.textContent.trim()=== task){
            tasks.splice (index ,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}