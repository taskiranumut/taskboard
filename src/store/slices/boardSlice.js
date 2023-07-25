import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [
    {
      id: "0",
      title: "First Taskboard",
      columns: [
        {
          id: "0",
          title: "To Do",
          order: "0",
          items: [
            {
              id: "0",
              tasks: "Demo Task 0",
            },
            {
              id: "1",
              tasks: "Demo Task 1",
            },
            {
              id: "2",
              tasks: "Demo Task 2",
            },
          ],
        },
        {
          id: "1",
          title: "In Progress",
          order: 1,
          items: [],
        },
        {
          id: "3",
          title: "Done",
          order: 2,
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
