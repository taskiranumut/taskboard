import toast, { Toaster, ToastBar } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/shared/Button";

export default function CustomToaster() {
  return (
    <Toaster position="top-left">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <Button onClick={() => toast.dismiss(t.id)} iconBtn>
                  {" "}
                  <FontAwesomeIcon icon={faXmark} className="text-lg" />{" "}
                </Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
