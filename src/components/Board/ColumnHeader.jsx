import { useDispatch } from "react-redux";
import { setColumnTitle, setColumnList } from "../../redux/board/boardSlice";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/Button";

export default function ColumnHeader({
  columntTitle,
  columnId,
  columnNum,
  itemNum,
}) {
  const [isActiveTitleInput, setIsActiveTitleInput] = useState(false);
  const [titleValue, setTitleValue] = useState(columntTitle);
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

  const handleChangeTitleValue = (e) => {
    setTitleValue(e.target.value);
  };

  const handleSubmitTitle = (e) => {
    if (e) e.preventDefault();

    handleCloseTitleInput();
    if (titleValue === columntTitle) return;
    dispatch(setColumnTitle({ columnId, title: titleValue }));
  };

  const handleOpenTitleInput = () => {
    setIsActiveTitleInput(true);
  };

  const handleCloseTitleInput = () => {
    setIsActiveTitleInput(false);
  };

  const handleDeleteColumn = (e) => {
    e.stopPropagation();

    if (columnNum <= 1) return;

    // TODO: Add confirm modal.
    const isConfirmed = window.confirm(
      `Do you want to delete "${columntTitle}" column? `
    );
    if (!isConfirmed) return;

    dispatch(setColumnList(columnId));
  };

  return (
    <div className="flex justify-between items-center gap-1 py-2 px-4 bg-orange-200 rounded-t-md h-[52px]">
      {isActiveTitleInput ? (
        <form className="w-full" onSubmit={handleSubmitTitle}>
          <input
            type="text"
            className="px-3 py-2 w-full rounded-md outline-none border border-transparent focus:border-orange-400 transition-colors"
            onChange={handleChangeTitleValue}
            onBlur={handleSubmitTitle}
            ref={titleInputRef}
            value={titleValue}
          />
        </form>
      ) : (
        <div className="flex justify-start items-center w-full">
          <h3
            className="font-semibold text-lg cursor-pointer w-max"
            title="Change Title (Double Click)"
            onDoubleClick={handleOpenTitleInput}
          >
            {columntTitle}
          </h3>
          <span className="font-semibold text-lg ms-2"> | {itemNum}</span>
        </div>
      )}

      {columnNum > 1 && (
        <Button
          onClick={handleDeleteColumn}
          title="Delete Column"
          iconBtn
          bgTransparent
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </div>
  );
}
