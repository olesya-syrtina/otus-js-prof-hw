export const randomColor = () =>
  `#${Array.from(
    { length: 6 },
    () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)],
  ).join("")}`;
