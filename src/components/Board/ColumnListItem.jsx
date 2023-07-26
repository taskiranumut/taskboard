import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "./TaskList";
import Button from "../../shared/Button";
import ColumnHeader from "./ColumnHeader";

export default function ColumnListItem({ columnNum, columnData }) {
  const { id: columnId, title: columntTitle, items } = columnData;
  return (
    <div className="bg-orange-100 w-full max-w-[400px] rounded-md">
      <ColumnHeader
        columntTitle={columntTitle}
        columnId={columnId}
        columnNum={columnNum}
      />
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
