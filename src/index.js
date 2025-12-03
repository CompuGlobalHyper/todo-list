import "./styles.css"
import { ToDoItem, Project, toDoList, doneList, allProjects, sortDate, sortProjects} from "./todo.js";
import { HomePage } from "./home.js";
import { ProjectPage } from "./project.js";
import { compareAsc, isSameDay } from 'date-fns'

HomePage.init(allProjects)
sideBarToggle()
loadMain()

function loadMain() {
    if (!document.getElementById('to-do-dialog')) createDialog()
    if (!document.getElementById('sticky-bar')) HomePage.renderStickyBar()
    HomePage.closeSideBar()
    let pageTitle = document.getElementById('to-do-title').textContent
    sortDate(toDoList)
    sortDate(doneList)
    sortProjects()
    updateTally()
    HomePage.renderProjects(allProjects)
    if (pageTitle === 'To-Dos') {
            HomePage.renderToDoObject(toDoList)
            HomePage.renderToDoObject(doneList, 'done-content')
    } 
    else {
        let match = allProjects.filter(obj => obj.title === pageTitle)
        sortDate(match[0].body)
        HomePage.renderToDoObject(match[0].body)
    }
}

function setUniquePage(list) {
        createDialog()
        HomePage.renderToDoObject(list)
        HomePage.closeSideBar()
        HomePage.renderStickyBar()
}

function addNew() {
    if (document.getElementById('name-input').value.trim() !== '') {
        
        let name = document.getElementById('name-input').value
        let dueDateInput = document.getElementById('due-input').value
        let dueDate = new Date()
        if (dueDateInput) {
            const [year, month, day] = dueDateInput.split('-').map(Number);
            dueDate = new Date (year, month - 1, day)
        }
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
    }
}
function sideBarToggle() {
    const toggle = document.querySelector('.toggle')

    toggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.classList.toggle('close')
        HomePage.container.classList.toggle('close')
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
    if (document.querySelector('#to-do-form-main') !== null) {
        const nav = document.querySelector('#first-nav')
        let mainForm = document.querySelector('#to-do-form-main')
        nav.removeChild(mainForm)
    }
}

function removeMiniForm() {
    if (document.querySelector('#mini-form') !== null) {
        let bottomNav = document.querySelector('#nav-bar')
        let miniForm = document.querySelector('#mini-form')
        bottomNav.removeChild(miniForm)
    }
}

function createDialog() {
    const toDoDialog = document.createElement('dialog')
    toDoDialog.id = 'to-do-dialog'
    HomePage.container.append(toDoDialog)
}

function openDialog() {
    let dialog = document.getElementById('to-do-dialog')
    let form = HomePage.createForm(allProjects)
    dialog.appendChild(form)
    dialog.showModal()

    return form
}

function clearDialog() {
    let dialog = document.getElementById('to-do-dialog')
    dialog.innerHTML = ''
    dialog.close()
}


document.addEventListener('click', (event) => {
    const target = event.target
    //Creating side-bar form
    if (target.id === 'add-task') {
        if (!document.getElementById('to-do-form-main')) {
            let form = HomePage.createForm(allProjects)
            const nav = document.querySelector('#first-nav')
            nav.append(form)
        }    
    }  
    
    //Opening dialog
    if (target.id === 'task-button') {
        openDialog()
    }

    //Closing form via adding
    let currentId;
    if (target.id === 'add-task-form') {
        let index = toDoList.findIndex(obj => obj.id === currentId)
        if (index >= 0) toDoList.splice(index, 1)
        addNew()
        if (!document.querySelector('.sidebar').classList.contains('close')) {
            removeMainForm()
            removeMiniForm()
        }
        sortDate(toDoList)
        sortProjects()
        HomePage.renderProjects(allProjects)
        updateTally()
        clearDialog()
    }
    //Closing form via closing
    if (target.id === 'close-task-form') {
        currentId = undefined;
        clearDialog()
        if (!document.querySelector('.sidebar').classList.contains('close')) {
        removeMainForm()
        removeMiniForm()
        }
    }
    //Editing an existing to do
    if (target.classList.contains('to-do-bubble')) {
        let currentId = target.id
        for (let object of toDoList) {
            let objectId = object.id
            if (objectId === currentId) {
                let form = openDialog()
                let box = document.getElementById('priority-box')
                
                form.querySelector('#name-input').value = object.name
                form.querySelector('#due-input').value = object.due.toISOString().slice(0, 10)
                form.querySelector('#details-input').value = object.description
                form.querySelector('#select').value = object.project
                
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
                setUniquePage(project.body, allProjects)
    
            }
        } 
    }
    //Re-opening main page
    if (target.classList.contains('all-to-do')) {
        HomePage.renderMain()
        loadMain()
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
        setUniquePage(todayList)
    }
    //Viewing overdue to-dos
    if (target.id === 'overdue-option') {
        ProjectPage.renderOverdue()
        let now = new Date()
        let overdueList = toDoList.filter((obj) => compareAsc(now, obj.due) === 1 && !(isSameDay(now, obj.due)))
        setUniquePage(overdueList)
    }
    //Marking a to-do as 'done'
    if (target.id === 'done-button') {
        let id = target.getAttribute('data-id')
        for (let object of toDoList) {
            if (object.id === id) {
                object.done = true
                doneList.push(object)
                let index = toDoList.indexOf(object)
                toDoList.splice(index, 1)

                loadMain()
            }
        }
    }
    //Deleting a 'done' to-do
    if (target.id === 'delete-button') {
        let id = target.getAttribute('data-id')
        for (let object of doneList) {
            if (object.id === id) {
                let index = doneList.indexOf(object)
                let delet = doneList.splice(index, 1)
                loadMain()
            }
        }
    }
})