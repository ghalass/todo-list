import React from "react";

function TodoNewBtn({
  processing,
  handleNew,
}: {
  processing: boolean;
  handleNew: () => void;
}) {
  return (
    <>
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
    </>
  );
}

export default TodoNewBtn;
