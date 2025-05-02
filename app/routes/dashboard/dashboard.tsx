import BodyCondition from "~/components/dashboard/bodyCondition/bodyCondition";
import HealthData from "~/components/dashboard/healthData/healthData";
import ScheduleList from "~/components/dashboard/scheduleList/scheduleList";
import "./dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="w-full h-[60%]">
        <div className="body-condition"><BodyCondition /></div>
      </div>
      <div className="w-full h-[40%] flex">
        <div className="health-data"><HealthData /></div>
        <div className="schedule"><ScheduleList /></div>
      </div>
    </div>
  );
}