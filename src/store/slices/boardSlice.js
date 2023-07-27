import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: {},
  boardTitle: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      console.log("setBoards action: ", action);
      state.board = action.payload;
    },
    setBoardTitle: (state, action) => {
      console.log("setBoardTitle action:", action);

      state.boardTitle = action.payload;
    },
    setColumnTitle: (state, action) => {
      console.log("setColumnTitle action:", action);

      const { columnId, title } = action.payload;

      const columnToUpdate = state.board.columns.find(
        (column) => column.id === columnId
      );
      if (!columnToUpdate) return;

      columnToUpdate.title = title;
    },
    setColumnList: (state, action) => {
      console.log("setColumnList action:", action);

      const columnId = action.payload;

      state.board.columns = state.board.columns.filter(
        (column) => column.id !== columnId
      );
    },
    setTaskDescription: (state, action) => {
      console.log("setTaskDescription action:", action);

      const { columnId, taskId, description } = action.payload;
      const column = state.board.columns.find(
        (column) => column.id === columnId
      );
      if (!column) return;

      const task = column.items.find((item) => item.id === taskId);
      if (!task) return;

      task.description = description;
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
    setAddTask: (state, action) => {
      console.log("setAddTask action:", action);

      const columnId = action.payload;

      const column = state.board.columns.find(
        (column) => column.id === columnId
      );
      if (!column) return;

      const itemNum = column.items.length;

      column.items.push({
        id: `taskId${new Date().getTime()}`,
        description: "",
        order: itemNum + 1,
      });
    },
    setAddColumn: (state) => {
      console.log("setAddColumn worked");

      const columnNum = state.board.columns.length;

      state.board.columns.push({
        id: `columnId${new Date().getTime()}`,
        title: "Untitled",
        order: columnNum + 1,
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
});

export const {
  setBoard,
  setBoardTitle,
  setColumnTitle,
  setColumnList,
  setTaskDescription,
  setTaskList,
  setAddTask,
  setAddColumn,
  moveTask,
  moveColumn,
} = boardSlice.actions;
export default boardSlice.reducer;
