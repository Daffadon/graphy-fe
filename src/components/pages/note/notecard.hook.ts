import { useState } from "react";

export const useNoteCard = () => {
  const [onUpdate, setOnUpdate] = useState<boolean>(false);
  const [onDetail, setOnDetail] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);

  const updateFromDetail = () => {
    setOnDetail(false);
    setOnUpdate(true);
  };

  return { onUpdate, onDetail, onDelete, setOnDelete, updateFromDetail,setOnUpdate,setOnDetail };
};
