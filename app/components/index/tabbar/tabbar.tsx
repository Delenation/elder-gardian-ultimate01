import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { HeartOutlined, FundProjectionScreenOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import "./tabbar.scss";

export default function Tabbar() {
  const tabs = [
    { path: '/dashboard', label: '体征数据', icon: <HeartOutlined style={{ fontSize: '35px' }}/> },
    { path: '/monitor', label: '安全监护', icon: <FundProjectionScreenOutlined style={{ fontSize: '35px' }}/> },
    { path: '/medical', label: '医疗就诊', icon: <MedicineBoxOutlined style={{ fontSize: '35px' }}/> },
  ];
  const location = useLocation();

  const [activePath, setActivePath] = useState('/dashboard');

  const handleTabClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <ul className="tabbar-list">
      {tabs.map((item) => (
        <li
          key={item.label}
          className={`tabbar-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div
            className="tabbar-item-wrapper"
            onClick={() => handleTabClick(item.path)}
          >
            <Link
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                textDecoration: 'none',
              }}
              to={item.path}
            >
              <div className="tabbar-item-content">
                <div className="tabbar-item-icon">{item.icon}</div>
                <span className="tabbar-item-label">{item.label}</span>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}