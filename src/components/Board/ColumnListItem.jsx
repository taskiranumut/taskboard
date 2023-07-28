import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "@/components/Board/TaskList";
import Button from "@/shared/Button";
import ColumnHeader from "@/components/Board/ColumnHeader";
import { useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { addEmptyTaskToColumn } from "@/redux/board/boardThunks";
import { v4 as uuidv4 } from "uuid";
import { setNewTaskId } from "@/redux/board/boardSlice";

export default function ColumnListItem({ columnNum, columnData, columnIndex }) {
  const { id: columnId, title: columntTitle, items, rowId } = columnData;
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const taskId = uuidv4();

    dispatch(setNewTaskId(taskId));

    dispatch(
      addEmptyTaskToColumn({
        uuid: taskId,
        order: items.length + 1,
        columnRowId: rowId,
        columnId,
      })
    );
  };

  return (
    <Draggable draggableId={columnId} index={columnIndex}>
      {(provided) => {
        return (
          /* <-- Start:: Column (draggable for colums container) --> */
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full bg-orange-100 rounded-md min-w-[300px] max-w-[400px] h-full self-stretch"
          >
            <ColumnHeader
              columntTitle={columntTitle}
              columnId={columnId}
              columnNum={columnNum}
              itemNum={items.length}
              rowId={rowId}
            />
            {/* <-- Start:: Column content --> */}
            <div className={`flex flex-col gap-4 p-6 h-full`}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshots) => {
                  return (
                    /* <-- Start:: Task list container (droppable for tasks) --> */
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col gap-2 rounded-md min-h-[20px] transition-colors  ${
                        snapshots.isDraggingOver ? "bg-orange-300" : ""
                      }`}
                    >
                      <TaskList items={items} columnId={columnId} />
                      {provided.placeholder}
                    </div>
                    /* <-- End:: Task list container (droppable for tasks) --> */
                  );
                }}
              </Droppable>
              {/* <-- Start:: Column action buttons --> */}
              <Button
                onClick={handleAddTask}
                title="Add Task"
                fullWidth
                bgTransparent
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
                <span>Add Task</span>
              </Button>
              {/* <-- End:: Column action buttons --> */}
            </div>
            {/* <-- End:: Column content --> */}
          </div>
          /* <-- End:: Column (draggable for colums container) --> */
        );
      }}
    </Draggable>
  );
}
