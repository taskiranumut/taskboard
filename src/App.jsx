import Board from "./components/Board/Board";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header appTitle="Drag & Drop Taskboard" />
      <Board />
    </>
  );
}
