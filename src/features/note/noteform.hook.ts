import { useState } from "react";

export const useNoteForm = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return { openDialog, setOpenDialog };
};
