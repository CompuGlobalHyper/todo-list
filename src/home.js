export function homePage (initialProjects) {

    const main = document.querySelector('#container')
    
    for (let project of initialProjects) {
        let projectBubble = document.createElement('div')
        projectBubble.classList.add('content-bubble')
        projectBubble.textContent = `${project.title}`
        main.appendChild(projectBubble)
    }

    const stickyBlurry  = document.createElement('div')
    stickyBlurry.id = 'sticky-blurry'
    const stickyBar = document.createElement('div')
    stickyBar.id = 'sticky-bar'


    const stickyTask = document.createElement('div')
    stickyTask.classList.add('sticky-button')
    stickyTask.textContent = 'Add to-do'
    const stickyProject = document.createElement('div')
    stickyProject.classList.add('sticky-button')
    stickyProject.textContent = 'Add project'

    stickyBar.appendChild(stickyTask)
    stickyBar.appendChild(stickyProject)

    stickyBlurry.appendChild(stickyBar)
    main.appendChild(stickyBlurry)

    
}