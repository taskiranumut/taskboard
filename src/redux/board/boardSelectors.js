import { createSelector } from "@reduxjs/toolkit";

// HELPERS

// Create selector for async status state
const makeSelectAsyncStatus = (actionType) => {
  return createSelector(
    (state) => state.asyncStatus,
    (asyncStatus) => asyncStatus[actionType]
  );
};

// SELECTORS

export const selectBoard = createSelector(
  (state) => state.board,
  (board) => board
);

export const selectBoardColumns = createSelector(
  selectBoard,
  (board) => board.columns ?? []
);

export const selectFetchActiveBoardStatus =
  makeSelectAsyncStatus("fetchActiveBoard");

export const selectUpdateColumnTitleStatus =
  makeSelectAsyncStatus("updateColumnTitle");

export const selectUpdateTaskDescriptionStatus = makeSelectAsyncStatus(
  "updateTaskDescription"
);
