import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/api/supabaseClient";
import { getReorderedList } from "@/utils/utils";

export const fetchActiveBoard = createAsyncThunk(
  "fetchActiveBoard",
  async () => {
    const {
      data: [board],
      error,
    } = await supabase
      .from("boards")
      .select(
        `
            id: uuid, 
            rowId: id,
            title, 
            active,
            columns (
                id: uuid,
                rowId: id,
                title,
                order,
                items (
                    id: uuid,
                    rowId: id,
                    description,
                    order
                )
            )
        `
      )
      .eq("active", true)
      .order("order", { foreignTable: "columns" });

    if (error) throw error;

    board.columns.forEach((column) => {
      column.items.sort((a, b) => a.order - b.order);
    });

    return board;
  }
);

export const updateColumnTitle = createAsyncThunk(
  "updateColumnTitle",
  async (payload) => {
    const {
      data: [data],
      error,
    } = await supabase
      .from("columns")
      .update({ title: payload.title })
      .eq("id", payload.rowId)
      .select();

    if (error) throw error;

    return data;
  }
);

export const updateTaskDescription = createAsyncThunk(
  "updateTaskDescription",
  async (payload) => {
    const {
      data: [data],
      error,
    } = await supabase
      .from("items")
      .update({ description: payload.description })
      .eq("id", payload.rowId)
      .select();

    if (error) throw error;

    return data;
  }
);

export const addEmptyTaskToColumn = createAsyncThunk(
  "addEmptyTaskToColumn",
  async (payload) => {
    const {
      data: [data],
      error,
    } = await supabase
      .from("items")
      .insert({
        uuid: payload.uuid,
        description: "",
        order: payload.order,
        column_id: payload.columnRowId,
      })
      .select();

    if (error) throw error;

    return data;
  }
);

export const addColumnToBoard = createAsyncThunk(
  "addColumnToBoard",
  async (payload) => {
    const {
      data: [data],
      error,
    } = await supabase
      .from("columns")
      .insert({
        uuid: payload.uuid,
        title: payload.title,
        order: payload.order,
        board_id: payload.boardId,
      })
      .select();

    if (error) throw error;

    return data;
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (payload) => {
  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", payload.rowId);

  if (error) throw error;

  return true;
});

export const deleteColumn = createAsyncThunk(
  "deleteColumn",
  async (payload) => {
    const { error: itemsError } = await supabase
      .from("items")
      .delete()
      .eq("column_id", payload.columnRowId);

    if (itemsError) throw itemsError;

    const { error: columnsError } = await supabase
      .from("columns")
      .delete()
      .eq("id", payload.columnRowId);

    if (columnsError) throw columnsError;

    return true;
  }
);

export const moveColumnInDb = createAsyncThunk(
  "moveColumnInDb",
  async (payload) => {
    const { sourceIndex, destinationIndex, columns } = payload;

    const [removed] = columns.splice(sourceIndex, 1);
    columns.splice(destinationIndex, 0, removed);

    const newColumns = getReorderedList(columns);

    const updatePromises = newColumns.map((column) =>
      supabase
        .from("columns")
        .update({ order: column.order })
        .eq("id", column.rowId)
    );

    const results = await Promise.all(updatePromises);

    for (const result of results) {
      if (result.error) {
        throw result.error;
      }
    }

    return true;
  }
);

export const moveTaskInDb = createAsyncThunk(
  "moveTaskInDb",
  async (payload) => {
    const {
      sourceColumnId,
      destinationColumnId,
      sourceIndex,
      destinationIndex,
      columns,
    } = payload;

    if (destinationColumnId === sourceColumnId) {
      const column = columns.find((column) => column.id === sourceColumnId);

      let columnItems = [...column.items];
      const [removed] = columnItems.splice(sourceIndex, 1);
      columnItems.splice(destinationIndex, 0, removed);
      columnItems = getReorderedList(columnItems);

      const updatePromises = columnItems.map((item) =>
        supabase
          .from("items")
          .update({ order: item.order })
          .eq("id", item.rowId)
      );

      await Promise.all(updatePromises);

      return true;
    } else {
      const sourceColumn = columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = columns.find(
        (column) => column.id === destinationColumnId
      );

      let sourceItems = [...sourceColumn.items];
      let destinationItems = [...destinationColumn.items];

      const [removed] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, removed);

      sourceItems = getReorderedList(sourceItems);
      destinationItems = getReorderedList(destinationItems);

      await supabase
        .from("items")
        .update({ column_id: destinationColumn.rowId })
        .eq("id", removed.rowId);

      const updatePromisesSource = sourceItems.map((item) =>
        supabase
          .from("items")
          .update({ order: item.order })
          .eq("id", item.rowId)
      );

      await Promise.all(updatePromisesSource);

      const updatePromisesDestination = destinationItems.map((item) =>
        supabase
          .from("items")
          .update({ order: item.order })
          .eq("id", item.rowId)
      );

      await Promise.all(updatePromisesDestination);
    }

    // for (const result of results) {
    //   if (result.error) {
    //     throw result.error;
    //   }
    // }

    return true;
  }
);
