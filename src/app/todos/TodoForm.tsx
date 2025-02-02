function TodoForm({
  error,
  task,
  description,
  status,
  processing,
  operation,
  setTask,
  setDescription,
  setStatus,
  setButtonTitle,
  handleSubmit,
  handleNew,
}: {
  error: string;
  task: string;
  description: string;
  status: boolean;
  processing: boolean;
  operation: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonTitle: () => { title: string; cls: string; icon: string };
  handleSubmit: () => void;
  handleNew: () => void;
}) {
  return (
    <div className="col mb-3">
      <h2>Gestion</h2>

      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      <div className="d-flex flex-column gap-1">
        <input
          className="form-control"
          type="text"
          placeholder="Tâche"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

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
          <button
            onClick={handleSubmit}
            className={`btn btn-sm btn-outline-${setButtonTitle().cls}`}
            disabled={processing}
          >
            <div className="d-flex justify-content-center gap-1 align-items-center">
              {processing && (
                <div
                  className="spinner-border spinner-border-sm text-secondary p-0"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <i className={`${setButtonTitle().icon}`}></i>
              {setButtonTitle().title}
            </div>
          </button>
          {operation !== "add" && (
            <button
              onClick={handleNew}
              className={`btn btn-sm btn-outline-primary mb-1`}
              disabled={processing}
            >
              <div className="d-flex justify-content-center gap-1 align-items-center">
                <i className={`bi-plus-lg`}></i>
                Nouveau
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
