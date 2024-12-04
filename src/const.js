export const Status = {
    BACKLOG: 'backlog',
    INPROGRESS: 'inprogress',
    READY: 'ready',
    BASKET: 'basket',
  };
  
  export const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.INPROGRESS]: 'В процессе',
    [Status.READY]: 'Готово',
    [Status.BASKET]: 'Корзина',
  };
  
  export const StatusArray = [
    Status.BACKLOG,
    Status.INPROGRESS,
    Status.READY,
    Status.BASKET,
  ];

  export const UserAction = {
    UPDATE_TASK: "UPDATE_TASK",
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    CLEAR_BASKET: "CLEAR_BASKET",
  };

  export const UpdateType = {
    PATCH: "PATCH",
    MINOR: "MINOR",
    MAJOR: "MAJOR",
    INIT: "INIT",
  };