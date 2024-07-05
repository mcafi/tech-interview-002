export default async function HistoryPage() {
  const res = await fetch("http://localhost:3000/api/search");
  const data = await res.json();

  return (
    <div>
      <h1>History Page</h1>
      {data.message}
    </div>
  );
}
