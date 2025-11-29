export const HomePage = {
    container: document.querySelector('#container'),

    darkMode() {
        const body = document.querySelector('body')
        const darkToggle = document.querySelector('.toggle-wrapper')
        const text = document.querySelector('#dark-mode-text')
        const moon = document.querySelector('.bx bx-moon')
        const sun = document.querySelector('.bx bx-sun')

        darkToggle.addEventListener('click', () => {
            console.log('dark')
            body.classList.toggle('dark')

            if (body.classList.contains('dark')) {
                text.innerText = 'Light Mode'
            } else {
                text.innerText = 'Dark Mode'
            }

        })
    },

    sideBarToggle() {
        const sidebar = document.querySelector('.sidebar')
        const toggle = document.querySelector('.toggle')
        const nav = document.querySelector('#first-nav')

        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('close')
            this.container.classList.toggle('close')
            nav.innerHTML = ''
        })

    },
    closeSideBar() {
        const sidebar = document.querySelector('.sidebar')
        const nav = document.querySelector('#first-nav')
        sidebar.classList.toggle('close')
        this.container.classList.toggle('close')
        nav.innerHTML = ''
    },
    renderMain() {
        this.container.innerHTML = ''
        let todo = document.createElement('div')
        let done = document.createElement('div')
        todo.classList.add('content-bubble')
        done.classList.add('content-bubble')
        

        let todoTitle = document.createElement('span')
        todoTitle.id = 'to-do-title'
        let doneTitle = document.createElement('span')
        todoTitle.textContent = 'To-Dos'
        doneTitle.textContent = 'Done!'

        let todoBubbleContainer = document.createElement('div')
        todoBubbleContainer.classList.add('content-bubble-container')
        todoBubbleContainer.id = 'to-do-content'
        let doneBubbleContainer = document.createElement('div')
        doneBubbleContainer.id = 'done-content'
        doneBubbleContainer.classList.add('content-bubble-container')

        todo.append(todoTitle, todoBubbleContainer)
        done.append(doneTitle, doneBubbleContainer)
        this.container.append(todo, done)

    },
    renderProjects(projects) {
        const projectList = document.getElementById('expand-project-list')
        projectList.innerHTML = ''
        for (let project of projects) {
                let projectBubble = document.createElement('div')
                projectBubble.id = project.id
                projectBubble.classList.add('list-wrapper')
                projectBubble.classList.add('hide')
                projectBubble.classList.add('custom-project')
                let projectBubbleIcon = document.createElement('i')
                projectBubbleIcon.classList.add('bx')
                projectBubbleIcon.classList.add('bx-folder')
                projectBubbleIcon.classList.add('icon')
                let projectBubbleText = document.createElement('div')
                projectBubbleText.classList.add('list-item')
                projectBubbleText.textContent = `${project.title}`
                projectBubble.append(projectBubbleIcon, projectBubbleText)
                projectList.appendChild(projectBubble)
        }
    },

    renderStickyBar() { 
        const stickyBar = document.createElement('div')
        stickyBar.id = 'sticky-bar'

        const stickyTask = document.createElement('div')
        stickyTask.classList.add('sticky-button')
        stickyTask.id = 'task-button'
        stickyTask.textContent = 'Add to-do'

        stickyBar.appendChild(stickyTask)
        this.container.appendChild(stickyBar)
    },
    createForm(projects) {
            const toDoForm = document.createElement('form')
            toDoForm.classList.add('to-do-form')
            toDoForm.id = 'to-do-form-main'
            let buttonWrapper = document.createElement('div')
            let addButton = document.createElement('div')
            addButton.textContent = 'Save'
            addButton.id = 'add-task-form'
            let closeButton = document.createElement('div')
            closeButton.textContent = 'Close'
            closeButton.id = 'close-task-form'
            buttonWrapper.classList.add('button-wrapper')
            buttonWrapper.append(closeButton, addButton)

            const taskWrapper = document.createElement('div')
            taskWrapper.classList.add('dialog-wrapper')
            const taskInput = document.createElement('input')
            taskInput.id = 'name-input'
            taskInput.setAttribute('placeholder', 'To-do name (required)')
            taskWrapper.appendChild(taskInput)
            
            const dueDateWrapper = document.createElement('div')
            dueDateWrapper.classList.add('dialog-wrapper')
            const dueDateInput = document.createElement('input')
            dueDateInput.setAttribute('type', 'date')
            dueDateInput.id = 'due-input'
            dueDateWrapper.appendChild(dueDateInput)

            const priorityWrapper = document.createElement('div')
            priorityWrapper.id = 'priority-wrapper'
            const priorityLabel = document.createElement('p')
            priorityLabel.textContent = 'Priority?'
            const priorityBox = document.createElement('div')
            priorityBox.id = 'priority-box'
            priorityWrapper.appendChild(priorityLabel)
            priorityWrapper.appendChild(priorityBox)

            priorityBox.addEventListener('click', () => {
                let checkcheck = document.getElementById('checkmark')
                if (!checkcheck) {
                    let check = document.createElement('i')
                    check.id = 'checkmark'
                    check.classList.add('bx')
                    check.classList.add('bx-check')
                    check.classList.add('icon')
                    priorityBox.append(check)
                } else {
                    priorityBox.innerHTML = ''
                }
                
                
            })
            
            const detailsInputWrapper = document.createElement('div')
            const detailsInput = document.createElement('textarea')
            detailsInput.id = 'details-input'
            detailsInput.setAttribute('placeholder', 'Notes (optional)')
            detailsInputWrapper.appendChild(detailsInput)
            
            const projectInputWrapper = document.createElement('div')
            const projectInput = document.createElement('select')
            projectInput.id = 'select'
            let option = document.createElement('option')
            option.value = ''
            option.selected = true
            option.text = 'No project selected'
            projectInput.add(option)

            for (let project of projects) {
                console.log(project.title)
                let optionCustom = document.createElement('option')
                optionCustom.text = `${project.title}`
                optionCustom.value = `${project.title}`
                projectInput.add(optionCustom)
            }
            projectInputWrapper.appendChild(projectInput)

            toDoForm.append(taskWrapper, dueDateWrapper, 
                detailsInputWrapper, projectInputWrapper,
                priorityWrapper, buttonWrapper)
            return toDoForm
    },
    createMiniForm() {
        let formWrapper = document.createElement('div')
        formWrapper.id = 'form-wrapper'
        let form = document.createElement('form')
        form.id = 'mini-form'
        let projectInput = document.createElement('input')
        projectInput.setAttribute('placeholder', 'Enter new project name')
        projectInput.id = 'new-project-input'
        let buttonWrapper = document.createElement('div')
        buttonWrapper.classList.add('button-wrapper')
        let addButton = document.createElement('div')
        addButton.textContent = 'Save'
        addButton.id = 'add-project-form'
        let closeButton = document.createElement('div')
        closeButton.textContent = 'Close'
        closeButton.id = 'close-project-form'
        buttonWrapper.append(closeButton, addButton)
        form.append(projectInput, buttonWrapper)
        formWrapper.appendChild(form)

        return form
    },
    renderMiniForm(form) {
        let bottomNav = document.querySelector('#nav-bar')
        let createProjectForm = document.querySelector('#add-project')
        

        createProjectForm.addEventListener('click', () => {
            bottomNav.appendChild(form)
            let closeButton = document.querySelector('#close-project-form')
            closeButton.addEventListener('click', () => {
                let miniForm = document.querySelector('#mini-form')
                if (miniForm) bottomNav.removeChild(miniForm)
            })
        })
    },
    renderSidebarForm(form) {
        const sidebarAdd = document.querySelector('#add-task')
        const nav = document.querySelector('#first-nav')
        let closeButton = document.getElementById('close-task-form')

        if (!closeButton) console.log('Error!')

        sidebarAdd.addEventListener('click', () => {
            nav.append(form)
            let closeButton = document.getElementById('close-task-form')
            closeButton.addEventListener('click', function() {
                nav.innerHTML = ''
        })
        })
        
    },
    renderFormDialog(form) {
        const toDoDialog = document.createElement('dialog')
        toDoDialog.id = 'to-do-dialog'
        toDoDialog.appendChild(form)
        this.container.append(toDoDialog)

        const addTask = document.querySelector('#task-button')
        addTask.addEventListener('click', () => {
            toDoDialog.showModal()
            let closeButton = document.getElementById('close-task-form')
            closeButton.addEventListener('click', function() {
                let myForm = document.getElementById('to-do-form-main')
                myForm.reset()
                toDoDialog.close()
            })
        })
    },
    renderToDoObject(todo) {
        let toDoContainer = document.getElementById('to-do-content')
        toDoContainer.innerHTML = ''
        for (let object of todo) {
            let toDoBubble = document.createElement('div')
            toDoBubble.classList.add('to-do-bubble')
            toDoBubble.id = object.id
            console.log(object.id)
            
            let nameWrapper = document.createElement('div')
            nameWrapper.classList.add('item-wrapper')
            nameWrapper.id = 'name-wrapper'
            let toDoName = document.createElement('span')
            toDoName.classList.add('text')
            toDoName.textContent = `${object.name}`
            nameWrapper.append(toDoName)

            if (object.priority) {
                let priorityFlag = document.createElement('i')
                priorityFlag.classList.add('bx') 
                priorityFlag.classList.add('bxs-flag')
                priorityFlag.classList.add('icon')
                nameWrapper.append(priorityFlag)
            }

            let gear = document.createElement('i')
            gear.classList.add('bx')
            gear.classList.add('bxs-cog')
            gear.classList.add('icon')
            gear.id = 'gear'
            nameWrapper.appendChild(gear)


            let descripWrapper = document.createElement('div')
            descripWrapper.classList.add('item-wrapper')
            descripWrapper.classList.add('small')
            descripWrapper.textContent = `${object.description}`

            let dateWrapper = document.createElement('div')
            dateWrapper.classList.add('item-wrapper')
            dateWrapper.classList.add('small')
            dateWrapper.textContent = `Due by: ${object.due}`
            
            let bottomItems = document.createElement('div')
            bottomItems.classList.add('bottom-todo')

            let doneButton = document.createElement('div')
            doneButton.textContent = 'Done!'
            doneButton.id = 'done-button'

            if (object.project) {
                let projectWrapper = document.createElement('div')
                projectWrapper.classList.add('item-wrapper')
                projectWrapper.classList.add('small')
                projectWrapper.textContent = `| ${object.project}`
                bottomItems.append(dateWrapper, projectWrapper, doneButton)
            } else {
                bottomItems.append(dateWrapper, doneButton) 
            }


            toDoBubble.append(nameWrapper, descripWrapper, bottomItems)
            toDoContainer.appendChild(toDoBubble)
        }
    },

    setPage(list, allProjects) {
        this.renderToDoObject(list)
        this.closeSideBar()
        this.renderStickyBar()
        const bigForm = this.createForm(allProjects);
        this.renderFormDialog(bigForm)
    },

    init(projects) {
        this.renderMain()
        this.renderProjects(projects);
        this.renderStickyBar();
        const bigForm = this.createForm(projects);
        const miniForm = this.createMiniForm()
        this.renderSidebarForm(bigForm);
        this.renderFormDialog(bigForm);
        this.renderMiniForm(miniForm)
        this.darkMode();
        this.sideBarToggle();
    }
}
