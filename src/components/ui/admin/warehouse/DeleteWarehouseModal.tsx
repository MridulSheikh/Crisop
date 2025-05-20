import React from "react";
import { ConfirmDialog } from "../../confirm-dialoge";
import { Button } from "../../button";

const DeleteWarehouseModal = () => {
  return (
    <ConfirmDialog
      onConfirm={() => console.log("Delete confirmed")}
      title="Delete this Warehouse?"
      description="This will permanently remove the warehouse."
      actionText="Delete"
    >
      <Button variant="ghost" size={"sm"} className=" text-red-600 hover:underline">
        Delete
      </Button>
    </ConfirmDialog>
  );
};

export default DeleteWarehouseModal;
