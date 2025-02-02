import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";

function TodosList({
  todos,
  loading,
  setOperation,
  setTODO,
}: {
  todos: Todo[];
  loading: boolean;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setTODO: (todo: Todo) => void;
}) {
  return (
    <div>
      <h2>Liste</h2>
      <div className="d-flex flex-column gap-1">
        <table className="table table-sm table-hover mx-1">
          <thead>
            <tr>
              <th>#</th>
              <th>Tâche</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                setOperation={setOperation}
                setTODO={setTODO}
              />
            ))}
          </tbody>
        </table>
        {loading && (
          <h6 className="d-flex justify-content-center align-items-center gap-2 text-info">
            <div
              className="spinner-border spinner-border-sm text-secondary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            Chargement ...
          </h6>
        )}
      </div>
    </div>
  );
}

export default TodosList;
