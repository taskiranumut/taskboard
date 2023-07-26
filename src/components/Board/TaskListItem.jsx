import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/Button";

export default function TaskListItem({ itemData }) {
  const { id: taskId, description } = itemData;

  return (
    <div
      key={taskId}
      className="flex justify-between items-center py-3 px-4 rounded-md bg-orange-50 cursor-pointer border border-orange-300"
    >
      {description}
      <Button title="Delete Task" iconBtn bgTransparent>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}
