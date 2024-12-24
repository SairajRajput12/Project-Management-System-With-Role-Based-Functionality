import React, { useRef } from "react";
import Button from "../UI/Button";
import FormSelection from "./FormSelection";

const DialogWithUseRef = () => {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div>
      <Button className='user-button' onSubmit={openDialog}>Get Started</Button>
      <dialog ref={dialogRef} aria-modal="true">
        <FormSelection />
        <Button className='user-button' onSubmit={closeDialog}>Close</Button>
      </dialog>
    </div>
  );
};

export default DialogWithUseRef;
