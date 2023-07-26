import { useSelector } from "react-redux";
import ColumnList from "./ColumnList";

export default function Board() {
  // TODO: Get data dynamically.
  const activeBoardId = useSelector((state) => state.activeBoardId);
  const columns = useSelector(
    (state) =>
      state.boards.find((item) => item.id === activeBoardId)?.columns ?? []
  );

  return (
    <main className="flex justify-center items-start p-12">
      <div className="grid grid-cols-board-auto-fit gap-6 overflow-x-auto w-full justify-items-center">
        <ColumnList columns={columns} />
      </div>
    </main>
  );
}
