import TaskListItem from "./TaskListItem";

export default function TaskList({ columnId, items }) {
  return (
    <>
      {items.map((item) => (
        <TaskListItem key={item.id} itemData={item} columnId={columnId} />
      ))}
    </>
  );
}
