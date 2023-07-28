import TaskListItem from "@/components/Board/TaskListItem";

export default function TaskList({ columnId, items }) {
  return (
    <>
      {items.map((item, index) => (
        <TaskListItem
          key={item.id}
          itemData={item}
          columnId={columnId}
          index={index}
        />
      ))}
    </>
  );
}
