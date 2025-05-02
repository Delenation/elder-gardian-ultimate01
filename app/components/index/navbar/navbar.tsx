import { useState } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { SettingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ThemeProvider } from "~/components/common/themeProvider";
import ThemeToggle from "~/components/common/themeToggle";
import "./navbar.scss";

export default function Navbar() {
  const user = {
    avatarUrl: "/user_avatar.jpg",
    name: "用户",
  };

  const settingsMenu = (
    <Menu>
      <Menu.Item key="profile">个人资料</Menu.Item>
      <Menu.Item key="preferences">偏好设置</Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    console.log("退出登录");
  };

  return (
    <div className="navbar-content">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <div className="logo-text">智护老龄</div>
      </div>
      <div className="navbar-right">
        <Avatar
          src={user.avatarUrl}
          icon={!user.avatarUrl && <UserOutlined />}
          size={40}
          className="user-avatar"
        />
        <Dropdown overlay={settingsMenu} trigger={["click"]}>
          <SettingOutlined className="navbar-icon" />
        </Dropdown>
        <LogoutOutlined className="navbar-icon" onClick={handleLogout} />
      </div>
    </div>
  );
}