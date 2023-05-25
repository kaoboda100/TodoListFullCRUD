//Creating variable
const inputBox = document.querySelector('.inputbox input');
const addTaskBtn = document.querySelector('.inputbox button');
const updateTaskBtn = document.querySelector('.update')
const todoList = document.querySelector('.todoList');
const clearAllBtn = document.querySelector('.footer button');

//change language
const changeLang = () => document.querySelector('.lang').addEventListener('click',() => {
    let taskStorage = localStorage.getItem('Tasks')
    document.querySelector('header').textContent = 'Danh Sách Việc';
    document.querySelector('h4').textContent = 'Công việc';
    document.querySelector('.footer button').textContent = 'Xóa Hết ';
    
    if(taskStorage == null) {
        listArray = [];
    } else {

        listArray = JSON.parse(taskStorage)
    }
    const pendingTaskNumber = document.querySelector('.footer span')
    pendingTaskNumber.textContent = `Bạn Có ${listArray.length}  Việc Cần Làm `
})
changeLang()

//Function display Tasks
const displayTasks = () => {
    let taskStorage = localStorage.getItem('Tasks');

    if(taskStorage == null) {
        listArray = [];
    } else {

        listArray = JSON.parse(taskStorage)
    }
    
    const pendingTaskNumber = document.querySelector('.footer span')
    pendingTaskNumber.textContent = `You have ${listArray.length} pending Tasks `;
    let html = ''
    listArray.forEach((e,i) => {
        html +=`
        <li>${e}
            <span class="iconPen" onclick="editTask(${i})"> <i class="fa-solid fa-pen fa-beat-fade"></i></i> </span>
            <span class="icon" onclick="singleTaskDelete(${i})"> <i class="fa-solid fa-trash fa-bounce"></i> </span>
        </li>`;
        todoList.insertAdjacentHTML('afterbegin',html);
        
    })
    todoList.innerHTML = html
    
}   

/// active Button
inputBox.onkeyup = () => {
    const inputValue = inputBox.value.trim();
     if(inputValue != 0) {
         addTaskBtn.classList.add('active');
         updateTaskBtn.classList.add('active');
     } else {
        addTaskBtn.classList.remove('active');
        updateTaskBtn.classList.remove('active');
     }
 }

/// Add Task Button
addTaskBtn.addEventListener('click',() => {
    
    const inputValue = inputBox.value.trim()
    

    
    ///////////////////////////////////////////////////////
    let taskStorage = localStorage.getItem('Tasks');

    if(taskStorage == null) {
        listArray = [];
    } else {

        listArray = JSON.parse(taskStorage)
    }
   
    listArray.push(inputValue)
    
    localStorage.setItem("Tasks", JSON.stringify(listArray))



    displayTasks()
    /////////////////////////////////////////////////////////
    inputBox.value = '';
    addTaskBtn.classList.remove('active');
})
/// Clear all Button
clearAllBtn.onclick = () => {
    listArray = [];

    localStorage.setItem("Tasks", JSON.stringify(listArray));

    displayTasks();

}

/// single Task delete
const singleTaskDelete = i =>  {
    let taskStorage = localStorage.getItem('Tasks');

    if(taskStorage == null) {
        listArray = [];
    } else {

        listArray = JSON.parse(taskStorage)
    }


    listArray.splice(i,1)
   
    localStorage.setItem("Tasks", JSON.stringify(listArray))
    
    displayTasks()

    /////////////////////////Update UI
    addTaskBtn.classList.remove('hidden');

    updateTaskBtn.classList.add('hidden');

    inputBox.value = '';
}

/*
/// edit task button
const editTask = i => {
    inputBox.value = listArray[i];
    
   
    
    return confirmEditedTask(i);
   
    
};


/// confirm button
const confirmEditedTask = i => {;
    updateTaskBtn.addEventListener('click',() => {
        let taskStorage = localStorage.getItem('Tasks');

            if(taskStorage == null) {
            listArray = [];
         } else {

        listArray = JSON.parse(taskStorage);
         }



        listArray[i] = inputBox.value;
        console.log(listArray);
        
        addTaskBtn.classList.remove('hidden');

        updateTaskBtn.classList.add('hidden');

        updateTaskBtn.classList.remove('active')

        clearAllBtn.classList.remove('disable')


        
        
        localStorage.setItem("Tasks", JSON.stringify(listArray));
        displayTasks();
        return inputBox.value = ''
    })
}
*/
/*
const allTask = document.querySelectorAll('li')
allTask.forEach((task,index) => {
    task.querySelector('.iconPen').addEventListener('click',() => {
        inputBox.value = task.textContent.trim();
    
        addTaskBtn.classList.add('hidden');
        
        updateTaskBtn.classList.remove('hidden');
    
        clearAllBtn.classList.add('disable');
        
        /////Get local storage//////
        let taskStorage = localStorage.getItem('Tasks');
        
        if(taskStorage == null) {
            listArray = [];
        } else {
            listArray = JSON.parse(taskStorage);
        };
        /////////////////////////////////////////////////////////////

        updateTaskBtn.addEventListener('click',() => {
            listArray[index] = inputBox.value;
            
            addTaskBtn.classList.remove('hidden');

            updateTaskBtn.classList.add('hidden');

            clearAllBtn.classList.remove('disable');
            
            localStorage.setItem("Tasks", JSON.stringify(listArray));
            displayTasks();

            
        })
        
         

    })
})
*/

/// When click on pencil Icon
function editTask(i) {
    let taskStorage = localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];
    
    document.querySelector('#index').value = i;


    ///////   Update UI
    inputBox.value = taskStorage[i];
        
    addTaskBtn.classList.add('hidden');
        
    updateTaskBtn.classList.remove('hidden');

    clearAllBtn.classList.add('disable');

}

/// When click on confirm
const confirmEdit= () => {
    let taskStorage = localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];
    let index = document.querySelector('#index').value
    taskStorage[index] =  inputBox.value;
    localStorage.setItem("Tasks", JSON.stringify(taskStorage))

    
    ///////   Update UI
    addTaskBtn.classList.remove('hidden');
    updateTaskBtn.classList.add('hidden');

    clearAllBtn.classList.remove('disable');

    displayTasks();
    
    inputBox.value = [];
    addTaskBtn.classList.remove('active');

}   
