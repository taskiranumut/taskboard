import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/Button";

export default function TaskListItem({ itemData }) {
  const { id: taskId, description } = itemData;

  return (
    <div
      key={taskId}
      className="flex justify-between items-center py-3 px-4 rounded-md bg-orange-50 cursor-pointer border border-orange-300 group"
    >
      <p>{description}</p>
      <div className="flex justify-end items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <Button className="px-1.5" title="Edit Task" iconBtn bgTransparent>
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button className="px-1.5" title="Delete Task" iconBtn bgTransparent>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
}
