import "./styles.css"
import { ToDo, Checklist, Project, initialProjects } from "./todo.js";
import { HomePage } from "./home.js";

HomePage.init(initialProjects)
console.log(HomePage.toDoList.body)
HomePage.renderToDoObject(initialProjects[0].body)