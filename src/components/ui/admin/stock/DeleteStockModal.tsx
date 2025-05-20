import React from "react";
import { ConfirmDialog } from "../../confirm-dialoge";
import { Button } from "../../button";
import { Trash2 } from "lucide-react";

const DeleteStockModal = () => {
  return (
    <ConfirmDialog
      onConfirm={() => console.log("Delete confirmed")}
      title="Delete this stock?"
      description="This will permanently remove the stock."
      actionText="Delete"
    >
      <Button variant="ghost">
        {" "}
        <Trash2 size={16} className="text-red-500 hover:text-red-700" />
      </Button>
    </ConfirmDialog>
  );
};

export default DeleteStockModal;
