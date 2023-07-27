import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button";
import { v4 as uuidv4 } from "uuid";
import { addColumnToBoard } from "../redux/board/boardThunks";

export default function Header({ appTitle }) {
  const dispatch = useDispatch();

  const {
    rowId: boardId,
    columns,
    title: boardTitle,
  } = useSelector((state) => state.board);

  const handleAddColumn = () => {
    dispatch(
      addColumnToBoard({
        uuid: uuidv4(),
        title: "Untitled",
        order: columns.length + 1,
        boardId,
      })
    );
  };

  return (
    <header className="bg-orange-400 px-4 py-2 flex justify-between items-center">
      <div>
        <h1 className="py-2 text-3xl font-semibold">{appTitle}</h1>
        <h2 className="py-2 text-xl">
          <span className="font-semibold">Board:</span> {boardTitle}
        </h2>
      </div>
      <Button onClick={handleAddColumn} title="Add Column">
        <FontAwesomeIcon icon={faPlus} className="text-sm" />
        <span>Add Column</span>
      </Button>
    </header>
  );
}
