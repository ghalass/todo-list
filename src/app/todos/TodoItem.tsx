import { CRUD } from "@/utils/constants";
import { Todo } from "@prisma/client";

function TodoItem({
  todo,
  setOperation,
  setTODO,
}: {
  todo: Todo;
  setOperation: React.Dispatch<React.SetStateAction<CRUD>>;
  setTODO: (todo: Todo) => void;
}) {
  const handleEdit = (todo: Todo) => {
    setOperation(CRUD.UPDATE);
    setTODO(todo);
  };

  const handleDelete = (todo: Todo) => {
    setOperation(CRUD.DELETE);
    setTODO(todo);
  };

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.task}</td>
      <td>{todo.description}</td>
      <td>
        {todo.status && (
          <span className="badge rounded-pill text-bg-success">Terminé</span>
        )}

        {!todo.status && (
          <span className="badge rounded-pill text-bg-warning">En attente</span>
        )}
      </td>
      <td className="d-flex gap-4">
        <span
          role="button"
          onClick={() => handleEdit(todo)}
          className="text-secondary"
        >
          <i className="bi bi-pencil"></i>
        </span>

        <span
          role="button"
          onClick={() => handleDelete(todo)}
          className="text-danger"
        >
          <i className="bi bi-trash3"></i>
        </span>
      </td>
    </tr>
  );
}

export default TodoItem;
