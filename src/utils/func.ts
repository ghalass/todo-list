import { CRUD } from "./constants";

export const showCrudTitle = (title: string, operation: CRUD) => {
  switch (operation) {
    case CRUD.ADD:
      return `Ajout : ${title}`;
      break;
    case CRUD.DELETE:
      return `Suppression : ${title}`;
      break;
    case CRUD.UPDATE:
      return `Modification : ${title}`;
      break;
    case CRUD.SHOW:
      return `Afficher : ${title}`;
      break;
    default:
      break;
  }
};
