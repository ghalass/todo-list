import { Todo } from "@prisma/client";

function TodoItem({
  todo,
  setOperation,
  setTODO,
}: {
  todo: Todo;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setTODO: (todo: Todo) => void;
}) {
  const handleEdit = (todo: Todo) => {
    setOperation("update");
    setTODO(todo);
  };

  const handleDelete = (todo: Todo) => {
    setOperation("delete");
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
      <td className="d-flex gap-1">
        <button
          onClick={() => handleEdit(todo)}
          className="btn btn-sm btn-outline-secondary"
        >
          E
        </button>
        <button
          onClick={() => handleDelete(todo)}
          className="btn btn-sm btn-outline-danger"
        >
          D
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
