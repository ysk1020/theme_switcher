# 🌗 Dynamic Theme Switcher (React + TypeScript + Context API)

A clean implementation of a **Light / Dark / System** theme switcher using:

- React Context API (no prop drilling)
- Custom `useTheme()` hook
- Local storage persistence
- OS-theme detection using `matchMedia`
- Automatic DOM class switching

This README explains the architecture and workflow used to build it.

---

## 🚀 Features

- 🔄 Switch between **Light**, **Dark**, and **System** theme
- 🌓 Automatically follows **OS theme** (system)
- 💾 Saves theme to **localStorage**
- 🧩 Global state via **React Context API**
- 🎯 Simple consumer API using `useTheme()`
- ⚡ Zero prop drilling

---

## 📁 Project Structure

```
src/
 ├─ components/
 │   └─ ThemeSelect.tsx
 ├─ context/
 │   └─ ThemeContext.tsx
 ├─ hooks/
 │   └─ useTheme.ts
 └─ main.tsx
```

---

## 1️⃣ Create Theme Context

### Define theme options & types:

```ts
export const THEME_OPTIONS = ["light", "dark", "system"] as const;
export type Theme = (typeof THEME_OPTIONS)[number];

export type ThemeContextValue = {
  theme: Theme;
  changeTheme: (next: Theme) => void;
};
```

### Create the context:

```ts
export const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  changeTheme: () => {},
});
```

---

## 2️⃣ Build the Theme Provider

This component holds the **actual theme state**, syncs it with the DOM, listens to system changes, and persists it.

```tsx
export function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>("system");

  const changeTheme = (next: Theme) => setTheme(next);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (isDark: boolean) => {
      document.body.classList.toggle("dark", isDark);
      document.body.classList.toggle("light", !isDark);
    };

    const sync = () => {
      if (theme === "system") apply(mq.matches);
      else apply(theme === "dark");
    };

    sync();

    if (theme === "system") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## 3️⃣ Create the `useTheme` Hook

A clean, reusable API for consuming the context.

```ts
export const useTheme = () => useContext(ThemeContext);
```

Usage:

```ts
const { theme, changeTheme } = useTheme();
```

---

## 4️⃣ Consume in a Component

Example: a `<select>` with three options.

```tsx
export function ThemeSelect() {
  const { theme, changeTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => changeTheme(e.target.value as Theme)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

---

## 5️⃣ Wrap the App

`main.tsx`:

```tsx
<ThemeContextProvider>
  <App />
</ThemeContextProvider>
```

---

## 6️⃣ Add Dark Styles

`index.css`:

```css
body.dark {
  background: #111;
  color: #fff;
}

body.light {
  background: #fff;
  color: #111;
}
```

---

## 🧠 How It Works (Short Summary)

- The provider stores the **current theme** in React state.
- The provider sends `{ theme, changeTheme }` through the Context API.
- The `useTheme` hook allows any component to read/update the theme.
- An effect (`useEffect`) syncs theme with:

  - `document.body`
  - system preferences (`matchMedia`)

- Theme changes trigger a **provider re-render**
- All subscribed components update automatically.

---

## 📦 Persistence (Optional)

You can save the theme to `localStorage`:

```ts
useEffect(() => {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}, [theme]);
```

Restore it on load:

```ts
const stored = localStorage.getItem("theme") as Theme | null;
return stored ?? "system";
```

---

![Video](./src/assets/themeSwitcher.gif)
