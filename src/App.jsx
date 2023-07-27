import { useEffect } from "react";
import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { fetchActiveBoard } from "./redux/board/boardThunks";
import { useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchActiveBoard());
  }, [dispatch]);

  return (
    <>
      <Header appTitle="Drag & Drop Taskboard" />
      {/* TODO: Create generic loading component. */}
      {status === "loading" ? (
        <div className="flex justify-center items-center h-96 text-4xl font-semibold">
          Loading...
        </div>
      ) : (
        <Board />
      )}
    </>
  );
}
