import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActiveBoard,
  updateColumnTitle,
  updateTaskDescription,
  addEmptyTaskToColumn,
  addColumnToBoard,
  deleteTask,
  deleteColumn,
  moveColumnInDb,
  moveTaskInDb,
} from "./boardThunks";
import { getReorderedList, getToaster } from "../../utils/utils";
import { commonErrorMessage } from "../../data/constants";

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
    moveColumnInDb: { loading: false, error: "" },
    moveTaskInDb: { loading: false, error: "" },
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

      if (destinationColumnId === sourceColumnId) {
        const column = state.board.columns.find(
          (column) => column.id === sourceColumnId
        );

        const [removed] = column.items.splice(sourceIndex, 1);
        column.items.splice(destinationIndex, 0, removed);
        column.items = getReorderedList(column.items);
        return;
      }

      const sourceColumn = state.board.columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = state.board.columns.find(
        (column) => column.id === destinationColumnId
      );

      const [removed] = sourceColumn.items.splice(sourceIndex, 1);
      destinationColumn.items.splice(destinationIndex, 0, removed);

      sourceColumn.items = getReorderedList(sourceColumn.items);
      destinationColumn.items = getReorderedList(destinationColumn.items);
    },
    moveColumn: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;

      const [removed] = state.board.columns.splice(sourceIndex, 1);
      state.board.columns.splice(destinationIndex, 0, removed);

      state.board.columns = getReorderedList(state.board.columns);
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
        const errorMessage = action.error?.message ?? "";
        getToaster("Something went wrong.", "error");
        // TODO: Remove error log.
        console.error(`(fetchActiveBoard) Error: ${errorMessage}`);

        state.asyncStatus[fetchActiveBoard.typePrefix].loading = false;
        state.asyncStatus[fetchActiveBoard.typePrefix].error = errorMessage;
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
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(updateColumnTitle) Error: ${errorMessage}`);

        state.asyncStatus[updateColumnTitle.typePrefix].loading = false;
        state.asyncStatus[updateColumnTitle.typePrefix].error = errorMessage;
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
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(updateTaskDescription) Error: ${errorMessage}`);

        state.asyncStatus[updateTaskDescription.typePrefix].loading = false;
        state.asyncStatus[updateTaskDescription.typePrefix].error =
          errorMessage;
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
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(addEmptyTaskToColumn) Error: ${errorMessage}`);

        state.asyncStatus[addEmptyTaskToColumn.typePrefix].loading = false;
        state.asyncStatus[addEmptyTaskToColumn.typePrefix].error = errorMessage;
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
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(addColumnToBoard) Error: ${errorMessage}`);

        state.asyncStatus[addColumnToBoard.typePrefix].loading = false;
        state.asyncStatus[addColumnToBoard.typePrefix].error = errorMessage;
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

        getToaster(`Task deleted.`, "success");
        column.items = column.items.filter((item) => item.id !== taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(deleteTask) Error: ${errorMessage}`);

        state.asyncStatus[deleteTask.typePrefix].loading = false;
        state.asyncStatus[deleteTask.typePrefix].error = errorMessage;
      });

    // deleteColumn
    builder
      .addCase(deleteColumn.pending, (state) => {
        state.asyncStatus[deleteColumn.typePrefix].loading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.asyncStatus[deleteColumn.typePrefix].loading = false;

        const { columnId } = action.meta.arg;

        const columnTitle =
          state.board.columns.find((column) => column.id === columnId)?.title ??
          "";
        state.board.columns = state.board.columns.filter(
          (column) => column.id !== columnId
        );

        getToaster(`"${columnTitle}" column deleted.`, "success");
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(deleteColumn) Error: ${errorMessage}`);

        state.asyncStatus[deleteColumn.typePrefix].loading = false;
        state.asyncStatus[deleteColumn.typePrefix].error = errorMessage;
      });

    // moveColumnInDb
    builder
      .addCase(moveColumnInDb.pending, (state) => {
        state.asyncStatus[moveColumnInDb.typePrefix].loading = true;
      })
      .addCase(moveColumnInDb.fulfilled, (state) => {
        state.asyncStatus[moveColumnInDb.typePrefix].loading = false;
      })
      .addCase(moveColumnInDb.rejected, (state, action) => {
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(moveColumnInDb) Error: ${errorMessage}`);

        state.asyncStatus[moveColumnInDb.typePrefix].loading = false;
        state.asyncStatus[moveColumnInDb.typePrefix].error = errorMessage;
      });

    // moveTaskInDb
    builder
      .addCase(moveTaskInDb.pending, (state) => {
        state.asyncStatus[moveTaskInDb.typePrefix].loading = true;
      })
      .addCase(moveTaskInDb.fulfilled, (state) => {
        state.asyncStatus[moveTaskInDb.typePrefix].loading = false;
      })
      .addCase(moveTaskInDb.rejected, (state, action) => {
        const errorMessage = action.error?.message ?? "";
        getToaster(commonErrorMessage, "error");
        // TODO: Remove error log.
        console.error(`(moveTaskInDb) Error: ${errorMessage}`);

        state.asyncStatus[moveTaskInDb.typePrefix].loading = false;
        state.asyncStatus[moveTaskInDb.typePrefix].error = errorMessage;
      });
  },
});

export const { moveTask, moveColumn } = boardSlice.actions;
export default boardSlice.reducer;
