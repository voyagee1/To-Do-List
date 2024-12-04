import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';
import TaskApiService from "./tasks-api-service.js";

const END_POINT = "https://672209822108960b9cc29e73.mockapi.io";
const bodyContainer = document.querySelector('.body-app');
const formContainer = document.querySelector('.add-task');
const taskBoard = document.querySelector(".taskboard");

const tasksModel = new TasksModel({
  tasksApiService: new TaskApiService(END_POINT),
});

const tasksBoardPresenter = new TasksBoardPresenter({ boardContainer: taskBoard, tasksModel, });

tasksBoardPresenter.init();

function handleNewTaskSubmit(taskTitle) {
  tasksBoardPresenter.addNewTask(taskTitle);
}

const formComponent = new FormAddTaskComponent(handleNewTaskSubmit);
render(formComponent, formContainer, RenderPosition.AFTERBEGIN);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
