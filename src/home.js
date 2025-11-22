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

        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('close')
            this.container.classList.toggle('close')
        })

    },
    renderProjects(projects) {
        for (let project of projects) {
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

    renderTaskDialog() {
        const toDoDialog = document.createElement('dialog')
        toDoDialog.id = 'to-do-dialog'
        const closeButton = document.createElement('div')
        closeButton.id = 'close-button'
        closeButton.textContent = 'X'
        const addButton = document.createElement('div')
        addButton.id = 'add-button'
        addButton.textContent = 'Add'

        const taskWrapper = document.createElement('div')
        taskWrapper.classList.add('dialog-wrapper')
        const taskLabel = document.createElement('label')
        taskLabel.textContent = 'Task:'
        const taskInput = document.createElement('input')
        taskWrapper.appendChild(taskLabel)
        taskWrapper.appendChild(taskInput)
        
        const dueDateWrapper = document.createElement('div')
        dueDateWrapper.classList.add('dialog-wrapper')
        const dueDateLabel = document.createElement('label')
        dueDateLabel.textContent = "Due Date:"
        const dueDateInput = document.createElement('input')
        dueDateWrapper.appendChild(dueDateLabel)
        dueDateWrapper.appendChild(dueDateInput)

        const priorityWrapper = document.createElement('div')
        priorityWrapper.id = 'priority-wrapper'
        const priorityLabel = document.createElement('p')
        priorityLabel.textContent = 'Priority?'
        const priorityBox = document.createElement('div')
        priorityBox.id = 'priority-box'
        priorityWrapper.appendChild(priorityLabel)
        priorityWrapper.appendChild(priorityBox)

        const detailsLabel = document.createElement('label')
        detailsLabel.id = 'details-label'
        detailsLabel.textContent = 'Details:'
        const detailsInput = document.createElement('textarea')

        toDoDialog.append(closeButton, taskWrapper, dueDateWrapper, priorityWrapper,
                                detailsLabel, detailsInput, addButton)
        this.container.append(toDoDialog)
        
        const toDoButton = document.querySelector('#task-button')
        toDoButton.addEventListener('click', function() {
            toDoDialog.showModal();
        })

        closeButton.addEventListener('click', function() {
            toDoDialog.close()
        })
        
    },

    renderToDoObject(object) {
        let toDoContainer = document.querySelector('.content-bubble')
        let toDoBubble = document.createElement('div')
        toDoBubble.classList.add('to-do-bubble')
        
        let nameWrapper = document.createElement('div')
        nameWrapper.classList.add('item-wrapper')
        nameWrapper.textContent = `${object.name}`

        let dateWrapper = document.createElement('div')
        dateWrapper.classList.add('item-wrapper')
        dateWrapper.textContent = `${object.due}`

        toDoBubble.append(nameWrapper, dateWrapper)
        toDoContainer.appendChild(toDoBubble)

    },

    init(projects) {
        this.renderProjects(projects);
        this.renderStickyBar();
        this.renderTaskDialog();
        this.darkMode();
        this.sideBarToggle();
    }
}
