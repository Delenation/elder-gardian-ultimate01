import { Switch } from "antd";
import { useTheme } from "./themeProvider";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      style={{ backgroundColor: theme === "dark" ? "#1890ff" : "#d9d9d9" }}
    />
  );
}