import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "./TaskList";
import Button from "../../shared/Button";

export default function ColumnListItem({ columnNum, columnData }) {
  const { id: columndId, title: columntTitle, items } = columnData;

  return (
    <div
      key={columndId}
      className="bg-orange-100 w-full max-w-[400px] rounded-md"
    >
      <div className="flex justify-between items-center gap-1 py-2 px-4 bg-orange-200 rounded-t-md">
        <h3 className="font-semibold text-lg">{columntTitle}</h3>
        {columnNum > 1 && (
          <Button title="Delete Column" iconBtn bgTransparent>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
      </div>
      <div className="grid gap-4 p-6">
        <TaskList items={items} />

        <Button title="Add Task" fullWidth bgTransparent>
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
          <span>Add Task</span>
        </Button>
      </div>
    </div>
  );
}
