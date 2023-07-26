import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [
    {
      id: "boardId0",
      title: "First Taskboard",
      columns: [
        {
          id: "columnId0",
          title: "To Do",
          order: 1,
          items: [
            {
              id: "taskId0",
              description: "Demo Task 0",
              order: 1,
            },
            {
              id: "taskId1",
              description: "Demo Task 1",
              order: 2,
            },
            {
              id: "taskId2",
              description: "Demo Task 2",
              order: 3,
            },
          ],
        },
        {
          id: "columnId1",
          title: "In Progress",
          order: 2,
          items: [],
        },
        {
          id: "columnId2",
          title: "Done",
          order: 3,
          items: [],
        },
      ],
    },
  ],
  activeBoardId: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoardId: (state, actions) => {
      console.log("setActiveBoardId actions:", actions);

      state.activeBoardId = actions.payload;
    },
    setColumnTitle: (state, actions) => {
      console.log("setColumnTitle actions:", actions);

      const { columnId, title } = actions.payload;

      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );
      if (!activeBoard) return;

      const columnToUpdate = activeBoard.columns.find(
        (column) => column.id === columnId
      );
      if (!columnToUpdate) return;

      columnToUpdate.title = title;
    },
    setColumnList: (state, actions) => {
      console.log("setColumnList actions:", actions);

      const columnId = actions.payload;

      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );
      if (!activeBoard) return;

      activeBoard.columns = activeBoard.columns.filter(
        (column) => column.id !== columnId
      );
    },
  },
});

export const { setActiveBoardId, setColumnTitle, setColumnList } =
  boardSlice.actions;
export default boardSlice.reducer;
