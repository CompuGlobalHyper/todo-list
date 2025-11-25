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
    renderProjects(projects) {
        for (let project of projects) {
            console.log(project)
                let projectBubble = document.createElement('div')
                projectBubble.classList.add('content-bubble')
                let projectBubbleText = document.createElement('div')
                projectBubbleText.classList.add('project-title')
                projectBubbleText.textContent = `${project.title}`
                projectBubble.appendChild(projectBubbleText)
                this.container.appendChild(projectBubble)
        }
    },

    renderStickyBar() { 
        const stickyBar = document.createElement('div')
        stickyBar.id = 'sticky-bar'

        const stickyTask = document.createElement('div')
        stickyTask.classList.add('sticky-button')
        stickyTask.id = 'task-button'
        stickyTask.textContent = 'Add to-do'
        const stickyProject = document.createElement('div')
        stickyProject.classList.add('sticky-button')
        stickyProject.id = 'project-button'
        stickyProject.textContent = 'Add project'

        stickyBar.appendChild(stickyTask)
        stickyBar.appendChild(stickyProject)
        this.container.appendChild(stickyBar)
    },
    createForm(projects) {
            const toDoForm = document.createElement('form')
            toDoForm.classList.add('to-do-form')
            const addButton = document.createElement('div')
            addButton.id = 'add-button'
            addButton.textContent = 'Add'

            const taskWrapper = document.createElement('div')
            taskWrapper.classList.add('dialog-wrapper')
            const taskInput = document.createElement('input')
            taskInput.setAttribute('placeholder', 'To-do name (required)')
            taskWrapper.appendChild(taskInput)
            
            const dueDateWrapper = document.createElement('div')
            dueDateWrapper.classList.add('dialog-wrapper')
            const dueDateInput = document.createElement('input')
            dueDateInput.setAttribute('type', 'date')
            dueDateWrapper.appendChild(dueDateInput)

            const priorityWrapper = document.createElement('div')
            priorityWrapper.id = 'priority-wrapper'
            const priorityLabel = document.createElement('p')
            priorityLabel.textContent = 'Priority?'
            const priorityBox = document.createElement('div')
            priorityBox.id = 'priority-box'
            priorityWrapper.appendChild(priorityLabel)
            priorityWrapper.appendChild(priorityBox)
            
            const detailsInputWrapper = document.createElement('div')
            const detailsInput = document.createElement('textarea')
            detailsInput.id = 'details-input'
            detailsInput.setAttribute('placeholder', 'Notes (optional)')
            detailsInputWrapper.appendChild(detailsInput)
            
            const projectInputWrapper = document.createElement('div')
            const projectInput = document.createElement('select')
            projectInput.id = 'select'
            for (let project of projects) {
                console.log(project.title)
                let option = document.createElement('option')
                option.text = `${project.title}`
                projectInput.add(option)
            }
            projectInputWrapper.appendChild(projectInput)

            toDoForm.append(taskWrapper, dueDateWrapper, priorityWrapper
                , detailsInputWrapper, projectInputWrapper, addButton)
            return toDoForm
    },
    createMiniForm(projects) {
        let formWrapper = document.createElement('div')
        formWrapper.id = 'form-wrapper'
        let form = document.createElement('form')
        form.id = 'mini-form'
        let projectInput = document.createElement('input')
        projectInput.setAttribute('placeholder', 'Enter new project name')
        let buttonWrapper = document.createElement('div')
        let addButton = document.createElement('div')
        addButton.textContent = 'Add'
        addButton.id = 'add-project'
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
        let closeButton = document.createElement('div')

        sidebarAdd.addEventListener('click', () => {
            if (!document.getElementById('text-close-button')) {
                closeButton.id = 'text-close-button'
                closeButton.textContent = 'Close'
                nav.append(form, closeButton) 
            }
            else {}
            nav.append(form, closeButton) 

            closeButton.addEventListener('click', function() {
                nav.innerHTML = ''
            })
        })
    },
    renderFormDialog(form) {
        const toDoDialog = document.createElement('dialog')
        toDoDialog.id = 'to-do-dialog'

        let closeButton2 = document.createElement('i')
        closeButton2.classList.add('bx')
        closeButton2.classList.add('bx-x-circle')
        closeButton2.id = 'close-button'
        toDoDialog.appendChild(closeButton2)

        toDoDialog.appendChild(form)
        this.container.append(toDoDialog)

        const addTask = document.querySelector('#task-button')
        addTask.addEventListener('click', () => {
            toDoDialog.showModal()
        })

        const closeButton = document.querySelector('#close-button')
        closeButton.addEventListener('click', function() {
            toDoDialog.close()
            
        })
    },
    renderToDoObject(todo) {
        for (let object of todo) {
            let toDoContainer = document.querySelector('.content-bubble')
            let toDoBubble = document.createElement('div')
            toDoBubble.classList.add('to-do-bubble')
            
            let nameWrapper = document.createElement('div')
            nameWrapper.classList.add('item-wrapper')
            nameWrapper.textContent = `${object.name}`

            let descripWrapper = document.createElement('div')
            descripWrapper.classList.add('item-wrapper')
            descripWrapper.textContent = `${object.description}`

            let dateWrapper = document.createElement('div')
            dateWrapper.classList.add('item-wrapper')
            dateWrapper.textContent = `Due by: ${object.due}`
            
            let bottomItems = document.createElement('div')

            if (object.project) {
                let projectWrapper = document.createElement('div')
                projectWrapper.classList.add('item-wrapper')
                projectWrapper.textContent = `| ${object.project}`
                bottomItems.append(dateWrapper, projectWrapper)
            } else {
                bottomItems.append(dateWrapper) 
            }

            toDoBubble.append(nameWrapper, descripWrapper, bottomItems)
            toDoContainer.appendChild(toDoBubble)
        }
    },

    init(projects) {
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
