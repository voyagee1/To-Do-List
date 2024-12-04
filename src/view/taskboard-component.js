import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
  return `
    <ul class="section"></ul>`;
}


export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }
}
