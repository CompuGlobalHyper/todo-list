
export const ProjectPage = {
    

    renderProject(project) {
        let container =  document.querySelector('#container')
        container.innerHTML = ''
        let todo = document.createElement('div')
        todo.classList.add('content-bubble')

        let todoTitle = document.createElement('span')
        todoTitle.id = 'to-do-title'
        todoTitle.textContent = project.title 

        let todoBubbleContainer = document.createElement('div')
        todoBubbleContainer.classList.add('content-bubble-container')
        todoBubbleContainer.id = 'to-do-content'

        todo.append(todoTitle, todoBubbleContainer)
        container.append(todo)
    }
}