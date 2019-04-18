import 'bootstrap';
import '../css/main.scss'
import './modules/createDOMElement';
const TaskManager = require('./TaskManager');

let taskApp = new TaskManager(document.body);