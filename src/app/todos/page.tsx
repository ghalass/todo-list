"use client";

import { DELAY, DOMAIN } from "@/utils/constants";
import { Todo } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import { toast } from "react-toastify";

export default function Home() {
  const url = `${DOMAIN}/api/todos`;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
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
            toast.success("Ajouté avec succès!");
            break;
          case "update":
            break;
          case "delete":
            const del_res = await axios.delete(`${url}?id=${data.id}`);
            toast.info("Supprimé avec succès!");
            break;
          default:
            break;
        }

        loadDATA();
        setError("");
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
    setError("");
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

      <TodoForm
        error={error}
        task={task}
        description={description}
        status={status}
        processing={processing}
        operation={operation}
        setTask={setTask}
        setDescription={setDescription}
        setStatus={setStatus}
        setButtonTitle={setButtonTitle}
        handleSubmit={handleSubmit}
        handleNew={handleNew}
      />

      {/* LIST */}

      <TodosList
        todos={todos}
        loading={loading}
        setOperation={setOperation}
        setTODO={setTODO}
      />
    </div>
  );
}
