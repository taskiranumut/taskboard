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
  },
});

export const { setActiveBoardId } = boardSlice.actions;
export default boardSlice.reducer;
