import './HeartRateDetail.scss';
import ReactECharts from 'echarts-for-react';

interface DetailData {
  personId: string;
  value: number | null;
  label: string;
  unit: string;
}

export default function HeartRateDetail({ personId, value, label, unit }: DetailData) {
  const hourlyData = [
    { hour: '07:00', rate: 70 },
    { hour: '08:00', rate: 68 },
    { hour: '09:00', rate: 65 },
    { hour: '10:00', rate: 72 },
    { hour: '11:00', rate: 75 },
    { hour: '12:00', rate: 70 },
    { hour: '13:00', rate: 68 },
  ];

  const chartOption = {
    xAxis: {
      type: 'category',
      data: hourlyData.map(data => data.hour),
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      min: Math.min(...hourlyData.map(d => d.rate)) - 5,
      max: Math.max(...hourlyData.map(d => d.rate)) + 5,
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: hourlyData.map(data => data.rate),
        type: 'line',
        smooth: true,
        lineStyle: { color: '#ff6347', width: 2 },
        showSymbol: false,
      },
    ],
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '20%',
    },
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <div className="heart-rate-detail relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="w-full h-[10%] flex items-center justify-center text-black font-bold text-lg">
        当前心率：
      </div>
      <div className="w-full h-[30%] relative">
        <svg className="heart-line absolute top-1/2 left-0 w-full h-[100px] -translate-y-1/2 opacity-20" width="100%" height="100%" viewBox="0 0 300 150">
          <path
            className="line-chart"
            d="M10 80 L70 80 L102 100 L134 30 L166 130 L198 60 L230 80 L290 80"
            fill="none"
            stroke="#ff6347"
            strokeWidth="3"
          />
        </svg>
        <div className="heart-rate-value relative top-[15%] z-10 text-center animate-pulse">
          <span className="value text-5xl font-bold text-red-500">{value ?? "--"}</span>
          <span className="unit text-2xl text-gray-600 ml-2">{unit}</span>
        </div>
      </div>
      <div className="w-full h-[60%] p-2">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr>
              <th className="text-left p-1">时间</th>
              <th className="text-left p-1">心率 (bpm)</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((data, index) => (
              <tr key={index} className="border-t">
                <td className="p-1">{data.hour}</td>
                <td className="p-1">{data.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}