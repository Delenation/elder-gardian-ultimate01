import { useContext } from "react";
import { Card } from "antd";
import { SelectedPersonContext } from "~/routes/index";
import Camera from "~/components/monitor/camera/camera";
import Map from "~/components/monitor/map/map";
import Warnings from "~/components/monitor/warnings/warnings";
import "./monitor.scss";

export default function Monitor() {
  const selectedPersonId = useContext(SelectedPersonContext);

  return (
    <div className="monitor">
      <div className="monitor-grid">
        <Card className="monitor-card camera-card">
          <Camera personId={selectedPersonId} />
        </Card>
        <Card className="monitor-card map-card">
          <Map personId={selectedPersonId} />
        </Card>
        <Card className="monitor-card warnings-card">
          <Warnings personId={selectedPersonId} />
        </Card>
      </div>
    </div>
  );
}