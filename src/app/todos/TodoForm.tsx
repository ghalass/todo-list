import { Todo } from "@prisma/client";
import TodoSubmitBtn from "./TodoSubmitBtn";
import TodoNewBtn from "./TodoNewBtn";
import { CRUD } from "@/utils/constants";
import { showCrudTitle } from "@/utils/func";

function TodoForm({
  error,
  task,
  description,
  status,
  processing,
  operation,
  setOperation,
  setTask,
  setDescription,
  setStatus,
  handleSubmit,
  setTODO,
  formErrors,
  setFormErrors,
}: {
  error: string;
  task: string;
  description: string;
  status: boolean;
  processing: boolean;
  operation: CRUD;
  formErrors: {
    task: string;
    description: string;
  };
  setOperation: React.Dispatch<React.SetStateAction<CRUD>>;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  setTODO: (todo: Todo) => void;
  setFormErrors: React.Dispatch<
    React.SetStateAction<{ task: string; description: string }>
  >;
}) {
  const handleNew = () => {
    setOperation(CRUD.ADD);
    const todo = {
      id: 0,
      task: "",
      description: "",
      status: false,
    };
    setTODO(todo);
  };

  return (
    <div className="card mb-1">
      <div className="card-header">
        <strong>{showCrudTitle("tâche", operation)}</strong>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column gap-1">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show mb-2"
              role="alert"
            >
              <i className="bi bi-exclamation-circle me-2"></i>
              <strong>Erreur : </strong> {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <input
            className={`form-control ${
              formErrors.task !== "" ? "is-invalid" : ""
            } `}
            type="text"
            placeholder="Tâche"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {formErrors.task !== "" && (
            <span className="text-danger fst-italic">
              <i className="bi bi-exclamation-circle me-1"></i>
              {formErrors.task}
            </span>
          )}

          <textarea
            className={`form-control ${
              formErrors.description !== "" ? "is-invalid" : ""
            } `}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {formErrors.description !== "" && (
            <span className="text-danger fst-italic">
              <i className="bi bi-exclamation-circle me-1"></i>
              {formErrors.description}
            </span>
          )}

          <div className="d-flex gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked={!status}
                onChange={(e) => {
                  setStatus(!e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                En attente
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={status}
                onChange={(e) => {
                  setStatus(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Terminé
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <TodoSubmitBtn
              handleSubmit={handleSubmit}
              operation={operation}
              processing={processing}
            />

            {operation !== CRUD.ADD && (
              <TodoNewBtn handleNew={handleNew} processing={processing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
