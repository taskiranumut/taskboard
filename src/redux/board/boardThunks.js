// boardThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

export const fetchActiveBoard = createAsyncThunk(
  "board/fetchActiveBoard",
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
                items (
                    id: uuid,
                    rowId: id,
                    description
                )
            )
        `
      )
      .eq("active", true);

    if (error) throw Error(error);

    return board;
  }
);
