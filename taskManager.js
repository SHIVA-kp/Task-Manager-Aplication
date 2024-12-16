//Task Constructor
class Task{
    Constructor(id, title, description, priority){
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }
    markAsCompleted(){
        this.completed = true;
    }
    delete(){
        return this.id;
    }
}
class TaskManager{
    constructor(){
        this.tasks = this.loadTasksFromLocalStorage();
    }
    addTask(title, description, priority){
        const id = Date.now();
        const task = new Task(id, title, description, priority);
        this.tasks.push(task);
        this.saveTaskToLocalStorage();
    }
    markTaskAsCompleted(id){
        const task = this.task.find(task => task.id === id);
        if(task) task.markAsCompleted();
        this.saveTaskToLocalStorage();
    }
    deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTaskToLocalStorage();
    }
    filterTasks(status){
        if(status === "completed"){
            return this.tasks.filter(task => task.completed);
        }else if(status === "incompleted"){
            return this.tasks.filter(task => !task.completed);
        }else {
            return this.tasks;
        }
    }
    saveTaskToLocalStorage(){
        localStorage.setIten("tasks", JSON.stringify(this.tasks));
    }
    loadTasksToLocalStorage(){
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    }
    sortTasksBypriority(){
        const priorityOrder = ["High", "Medium","Low"];
        return this.tasks.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
    }
}
const taskManager = new TaskManager();

function addTask(){
    const title = document.getElementById("taskTitle").ariaValueMax;
    const description = document,getElementById("taskDescription").valueOf;
    const priority = document.getElementById("taskPriority").value;
    
    if(!title || !description){
        alert("Title and description are required.");
        return;
    }
    taskManager.addTask(title, description, priority);
    document.getElementById("tastTitle").value = " ";
    document.getElementById("taskDescription").value = " ";
    displayTask("all");
}
function displayTask(filterStatus = "all"){
    const taskListContainer = document.getElementById("taskList");
    const filteredTasks = taskManager.filterTasks(filterStatus);
    const sortedTasks = taskManager.sortTasksBypriority();
    taskListContainer.innerHTML = " ";
    sortedTasks.forEach(task => {
        const taskDiv = document.createdElement("div");
        taskDiv.classList.add("task");
        if(task.completed) taskDiv.classList.add("completed");
        taskDiv.innerHTML = `
        <h4${task.title} <span(${task.priority})</span</h4>
        <P>${task.description}</p>
        <button onclick="markTaskCompleted(${task.priority})"<${task.completed ? "completed" : "Mark as completed"}</button>
        <button onlisk="deleteTask(${task.id})">Delete</button>
         `;
         taskListContainer.appendChild(taskDiv);
    });
}
function deleteTask(id){
    taskManager.deleteTask(id);
    displayTasks(statuse);
}
displayTask("all");