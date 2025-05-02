import { useEffect, useContext, useState } from "react";
import { SelectedPersonContext } from "~/routes/index";
import axios from "axios";
import HeartRateDetail from "./detail/heartRateDetail/heartRateDetail";
import BloodOxygenDetail from "./detail/bloodOxygenDetail/bloodOxygenDetail";
import StepsDetail from "./detail/stepsDetail/stepsDetail";
import WaterIntakeDetail from "./detail/waterIntakeDetail/waterIntakeDetail";
import "./healthData.scss";

interface PersonData {
  key: string;
  label: string;
  value: number | null;
  unit: string;
  icon: string;
  color: string;
}

export default function HealthData() {
  const selectedPersonId = useContext(SelectedPersonContext) || "001";
  const [personData, setPersonData] = useState<PersonData[]>([
    { key: "heartRate", label: "心率", value: null, unit: "bpm", icon: "/dashboard/assets/heart_rate.svg", color: "#ff4d4f" },
    { key: "bloodOxygen", label: "血氧", value: null, unit: "%", icon: "/dashborad/assets/blood_oxygen.svg", color: "#52c41a" },
    { key: "steps", label: "步数", value: null, unit: "步", icon: "/dashboard/assets/walking.svg", color: "#fa8c16" },
    { key: "waterIntake", label: "饮水量", value: null, unit: "ml", icon: "/dashboard/assets/cup_water.svg", color: "#1890ff" },
  ]);
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const getValue = (response: any, key: string, defaultValue: any) => {
    return response?.data?.data?.length > 0 ? response.data.data[0][key] : defaultValue;
  };

  const getPersonData = async () => {
    try {
      const [resOfHR, resOfSpO2, resOfSteps, resOfH2Oml] = await Promise.all([
        axios.get(`/api/heartrate/read?id=${selectedPersonId}`),
        axios.get(`/api/bloodoxygen/read?id=${selectedPersonId}`),
        axios.get(`/api/step/readstep`, { params: { userId: selectedPersonId } }),
        axios.get(`/api/water/read?userId=${selectedPersonId}`),
      ]);

      setPersonData((prevData) =>
        prevData.map((data) => {
          switch (data.key) {
            case 'heartRate':
              return { ...data, value: getValue(resOfHR, 'heartRate', null) };
            case 'bloodOxygen':
              return { ...data, value: getValue(resOfSpO2, 'bloodOxygen', null) };
            case 'steps':
              return { ...data, value: getValue(resOfSteps, 'step', 2432) };
            case 'waterIntake':
              return { ...data, value: getValue(resOfH2Oml, 'waterIntake', 60) };
            default:
              return data;
          }
        })
      );
    } catch (error) {
      console.error("Failed to fetch health data:", error);
    }
  };

  useEffect(() => {
    getPersonData();
  }, [selectedPersonId]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const renderDetail = () => {
    if (activeTab === null) return <div className="detail-content">请选择一个指标</div>;

    const data = personData[activeTab];
    const props = {
      personId: selectedPersonId,
      value: data.value,
      label: data.label,
      unit: data.unit,
    };

    switch (activeTab) {
      case 0:
        return <HeartRateDetail {...props} />;
      case 1:
        return <BloodOxygenDetail {...props} />;
      case 2:
        return <StepsDetail {...props} />;
      case 3:
        return <WaterIntakeDetail {...props} />;
      default:
        return <div className="detail-content">Error: Invalid data</div>;
    }
  };

  return (
    <div className="board">
      <div className="tabs">
        {personData.map((data, index) => (
          <div
            className={`tabs-item ${activeTab === index ? "active" : ""}`}
            key={data.key}
            onClick={() => handleTabClick(index)}
          >
            <img src={data.icon} alt={data.label} style={{ filter: `url(#color-${data.key})` }} />
            <div className="tabs-item-label">{data.label}</div>
            <div className="tabs-item-value">{data.value ?? "--"} {data.unit}</div>
          </div>
        ))}
      </div>
      <div className="detail">
        {renderDetail()}
      </div>
      <svg width="0" height="0">
        <defs>
          {personData.map((data) => (
            <filter id={`color-${data.key}`} key={data.key}>
              <feFlood floodColor={data.color} result="color" />
              <feComposite in="color" in2="SourceAlpha" operator="in" />
            </filter>
          ))}
        </defs>
      </svg>
    </div>
  );
}