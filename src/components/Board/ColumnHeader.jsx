import { useDispatch } from "react-redux";
import { setColumnTitle } from "../../store/slices/boardSlice";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/Button";

export default function ColumnHeader({ columntTitle, columnId, columnNum }) {
  const [isActiveTitleInput, setIsActiveTitleInput] = useState(false);
  const titleInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEnterKeydown = (e) => {
      if (isActiveTitleInput && e.key.toLowerCase() === "enter") {
        handleCloseTitleInput();
      }
    };

    document.addEventListener("keydown", handleEnterKeydown);

    return () => document.removeEventListener("keydown", handleEnterKeydown);
  }, [isActiveTitleInput]);

  useEffect(() => {
    if (!isActiveTitleInput) return;

    const inputEl = titleInputRef.current;
    inputEl.focus();
    inputEl.select();
  }, [isActiveTitleInput]);

  const handleChangeTitle = (e) => {
    const title = e.target.value;
    dispatch(setColumnTitle({ columnId, title }));
  };

  const handleOpenTitleInput = () => {
    setIsActiveTitleInput(true);
  };

  const handleCloseTitleInput = () => {
    setIsActiveTitleInput(false);
  };

  return (
    <div className="flex justify-between items-center gap-1 py-2 px-4 bg-orange-200 rounded-t-md h-[52px]">
      {isActiveTitleInput ? (
        <input
          type="text"
          className="px-3 py-2 w-full rounded-md outline-none border border-transparent focus:border-orange-400 transition-colors"
          onChange={handleChangeTitle}
          onBlur={handleCloseTitleInput}
          ref={titleInputRef}
          value={columntTitle}
        />
      ) : (
        <h3
          className="font-semibold text-lg cursor-pointer"
          title="Change Title (Double Click)"
          onDoubleClick={handleOpenTitleInput}
        >
          {columntTitle}
        </h3>
      )}

      {columnNum > 1 && (
        <Button title="Delete Column" iconBtn bgTransparent>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </div>
  );
}
