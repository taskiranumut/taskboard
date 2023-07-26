import ColumnListItem from "./ColumnListItem";

export default function ColumnList({ columns }) {
  return (
    <>
      {columns.map((columnData) => (
        <ColumnListItem
          key={columnData.id}
          columnData={columnData}
          columnNum={columns.length}
        />
      ))}
    </>
  );
}
