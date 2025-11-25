import "./styles.css"
import { ToDo, Checklist, Project, initialProjects } from "./todo.js";
import { HomePage } from "./home.js";

HomePage.init(initialProjects)
console.log(initialProjects[0].body[0].name)
HomePage.renderToDoObject(initialProjects[0].body)