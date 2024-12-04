import { AbstractComponent } from "../framework/view/abstract-component.js";


function createHeaderComponentTemplate() {
  return `
    <header class="header">
      <div class="header__wrapper">
        <h1 class="header__title">Список задач</h1>
      </div>
    </header>`;
}


export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
