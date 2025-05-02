import { useEffect, useState } from "react";
import { List, Alert, Button } from "antd";
import axios from "axios";
import "./warnings.scss";

interface Warning {
  id: number;
  type: number;
  image: string;
  userId: string;
  detectionTime: string;
}

interface WarningProps {
  personId: string | null;
}

export default function Warnings({ personId }: WarningProps) {
  const [warnings, setWarnings] = useState<Warning[]>([]);

  const getFallDection = async () => {
    try {
      const response = await axios.get('/api/viewdetection/falldetection?userid=001');
      console.log(response.data.data[0]);
      await getFallImage();
    } catch (error) {
      console.error("Failed to fetch fall detection data:", error);
    }
  };
  
  const getFallImage = async () => {
    try {
      const response = await axios.get('/api/viewdetection/getFallImage', { params: { userid: '001', type: 0 } });
      // console.log(response);
      setWarnings(response.data.data)
    } catch (error) {
      console.error("Failed to fetch fall image:", error);
    }
  };

  useEffect(() => {
    getFallImage();
  }, []);

  return (
    <div className="warnings-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="warnings-title">通知</h3>
        <Button onClick={getFallDection}>刷新</Button>
      </div>
      <div className="warnings-list">
        <List
          dataSource={warnings}
          rowKey="id"
          renderItem={(item) => (
            <List.Item>
              <Alert
                message={item.type === 0 ? "检测到跌倒" : "检测到火灾"}
                description={item.detectionTime}
                type="warning"
                showIcon
              />
            </List.Item>
          )}
          locale={{ emptyText: "暂无通知" }}
        />
      </div>
    </div>
  );
}