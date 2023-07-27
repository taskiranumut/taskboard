import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/Button";
import { deleteColumn, updateColumnTitle } from "../../redux/board/boardThunks";
import { useSelector } from "react-redux";

export default function ColumnHeader({
  columntTitle,
  columnId,
  columnNum,
  itemNum,
  rowId,
}) {
  const [isActiveTitleInput, setIsActiveTitleInput] = useState(false);
  const [titleValue, setTitleValue] = useState(columntTitle);
  const titleInputRef = useRef(null);
  // TODO: Use titleLoading for api response.
  const { loading: titleLoading } = useSelector(
    (state) => state.asyncStatus["updateColumnTitle"]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscapeKeydown = (e) => {
      if (isActiveTitleInput && e.key.toLowerCase() === "escape") {
        setTitleValue(columntTitle);
        handleCloseTitleInput();
      }
    };

    document.addEventListener("keydown", handleEscapeKeydown);

    return () => document.removeEventListener("keydown", handleEscapeKeydown);
  }, [isActiveTitleInput, columntTitle]);

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
    dispatch(updateColumnTitle({ columnId, rowId, title: titleValue }));
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

    dispatch(deleteColumn({ columnId, columnRowId: rowId }));
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
            disabled={titleLoading}
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
