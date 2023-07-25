export default function Header({ appTitle, boardTitle }) {
  return (
    <header className="bg-orange-400 px-4 py-2">
      <h1 className="py-2 text-3xl font-semibold">{appTitle}</h1>
      <h2 className="py-2 text-xl">
        <span className="font-semibold">Board:</span> {boardTitle}
      </h2>
    </header>
  );
}
