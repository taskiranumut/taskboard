import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "@/shared/Button";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { deleteTask, updateTaskDescription } from "@/redux/board/boardThunks";
import { useSelector } from "react-redux";
import { selectUpdateTaskDescriptionStatus } from "@/redux/board/boardSelectors";

export default function TaskListItem({ columnId, itemData, index }) {
  const { id: taskId, description, rowId } = itemData;

  const [isActiveEdit, setIsActiveEdit] = useState(false);
  const [taskForm, setTaskForm] = useState({ description });
  // TODO: Use descriptionLoading for api response.
  const { loading: descriptionLoading } = useSelector(
    selectUpdateTaskDescriptionStatus
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTaskForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    if (!taskForm.description) return;

    dispatch(
      updateTaskDescription({
        columnId,
        taskId,
        rowId,
        description: taskForm.description,
      })
    );

    handleCloseEdit(null, false);
  };

  const handleOpenEdit = (e) => {
    if (e) e.stopPropagation();

    setIsActiveEdit(true);
  };

  const handleCloseEdit = (e, reset = true) => {
    if (e) e.stopPropagation();

    setIsActiveEdit(false);
    if (reset) setTaskForm({ description });
  };

  const handleDeleteTask = (e) => {
    e.stopPropagation();

    // TODO: Add confirm modal.
    const isConfirmed = window.confirm(
      `Do you want to delete "${description}" task?`
    );
    if (!isConfirmed) return;
    dispatch(deleteTask({ columnId, rowId, taskId }));
  };

  return (
    <Draggable key={taskId} draggableId={taskId} index={index}>
      {(provided) => {
        return (
          /* <-- Start:: Task (draggable for task list container) --> */
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex justify-between items-center py-3 px-4 rounded-md bg-orange-50 cursor-pointer border h-min border-orange-300 group min-h-[50px]"
          >
            {isActiveEdit ? (
              /* <-- Start:: Task content form --> */
              <form className="w-full" onSubmit={handleSubmitTask}>
                <div className="w-full">
                  <textarea
                    name="description"
                    rows="3"
                    className="px-3 py-2 w-full rounded-md outline-none border border-transparent focus:border-orange-400 transition-colors resize-none"
                    placeholder="Task description"
                    onChange={handleChange}
                    value={taskForm.description}
                  />
                </div>
                <div className="flex justify-start items-center gap-2 mt-2">
                  <Button type="submit" className="flex-1">
                    Save
                  </Button>
                  <Button className="flex-2" onClick={handleCloseEdit}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              /* <-- End:: Task content form --> */

              /* <-- Start:: Task action buttons --> */
              <>
                <p className="me-2">{description}</p>
                <div className="flex justify-end items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Button
                    className="md:px-1.5"
                    onClick={handleOpenEdit}
                    title="Edit Task"
                    iconBtn
                    bgTransparent
                    disabled={descriptionLoading}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button
                    className="md:px-1.5"
                    onClick={handleDeleteTask}
                    title="Delete Task"
                    iconBtn
                    bgTransparent
                    disabled={descriptionLoading}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </>
              /* <-- End:: Task action buttons --> */
            )}
          </div>
          /* <-- End:: Task (draggable for task list container) --> */
        );
      }}
    </Draggable>
  );
}
