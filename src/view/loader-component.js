import { AbstractComponent } from "../framework/view/abstract-component.js";

function createLoaderComponentTemplate() {
  return `
    <div class="loader card">Загрузка данных...</div>`;
}


export default class LoaderComponent extends AbstractComponent {
  get template() {
    return createLoaderComponentTemplate();
  }
}
