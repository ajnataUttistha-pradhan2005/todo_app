const currentTasks = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    const taskInput = document.querySelector('#add-task');
    const olTaskList = document.querySelector('.task-list'); 

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            currentTasks.push(taskValue);
            taskInput.value = ''; 

            olTaskList.innerHTML = ''; 
            currentTasks.forEach((task, taskIndex) => {
                let divTasks = document.createElement('div');
                divTasks.classList.add('tasks', `task${taskIndex + 1}`);

                let liTasks = document.createElement('li');
                liTasks.classList.add(`task${taskIndex + 1}`);
                liTasks.innerHTML = `<p>${task}</p>`;
                divTasks.appendChild(liTasks);

                let inputCheckBox = document.createElement('input');
                inputCheckBox.setAttribute('type', 'checkbox');
                inputCheckBox.classList.add('complete-check');
                divTasks.appendChild(inputCheckBox);

                let currentStatusBtn = document.createElement('button');
                currentStatusBtn.classList.add('complete-removebtn');
                currentStatusBtn.innerText = 'Done';
                divTasks.appendChild(currentStatusBtn);

                olTaskList.appendChild(divTasks);
            });
        }
    });

    olTaskList.addEventListener('change', (event) => {
        if (event.target.classList.contains('complete-check')) {
            let liElementChBx = event.target.closest('div').querySelector('li');
            if (liElementChBx) {
                liElementChBx.dataset.checkboxChecked = event.target.checked;
            }
        }
    });
    
    olTaskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('complete-removebtn')) {
            let liElement = event.target.closest('div').querySelector('li');
            if (liElement && liElement.dataset.checkboxChecked === 'true') {

                let liElementIndex = Array.from(olTaskList.children).indexOf(event.target.closest('div'));
                event.target.innerText = 'Remove'; 
                event.target.classList.replace('complete-removebtn','removebtn');
                let removeBtn = event.target;
                removeBtn.addEventListener('click', (event) =>{
                    
                if (liElementIndex !== -1) {
                    // Remove the specific div that contains the task
                    olTaskList.removeChild(olTaskList.children[liElementIndex]);
                    currentTasks.splice(liElementIndex,1);
                }

                });
            }
        }
    });
});