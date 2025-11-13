import ThemeSelect from "./components/ThemeSelect";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <header>
        <h1>Theme Switcher Demo</h1>
      </header>
      <main>
        <p>Select a theme below:</p>
        <ThemeSelect />
        <p>
          Current Theme: <strong>{theme}</strong>
        </p>
      </main>
      <footer>
        <p>© 2025 Theme Switcher App</p>
      </footer>
    </>
  );
}

export default App;
