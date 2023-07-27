// boardThunks.js
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
