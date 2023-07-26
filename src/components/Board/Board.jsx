import { useSelector } from "react-redux";
import ColumnList from "./ColumnList";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../../store/slices/boardSlice";

export default function Board() {
  // TODO: Get data dynamically.
  const activeBoardId = useSelector((state) => state.activeBoardId);
  const columns = useSelector(
    (state) =>
      state.boards.find((item) => item.id === activeBoardId)?.columns ?? []
  );

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        draggableId: draggableId,
      })
    );
  };

  return (
    <main className="flex justify-center items-start p-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-board-auto-fit gap-6 overflow-x-auto w-full justify-items-center">
          <ColumnList columns={columns} />
        </div>
      </DragDropContext>
    </main>
  );
}
