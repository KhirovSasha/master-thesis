export function GridLands({ arrayLends }) {
  return (
    <div>
      {arrayLends && arrayLends.length > 0 ? (
        <h1>Hi</h1>
      ) : (
        <div className="alert alert-warning" role="alert">
            There are no lands yet, please add
        </div>
      )}
    </div>
  );
}
