import type { Dispatch } from "react";

export interface INoteDeleteDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  noteid: string;
  title: string;
}

export interface INoteDetailDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  updateHandler: () => void;
  noteid: string;
}

export interface INoteDialog {
  noteid?: string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface INoteCard {
  noteid: string;
  title: string;
  description: string;
}
