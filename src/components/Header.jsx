import { useDispatch, useSelector } from "react-redux";
import { setAddColumn } from "../store/slices/boardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button";

export default function Header({ appTitle }) {
  const dispatch = useDispatch();

  const boardTitle = useSelector((state) => state.boardTitle);

  const handleAddColumn = () => {
    dispatch(setAddColumn());
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
