import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  fetchActiveBoard,
  updateColumnTitle,
  updateTaskDescription,
  addEmptyTaskToColumn,
} from "./boardThunks";

const initialState = {
  board: {},
  boardTitle: "",
  asyncStatus: {
    fetchActiveBoard: { loading: false, error: "" },
    updateColumnTitle: { loading: false, error: "" },
    updateTaskDescription: { loading: false, error: "" },
    addEmptyTaskToColumn: { loading: false, error: "" },
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setColumnList: (state, action) => {
      console.log("setColumnList action:", action);

      const columnId = action.payload;

      state.board.columns = state.board.columns.filter(
        (column) => column.id !== columnId
      );
    },
    setTaskList: (state, action) => {
      console.log("setTaskList action:", action);

      const { columnId, taskId } = action.payload;
      const column = state.board.columns.find(
        (column) => column.id === columnId
      );
      if (!column) return;

      column.items = column.items.filter((item) => item.id !== taskId);
    },
    setAddColumn: (state) => {
      console.log("setAddColumn worked");

      // const columnNum = state.board.columns.length;

      state.board.columns.push({
        id: uuidv4(),
        title: "Untitled",
        // order: columnNum + 1,
        items: [],
      });
    },
    moveTask: (state, action) => {
      console.log("moveTask action", action);
      const {
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        // draggableId,
      } = action.payload;

      const sourceColumn = state.board.columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = state.board.columns.find(
        (column) => column.id === destinationColumnId
      );

      const [removed] = sourceColumn.items.splice(sourceIndex, 1);
      destinationColumn.items.splice(destinationIndex, 0, removed);
    },
    moveColumn: (state, action) => {
      console.log("moveColumn action", action);

      const { sourceIndex, destinationIndex } = action.payload;

      const [removed] = state.board.columns.splice(sourceIndex, 1);
      state.board.columns.splice(destinationIndex, 0, removed);
    },
  },
  extraReducers: (builder) => {
    // fetchActiveBoard
    builder
      .addCase(fetchActiveBoard.pending, (state) => {
        state.asyncStatus[fetchActiveBoard.typePrefix].loading = true;
      })
      .addCase(fetchActiveBoard.fulfilled, (state, action) => {
        state.asyncStatus[fetchActiveBoard.typePrefix].loading = false;

        const board = action.payload;

        state.board = board;
        state.boardTitle = board?.title ?? "Untitled";
      })
      .addCase(fetchActiveBoard.rejected, (state, action) => {
        state.asyncStatus[fetchActiveBoard.typePrefix].loading = false;
        state.asyncStatus[fetchActiveBoard.typePrefix].error = action.error;
      });

    // updateColumnTitle
    builder
      .addCase(updateColumnTitle.pending, (state) => {
        state.asyncStatus[updateColumnTitle.typePrefix].loading = true;
      })
      .addCase(updateColumnTitle.fulfilled, (state, action) => {
        state.asyncStatus[updateColumnTitle.typePrefix].loading = false;

        const { columnId, title } = action.meta.arg;

        const columnToUpdate = state.board.columns.find(
          (column) => column.id === columnId
        );
        if (!columnToUpdate) return;

        columnToUpdate.title = title;
      })
      .addCase(updateColumnTitle.rejected, (state, action) => {
        state.asyncStatus[updateColumnTitle.typePrefix].loading = false;
        state.asyncStatus[updateColumnTitle.typePrefix].error = action.error;
      });

    // updateTaskDescription
    builder
      .addCase(updateTaskDescription.pending, (state) => {
        state.asyncStatus[updateTaskDescription.typePrefix].loading = true;
      })
      .addCase(updateTaskDescription.fulfilled, (state, action) => {
        state.asyncStatus[updateTaskDescription.typePrefix].loading = false;

        const { columnId, taskId, description } = action.meta.arg;
        const column = state.board.columns.find(
          (column) => column.id === columnId
        );
        if (!column) return;

        const task = column.items.find((item) => item.id === taskId);
        if (!task) return;

        task.description = description;
      })
      .addCase(updateTaskDescription.rejected, (state, action) => {
        state.asyncStatus[updateTaskDescription.typePrefix].loading = false;
        state.asyncStatus[updateTaskDescription.typePrefix].error =
          action.error;
      });

    // addEmptyTaskToColumn
    builder
      .addCase(addEmptyTaskToColumn.pending, (state) => {
        state.asyncStatus[addEmptyTaskToColumn.typePrefix].loading = true;
      })
      .addCase(addEmptyTaskToColumn.fulfilled, (state, action) => {
        state.asyncStatus[addEmptyTaskToColumn.typePrefix].loading = false;

        const { id: rowId, uuid, order } = action.payload;
        const { columnId } = action.meta.arg;

        const column = state.board.columns.find(
          (column) => column.id === columnId
        );
        if (!column) return;

        column.items.push({
          id: uuid,
          rowId,
          description: "",
          order,
        });
      })
      .addCase(addEmptyTaskToColumn.rejected, (state, action) => {
        state.asyncStatus[addEmptyTaskToColumn.typePrefix].loading = false;
        state.asyncStatus[addEmptyTaskToColumn.typePrefix].error = action.error;
      });
  },
});

export const {
  setColumnList,
  setTaskList,
  setAddColumn,
  moveTask,
  moveColumn,
} = boardSlice.actions;
export default boardSlice.reducer;
