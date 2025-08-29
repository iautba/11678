// mockdb.js
// ฐานข้อมูลจำลองในหน่วยความจำสำหรับระบบเช่าและผู้ใช้

export const users = [
  // ตัวอย่างผู้ใช้
  { id: 1, username: "admin", password: "admin123", role: "admin" },
  { id: 2, username: "user1", password: "user123", role: "user" },
];

export const rents = [
  // ตัวอย่างข้อมูลการเช่า
  // { id: 1, userId: 2, botName: "BotA", start: Date, end: Date, status: "active" }
];

export function findUser(username, password) {
  return users.find(
    (u) => u.username === username && u.password === password
  );
}

export function addRent(rent) {
  rent.id = rents.length + 1;
  rents.push(rent);
  return rent;
}

export function getRentsByUser(userId) {
  return rents.filter((r) => r.userId === userId);
}
