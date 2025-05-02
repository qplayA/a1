import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (!search) return setFiltered([]);
    const timer = setTimeout(() => {
      const s = search.toLowerCase();
      const results = questions.filter((q) =>
        q.q.toLowerCase().includes(s) || q.a.toLowerCase().includes(s)
      );
      setFiltered(results);
    }, 150);
    return () => clearTimeout(timer);
  }, [search, questions]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch("");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        🎉 시소가 만든 파티 전용 족보 🎉
      </h1>

      <div className="text-right mb-2 text-sm text-gray-600">
        현재 시간: {now.toLocaleString()}
      </div>

      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        placeholder="문제 또는 정답을 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />

      {filtered.map((item, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold text-yellow-500">Q. {item.q}</p>
          <p className="text-sky-500">A. {item.a}</p>
        </div>
      ))}
    </div>
  );
}
