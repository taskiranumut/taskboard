import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "./TaskList";
import Button from "../../shared/Button";
import ColumnHeader from "./ColumnHeader";
import { useDispatch } from "react-redux";
import { setAddTask } from "../../store/slices/boardSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function ColumnListItem({ columnNum, columnData, columnIndex }) {
  const { id: columnId, title: columntTitle, items } = columnData;
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(setAddTask(columnId));
  };

  return (
    <Draggable draggableId={columnId} index={columnIndex}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-orange-100 w-full max-w-[400px] rounded-md"
          >
            <ColumnHeader
              columntTitle={columntTitle}
              columnId={columnId}
              columnNum={columnNum}
              itemNum={items.length}
            />
            <div className={`grid gap-4 p-6`}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshots) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`h-[500px] ${
                        snapshots.isDraggingOver
                          ? "bg-slate-400"
                          : "bg-orange-600"
                      }`}
                    >
                      <TaskList items={items} columnId={columnId} />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>

              <Button
                onClick={handleAddTask}
                title="Add Task"
                fullWidth
                bgTransparent
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
                <span>Add Task</span>
              </Button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
