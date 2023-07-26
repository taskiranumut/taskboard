import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskListItem({ itemData }) {
  const { id: taskId, description } = itemData;

  return (
    <div
      key={taskId}
      className="flex justify-between items-center py-3 px-4 rounded-md bg-orange-50 cursor-pointer border border-orange-300"
    >
      {description}
      {/* TODO: DeleteButton */}
      <button type="button" title="Delete Task">
        <FontAwesomeIcon
          icon={faTrash}
          className="hover:text-orange-500 active:text-orange-700 transition-colors"
        />
      </button>
    </div>
  );
}
