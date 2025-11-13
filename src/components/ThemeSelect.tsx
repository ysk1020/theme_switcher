import useTheme from "../hooks/useTheme";
import { type Theme, ThemesOption } from "../context/ThemeContext";

function ThemeSelect() {
  const { theme, changeTheme } = useTheme();
  return (
    <select
      value={theme}
      onChange={(e) => {
        const selectedTheme = e.target.value as Theme;
        changeTheme(selectedTheme);
      }}
    >
      {ThemesOption.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default ThemeSelect;
