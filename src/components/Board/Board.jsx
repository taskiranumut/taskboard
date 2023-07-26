import { useSelector } from "react-redux";
import ColumnList from "./ColumnList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask, moveColumn } from "../../store/slices/boardSlice";

export default function Board() {
  // TODO: Get data dynamically.
  const activeBoardId = useSelector((state) => state.activeBoardId);
  const columns = useSelector(
    (state) =>
      state.boards.find((item) => item.id === activeBoardId)?.columns ?? []
  );

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      // move column logic here
      dispatch(
        moveColumn({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else {
      // move task logic here
      dispatch(
        moveTask({
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          draggableId: draggableId,
        })
      );
    }
  };

  return (
    <main className="flex justify-center items-start p-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-board-auto-fit gap-6 overflow-x-auto w-full justify-items-center"
              >
                <ColumnList columns={columns} />
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
