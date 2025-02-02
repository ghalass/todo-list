"use client";

import { CRUD, DELAY, DOMAIN } from "@/utils/constants";
import { Todo } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import { toast } from "react-toastify";
import { createTodoSchema } from "@/utils/validationSchema";

import * as yup from "yup";

export default function Home() {
  const url = `${DOMAIN}/api/todos`;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [operation, setOperation] = useState(CRUD.ADD);

  const [formErrors, setFormErrors] = useState({
    task: "",
    description: "",
  });

  const [id, setId] = useState(0);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async () => {
    setProcessing(true);
    setTimeout(async () => {
      const currentTodo = {
        id: id,
        task: task,
        description: description,
        status: status,
      };
      try {
        await createTodoSchema.validate(currentTodo, { abortEarly: false });

        setProcessing(true);
        switch (operation) {
          case CRUD.ADD:
            await axios.post(`${url}`, currentTodo);
            toast.success("Ajouté avec succès!");
            break;
          case CRUD.UPDATE:
            const res = await axios.put(`${url}`, currentTodo);
            // console.log(currentTodo, res);
            toast.success("Modifié avec succès!");
            break;
          case CRUD.DELETE:
            await axios.delete(`${url}?id=${currentTodo.id}`);
            toast.info("Supprimé avec succès!");
            break;
          case CRUD.SHOW:
            break;
          default:
            break;
        }
        loadDATA();
        setError("");
        setTODO({ id: 0, task: "", description: "", status: false });
        setOperation(CRUD.ADD);
      } catch (error: any) {
        if (error instanceof yup.ValidationError) {
          setError("");
          const errorObj: {
            task?: string;
            description?: string;
            status?: boolean;
          } = error.inner.reduce(
            (
              acc: Record<string, string>,
              currentError: yup.ValidationError
            ) => {
              acc[currentError.path!] = currentError.message;
              return acc;
            },
            {}
          );
          setFormErrors({
            task: errorObj?.task || "",
            description: errorObj?.description || "",
          });
        } else {
          setFormErrors({
            task: "",
            description: "",
          });
          // console.log(error);
          setError(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setProcessing(false);
      }
      setProcessing(false);
    }, DELAY);
  };

  const setTODO = (todo: Todo) => {
    setId(todo.id);
    setTask(todo.task);
    setDescription(todo.description || "");
    setStatus(todo.status);
    setError("");
    setFormErrors({
      task: "",
      description: "",
    });
  };

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

  useEffect(() => {
    loadDATA();
  }, []);

  return (
    <div className="row m-2">
      <div className="col-sm-4">
        {/* CRUD */}
        <TodoForm
          error={error}
          task={task}
          setTask={setTask}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          processing={processing}
          operation={operation}
          setOperation={setOperation}
          setTODO={setTODO}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      </div>
      <div className="col-sm-8">
        {/* LIST */}
        <TodosList
          todos={todos}
          loading={loading}
          setOperation={setOperation}
          setTODO={setTODO}
          loadDATA={loadDATA}
        />
      </div>
    </div>
  );
}
