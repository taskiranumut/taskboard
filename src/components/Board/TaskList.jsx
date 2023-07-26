import TaskListItem from "./TaskListItem";

export default function TaskList({ items }) {
  return (
    <>
      {items.map((item) => (
        <TaskListItem key={item.id} itemData={item} />
      ))}
    </>
  );
}
