export class ToDo { 
    constructor(name, description, due, priority, project) {
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.project = project
    }
}

export class Checklist {
    constructor(name, description, due, priority) {
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.list = [];
    }

    addToList (item) {
        this.list.push(item)
    }
}

export class Project {
    constructor(title) {
        this.title = title;
        this.body = [];
    }

    addToDo() {
        let toDo = new ToDo()
        this.body.push(toDo)
    }

    addChecklist() {
        let toDo = new ToDo()
        this.body.push(toDo)
    }
}


const toDoList = new Project("To-Do")
const doingList = new Project("Doing")
const doneList = new Project("Done")

const test = new ToDo ('Make an app', 'This is a test', 'Christmas', true, '')
toDoList.body.push(test)
const test1 = new ToDo ('Make an app', 'This is a test', 'Christmas', true, '')
toDoList.body.push(test1)
const test2 = new ToDo ('Make an app', 'This is a test', 'Christmas', true, '')
toDoList.body.push(test2)
console.log(toDoList.body)

export const initialProjects = [toDoList, doingList, doneList]
