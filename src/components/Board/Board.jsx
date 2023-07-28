import { useSelector } from "react-redux";
import ColumnList from "./ColumnList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveColumnInDb, moveTaskInDb } from "../../redux/board/boardThunks";
import { moveTask, moveColumn } from "../../redux/board/boardSlice";

export default function Board() {
  const columns = useSelector((state) => state.board.columns ?? []);

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

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
      // TODO: Fix duplicated codes.

      // First mutate the columns order in UI according to optimistic UI approach.
      dispatch(
        moveTask({
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          // draggableId: draggableId,
        })
      );

      // After that mutate the orders in db.
      dispatch(
        moveTaskInDb({
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          columns: [...columns],
        })
      );
    }
  };

  return (
    <main className="flex justify-center items-start p-6 md:p-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided, snapshots) => {
            return (
              /* <-- Start:: Columns container (droppable for columns) --> */
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex justify-center items-start gap-6 flex-wrap md:flex-nowrap overflow-x-auto transition-colors py-4 w-full rounded-md h-full ${
                  snapshots.isDraggingOver ? "bg-gray-100" : ""
                }`}
              >
                <ColumnList columns={columns} />
                {provided.placeholder}
              </div>
              /* <-- End:: Columns container (droppable for columns) --> */
            );
          }}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
