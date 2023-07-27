import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

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
