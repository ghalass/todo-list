import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";
import { CRUD } from "@/utils/constants";

function TodosList({
  todos,
  loading,
  setOperation,
  setTODO,
  loadDATA,
}: {
  todos: Todo[];
  loading: boolean;
  setOperation: React.Dispatch<React.SetStateAction<CRUD>>;
  setTODO: (todo: Todo) => void;
  loadDATA: () => void;
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <strong>Liste</strong>
            <button
              onClick={loadDATA}
              className="btn btn-sm btn-outline-secondary my-0 py-0"
            >
              <i className="bi bi-arrow-clockwise"></i> Actualiser
            </button>
          </div>
          {loading && (
            <strong className="d-flex justify-content-center align-items-center gap-2 text-info">
              <div
                className="spinner-border spinner-border-sm text-secondary "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Chargement ...
            </strong>
          )}
        </div>
      </div>
      <div className="card-body">
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
        </div>
      </div>
    </div>
  );
}

export default TodosList;
