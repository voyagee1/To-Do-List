import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/taskboard-component.js';
import ResetButtonComponent from "../view/reset-button-component.js";
import { StatusArray, Status, UserAction } from "../const.js";
import { render } from '../framework/render.js';
import TaskPresenter from "./task-presenter.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import LoaderComponent from "../view/loader-component.js";

export default class TasksBoardPresenter {

  #boardContainer = null;
  #tasksModel = null;
  #taskPresenter = null;

  #isLoading = false;
  #loaderComponent = new LoaderComponent();

  #tasksBoardComponent = new TaskBoardComponent();
  #resetButtonComponent = null;

  constructor({boardContainer, tasksModel}) {
   this.#boardContainer = boardContainer;
   this.#tasksModel = tasksModel;
   this.#taskPresenter = new TaskPresenter({ tasksModel: this.#tasksModel });

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  async init() {
    this.#isLoading = true;
    this.#renderLoader();

    try {
      await this.#tasksModel.init();
      this.#isLoading = false;
      this.#clearLoader();
      this.#renderBoard();
      this.#renderTaskList();
      this.#renderBasket();
    } 
    catch (err) {
      console.error("Ошибка при инициализации:", err);
    }
  }

  async addNewTask(taskTitle) {
    if (!taskTitle) {
      return;
    }
    this.#isLoading = true;
    this.#renderLoader();

    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector(".new-task__input").value = "";
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    } finally {
      this.#isLoading = false;
      this.#clearLoader();
    }
  }

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
      case UserAction.CLEAR_BASKET:
        this.#clearBoard();
        this.#renderTaskList();
        this.#renderBasket();
        break;
    }
  };

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
    this.#resetButtonComponent = null;
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  
  #renderTaskList() {
    const nonBasketStatuses = StatusArray.filter(
      (status) => status !== Status.BASKET
    );

    for (const status of nonBasketStatuses) {
      const tasksListComponent = new TaskListComponent({
        status,
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });
      tasksListComponent.element.setAttribute("data-status", status);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

      const tasksListElement =
        tasksListComponent.element.querySelector(".tasks__list");

      if (tasksForStatus.length === 0) {
        const noTaskComponent = new EmptyTaskComponent();
        render(noTaskComponent, tasksListElement);
      } else {
        for (const task of tasksForStatus) {
          this.#renderTask(task, tasksListElement);
        }
      }
    }
  }

  async #handleTaskDrop(taskId, newStatus) {
    this.#isLoading = true;
    this.#renderLoader();
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
      this.#isLoading = false;
      this.#clearLoader();
    } catch (err) {
      console.error("Ошибка при обновлении статуса задачи:", err);
    }
  }

  #renderBasket() {
    const status = Status.BASKET;
    const tasksListComponent = new TaskListComponent({
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    tasksListComponent.element.setAttribute("data-status", status);
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

    const tasksListElement =
      tasksListComponent.element.querySelector(".tasks__list");

    if (tasksForStatus.length === 0) {
      const noTaskComponent = new EmptyTaskComponent();
      render(noTaskComponent, tasksListElement);
    } else {
      for (const task of tasksForStatus) {
        this.#renderTask(task, tasksListElement);
      }
    }

    const isDisabled = tasksForStatus.length === 0;

    this.#resetButtonComponent = new ResetButtonComponent(isDisabled);
    this.#resetButtonComponent.setClickHandler(this.#handleClearBasketClick);
    render(this.#resetButtonComponent, tasksListComponent.element);
  }

  #handleClearBasketClick = async () => {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error("Ошибка при очистке корзины:", err);
    }
  };

  #renderLoader() {
    if (this.#isLoading) {
      render(this.#loaderComponent, this.#boardContainer);
    }
  }

  #clearLoader() {
    if (!this.#isLoading) {
      this.#loaderComponent.element.remove();
    }
  }

}
