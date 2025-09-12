import { Button } from "@/components/ui/button";
import NoteForm from "@/features/note/NoteForm";
import NoteList from "@/features/note/NoteList";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Note = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const logoutHandler = () => {
    Cookies.remove("ACCESS_TOKEN", { path: "/" });
    toast.success("Logout success", { description: "See youu !!!" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen h-screen">
      <div className="sticky top-0 bg-white z-10 h-[8vh] border-b border-black">
        <NoteForm />
      </div>
      <div className="px-4 py-4">
        <NoteList />
        <div className="fixed z-10 right-8 bottom-8">
          <Button
            variant={isHovered ? "default" : "destructive"}
            className="rounded-full h-18 w-18 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={logoutHandler}
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
