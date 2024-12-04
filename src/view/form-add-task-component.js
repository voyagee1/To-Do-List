import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
  return `
    <div class = "width">
      <h2 class="new-task__title">Новая Задача</h2>
      <form action="#" class="new-task__form">
        <div class="new-task__buttons">
          <input class="new-task__input" type="text" id="input_field" placeholder="Название задачи..." required />
          <button type="submit" class="button new-task__button">+ Добавить</button>
        </div>
      </form>
    </div>`;
}


export default class FormAddTaskComponent extends AbstractComponent {
  #handleFormSubmit = null;

  constructor(handleFormSubmit) {
    super();
    this.#handleFormSubmit = handleFormSubmit;
    this._setInnerHandlers();
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  _setInnerHandlers() {
    this.element
      .querySelector(".new-task__form")
      .addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  #formSubmitHandler(evt) {
    evt.preventDefault();
    const inputElement = this.element.querySelector(".new-task__input");
    const taskTitle = inputElement.value.trim();
    if (taskTitle) {
      this.#handleFormSubmit(taskTitle);
      inputElement.value = "";
    }
  }
}
