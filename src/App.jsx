import { useEffect } from "react";
import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { fetchActiveBoard } from "./redux/board/boardThunks";
import { useSelector } from "react-redux";
import CustomToaster from "./shared/CustomToaster";
import { selectFetchActiveBoardStatus } from "./redux/board/boardSelectors";

export default function App() {
  const dispatch = useDispatch();
  const { loading: boardDataLoading } = useSelector(
    selectFetchActiveBoardStatus
  );

  useEffect(() => {
    dispatch(fetchActiveBoard());
  }, [dispatch]);

  return (
    <>
      <CustomToaster />
      <Header appTitle="Drag & Drop Taskboard" />
      {/* TODO: Create generic loading component. */}
      {boardDataLoading ? (
        <div className="flex justify-center items-center h-96 text-4xl font-semibold">
          Loading...
        </div>
      ) : (
        <Board />
      )}
    </>
  );
}
