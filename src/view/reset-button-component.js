import { AbstractComponent } from "../framework/view/abstract-component.js";


function createResetButtonComponentTemplate(isDisabled) {
  return `
    <div class="delete">
      <button class="card card__delete"${isDisabled ? " disabled" : ""}>
        x Очистить
      </button>
    </div>`;
}

  
  export default class ResetButtonComponent extends AbstractComponent {
    #isDisabled = false;
  
    constructor(isDisabled) {
      super();
      this.#isDisabled = isDisabled;
    }
  
    get template() {
      return createResetButtonComponentTemplate(this.#isDisabled);
    }
  
    setClickHandler(callback) {
      this._callback.click = callback;
      this.element.addEventListener("click", this.#onClick);
    }
  
    #onClick = (evt) => {
      evt.preventDefault();
      this._callback.click();
    };
  }