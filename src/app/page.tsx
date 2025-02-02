"use client";

import { DELAY, DOMAIN } from "@/utils/constants";
import { Todo } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const url = `${DOMAIN}/api/todos`;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [operation, setOperation] = useState("add");

  const [id, setId] = useState(0);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const loadDATA = async () => {
    setLoading(true);
    setTimeout(async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setTodos(json);
        });
      setLoading(false);
    }, DELAY);
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(async () => {
      const data = {
        id: id,
        task: task,
        description: description,
        status: status,
      };
      try {
        setProcessing(true);
        console.log("data:", data);
        switch (operation) {
          case "add":
            const res = await axios.post(`${url}`, data);
            break;
          case "update":
            break;
          case "delete":
            const del_res = await axios.delete(`${url}?id=${data.id}`);
            alert(del_res.data);
            break;
          default:
            break;
        }

        loadDATA();
        setError(null);
        setTask("");
        setDescription("");
        setStatus(false);
        setOperation("add");
      } catch (error: any) {
        setError(error?.response?.data.message);
        // toast.error(error?.response?.data.message);
      } finally {
        setProcessing(false);
      }
      setProcessing(false);
    }, DELAY);
  };

  const handleEdit = (todo: Todo) => {
    setOperation("update");
    setTODO(todo);
  };

  const handleDelete = (todo: Todo) => {
    setOperation("delete");
    setTODO(todo);
  };
  const handleNew = () => {
    setOperation("add");
    const todo = {
      id: 0,
      task: "",
      description: "",
      status: false,
    };
    setTODO(todo);
  };
  const setTODO = (todo: Todo) => {
    setError(null);
    setId(todo.id);
    setTask(todo.task);
    setDescription(todo.description || "");
    setStatus(todo.status);
  };
  const setButtonTitle = () => {
    let title = "";
    let cls = "success";
    let icon = "bi-plus-lg";
    switch (operation) {
      case "add":
        title = "Ajouter";
        cls = "success";
        icon = "bi-plus-lg";
        break;
      case "update":
        title = "Modifier";
        cls = "secondary";
        icon = "bi-pencil";
        break;
      case "delete":
        title = "Supprimer";
        cls = "danger";
        icon = "bi-trash3";
        break;
      default:
        break;
    }
    return { title, cls, icon };
  };

  useEffect(() => {
    loadDATA();
  }, []);

  return (
    <div className="m-2">
      {/* CRUD */}
      <div className="col mb-3">
        <h2>Todo List</h2>

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

      {/* LIST */}
      <div className="col">
        <h2>Gestion</h2>
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
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.task}</td>
                  <td>{todo.description}</td>
                  <td>
                    {todo.status && (
                      <span className="badge rounded-pill text-bg-success">
                        Terminé
                      </span>
                    )}

                    {!todo.status && (
                      <span className="badge rounded-pill text-bg-warning">
                        En attente
                      </span>
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
    </div>
  );
}
