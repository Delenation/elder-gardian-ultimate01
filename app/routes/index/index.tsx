import { Outlet } from "react-router";
import { useState, createContext } from 'react';
import { Modal } from 'antd';
import { UserSwitchOutlined, MenuOutlined } from "@ant-design/icons";
import PersonInfo from "~/components/index/personInfo/personInfo";
import Navbar from "~/components/index/navbar/navbar";
import Tabbar from "~/components/index/tabbar/tabbar";
import "./index.scss";

export const SelectedPersonContext = createContext<string | null>(null);

interface Person {
  name: string;
  age: number;
  id: string;
  avatarUrl?: string;
}

export default function Index() {
  const family: Person[] = [
    { name: '妈妈', age: 68, id: 'ELD123456', avatarUrl: '/mom_avatar.webp' },
    { name: '爸爸', age: 72, id: 'ELD123457', avatarUrl: '/dad_avatar.webp' },
  ];

  const [selectedPerson, setSelectedPerson] = useState<Person>(family[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="display">
        <div className="sidebar">
          <div className="title">
            <span className="title-icon"><UserSwitchOutlined /></span>
            <span className="title-text">当前亲属</span>
          </div>
          <div className="person-info">
            <PersonInfo
              name={selectedPerson.name}
              age={selectedPerson.age}
              id={selectedPerson.id}
              avatarUrl={selectedPerson.avatarUrl}
              onClick={showModal}
            />
          </div>
          <div className="title">
            <span className="title-icon"><MenuOutlined /></span>
            <span className="title-text">查看选项</span>
          </div>
          <div className="tabbar">
            <Tabbar />
          </div>
        </div>
        <div className="sections">
          <SelectedPersonContext.Provider value={'001'}>
            <div className="page-transition" key={location.pathname}>
              <Outlet />
            </div>
          </SelectedPersonContext.Provider>
        </div>
      </div>

      <Modal
        title="选择亲属"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
        className="person-modal"
      >
        <div className="person-cards">
          {family.map((person) => (
            <div key={person.id} className="person-card" onClick={() => handleSelectPerson(person)}>
              <div className="avatar-container">
                {person.avatarUrl ? (
                  <img
                    src={person.avatarUrl}
                    alt={`${person.name}'s avatar`}
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {person.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="person-name">{person.name}</h3>
              <p className="person-info-text">年龄: {person.age} 岁</p>
              <p className="person-info-text">ID: {person.id}</p>
              <button
                className="select-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPerson(person);
                }}
              >
                选择
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}