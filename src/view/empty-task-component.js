import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTaskComponentTemplate() {
  return `
    <div class="">
      <p class="card__empty__text taskboard__item">Нет задач</p>
    </div>`;
}

export default class EmptyTaskComponent extends AbstractComponent {
  get template() {
    return createEmptyTaskComponentTemplate();
  }
}