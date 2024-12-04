import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    return `<div class="tasks__item taskboard__item card__border__${task.status}">${task.title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor({task}) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement(){
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable(){
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
        });
    }
}
