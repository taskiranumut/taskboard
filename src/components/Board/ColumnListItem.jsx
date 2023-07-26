import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TaskList from "./TaskList";

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
          /* TODO: DeleteButton */
          <button type="button" title="Delete Column">
            <FontAwesomeIcon
              icon={faTrash}
              className="px-2 hover:text-orange-500 active:text-orange-700 transition-colors"
            />
          </button>
        )}
      </div>
      <div className="grid gap-4 p-6">
        <TaskList items={items} />
        {/* TODO: AddButton */}
        <button
          className={`w-full bg-white rounded-md py-1 px-2 transition-colors hover:bg-orange-300 active:bg-orange-500 ${
            items.length !== 0 ? "mt-4" : ""
          }`}
          title="Add Task"
        >
          +
        </button>
      </div>
    </div>
  );
}
