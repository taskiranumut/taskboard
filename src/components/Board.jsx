import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Board() {
  // TODO: Get data dynamically.
  const activeBoardId = useSelector((state) => state.activeBoardId);
  const columns = useSelector(
    (state) =>
      state.boards.find((item) => item.id === activeBoardId)?.columns ?? []
  );

  return (
    <main className="flex justify-center items-start p-12">
      <div className="grid grid-cols-board-auto-fit gap-6 overflow-x-auto  w-full justify-items-center">
        {/* TODO: ColumnList */}
        {columns.map(({ id, title, items }) => (
          /* TODO: ColumnListItem */
          <div
            key={id}
            className="bg-orange-100 w-full max-w-[400px] rounded-md"
          >
            <div className="flex justify-between items-center gap-1 py-2 px-4 bg-orange-200 rounded-t-md">
              <h3 className="font-semibold text-lg">{title}</h3>
              {columns.length > 1 && (
                /* TODO: DeleteButton */
                <button type="button" title="Delete Column">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="hover:text-orange-500 active:text-orange-700 transition-colors"
                  />
                </button>
              )}
            </div>
            {/* TODO: TaskList */}
            <div className="grid gap-4 p-6">
              {items.map(({ id, description }) => (
                /* TODO: TaskListItem */
                <div
                  key={id}
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
              ))}
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
        ))}
      </div>
    </main>
  );
}
