import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActiveBoard,
  updateColumnTitle,
  updateTaskDescription,
  addEmptyTaskToColumn,
  addColumnToBoard,
  deleteTask,
  deleteColumn,
} from "./boardThunks";

const initialState = {
  board: {},
  boardTitle: "",
  asyncStatus: {
    fetchActiveBoard: { loading: false, error: "" },
    updateColumnTitle: { loading: false, error: "" },
    updateTaskDescription: { loading: false, error: "" },
    addEmptyTaskToColumn: { loading: false, error: "" },
    addColumnToBoard: { loading: false, error: "" },
    deleteTask: { loading: false, error: "" },
    deleteColumn: { loading: false, error: "" },
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
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

    // addColumnToBoard
    builder
      .addCase(addColumnToBoard.pending, (state) => {
        state.asyncStatus[addColumnToBoard.typePrefix].loading = true;
      })
      .addCase(addColumnToBoard.fulfilled, (state, action) => {
        state.asyncStatus[addColumnToBoard.typePrefix].loading = false;

        const { id: rowId, uuid, order, title } = action.payload;

        state.board.columns.push({
          id: uuid,
          title,
          order,
          items: [],
          rowId,
        });
      })
      .addCase(addColumnToBoard.rejected, (state, action) => {
        state.asyncStatus[addColumnToBoard.typePrefix].loading = false;
        state.asyncStatus[addColumnToBoard.typePrefix].error = action.error;
      });

    // deleteTask
    builder
      .addCase(deleteTask.pending, (state) => {
        state.asyncStatus[deleteTask.typePrefix].loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.asyncStatus[deleteTask.typePrefix].loading = false;

        const { taskId, columnId } = action.meta.arg;

        const column = state.board.columns.find(
          (column) => column.id === columnId
        );
        if (!column) return;

        column.items = column.items.filter((item) => item.id !== taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.asyncStatus[deleteTask.typePrefix].loading = false;
        state.asyncStatus[deleteTask.typePrefix].error = action.error;
      });

    // deleteColumn
    builder
      .addCase(deleteColumn.pending, (state) => {
        state.asyncStatus[deleteColumn.typePrefix].loading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.asyncStatus[deleteColumn.typePrefix].loading = false;

        const { columnId } = action.meta.arg;

        state.board.columns = state.board.columns.filter(
          (column) => column.id !== columnId
        );
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.asyncStatus[deleteColumn.typePrefix].loading = false;
        state.asyncStatus[deleteColumn.typePrefix].error = action.error;
      });
  },
});

export const { moveTask, moveColumn } = boardSlice.actions;
export default boardSlice.reducer;
