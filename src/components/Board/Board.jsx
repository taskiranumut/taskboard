import { useSelector } from "react-redux";
import ColumnList from "./ColumnList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveColumnInDb } from "../../redux/board/boardThunks";
import { moveTask, moveColumn } from "../../redux/board/boardSlice";

export default function Board() {
  const columns = useSelector((state) => state.board.columns ?? []);

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
      // TODO: Fix duplicated codes.

      // First mutate the columns order in UI according to optimistic UI approach.
      dispatch(
        moveColumn({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
      // After that mutate the orders in db.
      dispatch(
        moveColumnInDb({
          sourceIndex: source.index,
          destinationIndex: destination.index,
          columns: [...columns],
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
