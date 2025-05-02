import "./waterIntakeDetail.scss";

interface DetailData {
  personId: string;
  value: number | null;
  label: string;
  unit: string;
}

export default function WaterIntakeDetail({ personId, value, label, unit }: DetailData) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%] flex items-center justify-center text-black font-bold text-lg">
        今日饮水：
      </div>
      <div className="w-full h-[70%] flex items-center justify-center ">
        <div className="circle-container">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2AFADF" />
                <stop offset="100%" stopColor="#4C83FF" />
              </linearGradient>
            </defs>
            <path
              className="circle-bg"
              d="M 18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${20}, 100`}
              d="M 18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="url(#gradient)"
            />
            <text x="18" y="20.35" className="percentage">{ 450/12 }%</text>
            <text x="18" y="25.35" className="total-amount">450mL</text>
          </svg>
        </div>
      </div>
      <div className="w-full h-[20%] flex items-center justify-center text-gray-600 text-lg">
        每日饮水量目标：1200mL
      </div>
    </div>
  );
}