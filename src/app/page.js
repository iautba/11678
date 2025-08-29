"use client";
import { useState } from "react";
import { findUser, addRent, getRentsByUser } from "./mockdb";

export default function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rents, setRents] = useState([]);
  const [botName, setBotName] = useState("");
  // ล็อกอินจำลอง
  function handleLogin(e) {
    e.preventDefault();
    const u = findUser(username, password);
    if (u) {
      setUser(u);
      setRents(getRentsByUser(u.id));
      setError("");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  }
  // เช่าบอทจำลอง
  function handleRent() {
    if (!botName) return;
    const rent = addRent({
      userId: user.id,
      botName,
      start: new Date(),
      end: null,
      status: "active",
    });
    setRents([...rents, rent]);
    setBotName("");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#232526] tracking-tight">เช่าบอทเทรดอัตโนมัติ</h1>
        {!user ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ชื่อผู้ใช้"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="รหัสผ่าน"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">เข้าสู่ระบบ</button>
          </form>
        ) : (
          <>
            <div className="mb-4 text-center">
              <span className="font-semibold">สวัสดี, {user.username}</span>
              <button className="ml-4 text-blue-600 underline" onClick={() => { setUser(null); setUsername(""); setPassword(""); }}>ออกจากระบบ</button>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold mb-2">เช่าบอทใหม่</h2>
              <div className="flex gap-2">
                <input
                  className="border rounded px-3 py-2 flex-1"
                  placeholder="ชื่อบอท (เช่น BotA)"
                  value={botName}
                  onChange={e => setBotName(e.target.value)}
                />
                <button className="bg-green-600 text-white rounded px-4 py-2 font-semibold hover:bg-green-700 transition" onClick={handleRent}>เช่า</button>
              </div>
            </div>
            <div>
              <h2 className="font-semibold mb-2">ประวัติการเช่าของคุณ</h2>
              <ul className="divide-y">
                {rents.length === 0 && <li className="text-gray-500">ยังไม่มีข้อมูลการเช่า</li>}
                {rents.map(r => (
                  <li key={r.id} className="py-2 flex justify-between items-center">
                    <span className="font-mono">{r.botName}</span>
                    <span className="text-xs text-green-700">{r.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 text-white/80 text-xs text-center">
        <span>© {new Date().getFullYear()} KUY Bot Rental. UI ทันสมัย เชื่อมต่อหลังบ้านได้ในอนาคต</span>
      </div>
    </div>
  );
}
