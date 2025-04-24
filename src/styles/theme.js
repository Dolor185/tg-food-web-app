const tg = window.Telegram?.WebApp;

const lightTheme = {
  text: "#222",
  inputBg: "#fff",
  inputBorder: "#ccc",
  button: "#40a7e3",
  buttonText: "#fff",
  accent: "#3b82f6",
};

const darkTheme = {
  text: "#fff",
  inputBg: "#2c2c2c",
  inputBorder: "#444",
  button: "#0088cc",
  buttonText: "#fff",
  accent: "#0088cc",
};

export const theme = tg?.colorScheme === "dark" ? darkTheme : lightTheme;
