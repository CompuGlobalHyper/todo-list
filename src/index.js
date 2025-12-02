import "./styles.css"
import { ToDoItem, Project, toDoList, doneList, allProjects, sortDate} from "./todo.js";
import { HomePage } from "./home.js";
import { ProjectPage } from "./project.js";
import { compareAsc, isSameDay } from 'date-fns'

HomePage.init(allProjects)
sideBarToggle()
reloadMain()

function reloadMain() {
    updateTally()
    sortDate(toDoList)
    sortDate(doneList)
    HomePage.renderToDoObject(doneList, 'done-content')
    HomePage.renderToDoObject(toDoList)
    
}

function addNew() {
    if (document.getElementById('name-input').value.trim() !== '') {
        let pageTitle = document.getElementById('to-do-title').textContent
        console.log(pageTitle)
        let name = document.getElementById('name-input').value
        let dueDateInput = document.getElementById('due-input').value
        let dueDate = new Date()
        if (dueDateInput) {
            const [year, month, day] = dueDateInput.split('-').map(Number);
            dueDate = new Date (year, month - 1, day)
        }
        console.log(dueDate)
        let description = document.getElementById('details-input').value
        let project = document.getElementById('select').value

        let priorityCheck = document.getElementById('checkmark')
        let priority = priorityCheck

        let newToDo = new ToDoItem(
                                    name, 
                                    description, 
                                    dueDate || new Date(), 
                                    priority, 
                                    project)
        toDoList.push(newToDo)
        if (pageTitle === 'To-Dos') {
            sortDate(toDoList)
            HomePage.renderToDoObject(toDoList)
        } 
        else {
            let match = allProjects.filter(obj => obj.title === pageTitle)
            sortDate(match[0].body)
            HomePage.renderToDoObject(match[0].body)
        }
        updateTally()
        HomePage.renderProjects(allProjects)
        if (document.querySelector('dialog')) document.querySelector('dialog').close()
    }
}
function sideBarToggle() {
        const toggle = document.querySelector('.toggle')

        toggle.addEventListener('click', () => {
            HomePage.closeSideBar()
            removeMainForm()
            removeMiniForm()
    })
}

function filterDone(list) {
    let doneList = list.filter((obj) => obj.done)
    return doneList
}

function updateTally() {
    let all = document.getElementById('all-tally')
    let today = document.getElementById('today-tally')
    let overdue = document.getElementById('overdue-tally')

    all.innerHTML = ''
    today.innerHTML = ''
    overdue.innerHTML = ''

    let now = new Date()
    let todayList = toDoList.filter((obj) => isSameDay(now, obj.due))
    let overdueList = toDoList.filter((obj) => compareAsc(now, obj.due) === 1 && !(isSameDay(now, obj.due)))

    all.textContent = `${toDoList.length}`
    today.textContent = `${todayList.length}`
    overdue.textContent = `${overdueList.length}`
}

function removeMainForm() {
    const nav = document.querySelector('#first-nav')
    let mainForm = document.querySelector('#to-do-form-main')
    if (mainForm) nav.removeChild(mainForm)
}

function removeMiniForm() {
    let bottomNav = document.querySelector('#nav-bar')
    let miniForm = document.querySelector('#mini-form')
    if (miniForm) bottomNav.removeChild(miniForm)
}

function createDialog() {
    let form = HomePage.createForm(allProjects)
    const toDoDialog = document.createElement('dialog')
    toDoDialog.id = 'to-do-dialog'
    toDoDialog.appendChild(form)
    HomePage.container.append(toDoDialog)
    toDoDialog.showModal()
    let closeButton = document.getElementById('close-task-form')
    closeButton.addEventListener('click', function() {
        toDoDialog.close()
        HomePage.container.removeChild(toDoDialog)
    })
}

function clearDialog() {
    let dialog = document.getElementById('to-do-dialog')
    let myForm = document.getElementById('to-do-form-main')
    let box = document.getElementById('priority-box')
    box.innerHTML = ''
    myForm.reset()
    dialog.close()
}

document.addEventListener('click', (event) => {
    const target = event.target
    //Creating side-bar form
    if (target.id === 'add-task') {
        let form = HomePage.createForm(allProjects)
        const nav = document.querySelector('#first-nav')
        nav.append(form)
        let closeButton = document.getElementById('close-task-form')
        closeButton.addEventListener('click', function() {
            removeMainForm()
        })
    }  
    
    //Creating dialog
    if (target.id === 'task-button') {
        createDialog()
    }

    //Closing sidebar when clicking out
    const sidebar = document.querySelector('.sidebar')
    const toggle = document.querySelector('.toggle')
    const container = document.querySelector('#container')
    const clickedInsideSidebar = sidebar.contains(target);
    const clickedToggle = toggle.contains(target);

    // if (!clickedInsideSidebar && !clickedToggle) {
    // //     sidebar.classList.add('close')
    // //     container.classList.remove('close')
    // // }
    //Adding a new to do
    if (target.id === 'add-task-form') {
        addNew()
        sideBarToggle()
        // let index = toDoList.findIndex(obj => obj.id === currentId)
        // toDoList.splice(index, 1)
    }
    //Editing an existing to do
    if (target.classList.contains('to-do-bubble')) {
        let currentId = target.id
        
        for (let object of toDoList) {
            if (object.id === currentId) {
                createDialog()
                let dialog = document.getElementById('to-do-dialog')
                let box = document.getElementById('priority-box')
                dialog.showModal()
                console.log(object.name)
                document.getElementById('name-input').value = object.name

                document.getElementById('due-input').value = object.due.toISOString().slice(0, 10)
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
    }
    //Opening a project folder
    if (target.classList.contains('custom-project')) {
        for (let project of allProjects) {
            if (project.id === target.id) {
                ProjectPage.renderProject(project)
                if (project.body.length === 0) {
                    HomePage.generatePlaceholder()
                }
                HomePage.setPage(project.body, allProjects)
    
            }
        } 
    }
    //Re-opening main page
    if (target.classList.contains('all-to-do')) {
        HomePage.renderMain()
        HomePage.setPage(toDoList, allProjects)
        HomePage.renderToDoObject(filterDone(toDoList), 'done-content')
    }
    //Adding new project
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
    //Viewing today's to-dos
    if (target.id === 'today-option') {
        ProjectPage.renderToday()
        let now = new Date()
        let todayList = toDoList.filter((obj) => isSameDay(now, obj.due))
        HomePage.setPage(todayList, allProjects)
    }
    //Viewing overdue to-dos
    if (target.id === 'overdue-option') {
        ProjectPage.renderOverdue()
        let now = new Date()
        let overdueList = toDoList.filter((obj) => compareAsc(now, obj.due) === 1 && !(isSameDay(now, obj.due)))
        HomePage.setPage(overdueList, allProjects)
    }
    //Marking a to-do as 'done'
    if (target.id === 'done-button') {
        console.log('click detected')
        let id = target.getAttribute('data-id')
        for (let object of toDoList) {
            if (object.id === id) {
                object.done = true
                doneList.push(object)
                let index = toDoList.indexOf(object)
                toDoList.splice(index, 1)

                reloadMain()
            }
        }
    }
    //Deleting a 'done' to-do
    if (target.id === 'delete-button') {
        console.log('click detected')
        let id = target.getAttribute('data-id')
        for (let object of doneList) {
            if (object.id === id) {
                let index = doneList.indexOf(object)
                let delet = doneList.splice(index, 1)
                reloadMain()
            }
        }
    }
})