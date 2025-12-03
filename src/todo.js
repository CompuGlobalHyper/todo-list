import { compareAsc, add } from 'date-fns'
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

export function sortDate(list) {
    list.sort((a, b) => compareAsc(a.due, b.due))
}


const toDoList = []
const doneList = []
const xMas = new Project("Christmas")
const testProject = new Project("Exercise")
const allProjects = [xMas, testProject]
const now = new Date()

const test0 = new ToDoItem ('Make an app', '', add(new Date(), {days: -1} ), true, '')
toDoList.push(test0)
const test1 = new ToDoItem ('Do 46 pushups', 'Can I do it..?', add(new Date(), {days: 3} ), false, 'Exercise')
toDoList.push(test1)
const test2 = new ToDoItem ('Eat sweet potatoes', '', add(new Date(), {days: 1} ), true, 'Christmas')
toDoList.push(test2)

export function sortProjects() {
    for (let project of allProjects) {
        project.body.length = 0
        for (let object of toDoList) {
            if (object.project === project.title) {
                project.body.push(object)
            }
        }
    }
}

export { toDoList, doneList, allProjects, }
