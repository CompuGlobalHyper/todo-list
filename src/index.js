import "./styles.css"
import { ToDoItem, Project, toDoList, doneList, allProjects} from "./todo.js";
import { HomePage } from "./home.js";
import { ProjectPage } from "./project.js";

HomePage.init(allProjects)
HomePage.renderToDoObject(toDoList)
let pageTitle = document.getElementById('to-do-title').textContent
console.log(pageTitle)

function addNew() {
    if (document.getElementById('name-input').value.trim() !== '') {
        let pageTitle = document.getElementById('to-do-title').textContent
        console.log(pageTitle)
        let name = document.getElementById('name-input').value
        let dueDate = document.getElementById('due-input').value
        let description = document.getElementById('details-input').value
        let project = document.getElementById('select').value

        let priorityCheck = document.getElementById('checkmark')
        let priority = priorityCheck

        let newToDo = new ToDoItem(name, description, dueDate, priority, project)
        toDoList.push(newToDo)
        if (pageTitle === 'To-Dos') {
            HomePage.renderToDoObject(toDoList)
        } 
        else {
            let match = allProjects.filter(obj => obj.title === pageTitle)
            HomePage.renderToDoObject(match[0].body)
        }
        
        clearDialog()
    }
}

function clearDialog() {
    let dialog = document.getElementById('to-do-dialog')
    let myForm = document.getElementById('to-do-form-main')
    let box = document.getElementById('priority-box')
    myForm.reset()
    box.innerHTML = ''
    dialog.close()
}

document.addEventListener('click', (event) => {
    const target = event.target
    //Adding a new to do
    if (target.id === 'add-task-form') {
        addNew()
    }
    //Editing an existing to do
    if (target.classList.contains('to-do-bubble')) {
        console.log('todobubble')
        let currentId = target.id
        let dialog = document.getElementById('to-do-dialog')
        let box = document.getElementById('priority-box')

        dialog.showModal()
        for (let object of toDoList) {
                if (object.id === currentId) {
                    document.getElementById('name-input').value = object.name
                    console.log(object.name)
                    document.getElementById('due-input').value = object.due
                    document.getElementById('details-input').value = object.description
                    document.getElementById('select').value = object.project
                    
                    if (object.priority) {
                        let check = document.createElement('i')
                        check.id = 'checkmark'
                        check.classList.add('bx')
                        check.classList.add('bx-check')
                        check.classList.add('icon')
                        box.append(check)
                    }
                }
            }
        let index = toDoList.findIndex(obj => obj.id === currentId)
        toDoList.splice(index, 1)
        let closeButton = document.getElementById('close-task-form')
        closeButton.addEventListener('click', function() {
            addNew()
        })
    }
    //Opening a project folder
    if (target.classList.contains('custom-project')) {
        console.log('clicked on project')
        console.log(target.id)
        for (let project of allProjects) {
            if (project.id === target.id) {
                ProjectPage.renderProject(project)
                HomePage.setPage(project.body, allProjects)
    
            }
        } 
    }
    //Re-opening main page
    if (target.classList.contains('all-to-do')) {
        HomePage.renderMain()
        HomePage.setPage(toDoList, allProjects)
    }
    if (target.id === 'add-project-form') {
        if (document.getElementById('new-project-input').value.trim() !== '') {
            let title = document.getElementById('new-project-input').value
            let newProject = new Project(title)
            allProjects.push(newProject)
            HomePage.renderProjects(allProjects)
            document.getElementById('new-project-input').value = ''
            let bottomNav = document.querySelector('#nav-bar')
            let miniForm = document.querySelector('#mini-form')
            bottomNav.removeChild(miniForm)
        }
    }
})