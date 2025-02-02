import { CRUD } from "@/utils/constants";
import React from "react";

function TodoSubmitBtn({
  operation,
  handleSubmit,
  processing,
}: {
  operation: CRUD;
  handleSubmit: () => void;
  processing: boolean;
}) {
  const setButtonTitle = () => {
    let title = "";
    let cls = "success";
    let icon = "bi-plus-lg";
    switch (operation) {
      case CRUD.ADD:
        title = "Ajouter";
        cls = "success";
        icon = "bi-plus-lg";
        break;
      case CRUD.UPDATE:
        title = "Modifier";
        cls = "secondary";
        icon = "bi-pencil";
        break;
      case CRUD.DELETE:
        title = "Supprimer";
        cls = "danger";
        icon = "bi-trash3";
        break;
      default:
        break;
    }
    return { title, cls, icon };
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className={`btn btn-sm btn-outline-${setButtonTitle().cls}  mb-1`}
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
    </>
  );
}

export default TodoSubmitBtn;
