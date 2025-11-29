export class ToDoItem { 
    constructor(name, description, due, priority, project) {
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.project = project
        this.done = false
        this.id = crypto.randomUUID()
    }
}

export class Project {
    constructor(title) {
        this.title = title;
        this.body = [];
        this.id = crypto.randomUUID()
    }

    addToDo() {
        let toDo = new ToDoItem()
        this.body.push(toDo)
    }
}


const toDoList = []
const doneList = []
const xMas = new Project("Christmas Project")
const testProject = new Project("Test")
const allProjects = [xMas, testProject]

const test0 = new ToDoItem ('Make an app', 'This is a test', 'Christmas', true, '')
toDoList.push(test0)
const test1 = new ToDoItem ('Do 100 pushups', 'This is a test', 'Christmas', false, 'Christmas Project')
toDoList.push(test1)
const test2 = new ToDoItem ('Eat sweet potatoes', 'This is a test', 'Christmas', true, 'Test')
toDoList.push(test2)
console.log(toDoList)

for (let project of allProjects) {
    for (let object of toDoList) {
        if (object.project === project.title) {
            project.body.push(object)
            console.log('match found!')
        }
    }
}

export { toDoList, doneList, allProjects}
