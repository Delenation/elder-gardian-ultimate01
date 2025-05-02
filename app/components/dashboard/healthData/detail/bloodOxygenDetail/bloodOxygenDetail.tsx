import './BloodOxygenDetail.scss';
import ReactECharts from 'echarts-for-react';

interface DetailData {
  personId: string;
  value: number | null;
  label: string;
  unit: string;
}

export default function BloodOxygenDetail({ personId, value, label, unit }: DetailData) {
  const hourlyData = [
    { hour: '07:00', spo2: 98 },
    { hour: '08:00', spo2: 97 },
    { hour: '09:00', spo2: 96 },
    { hour: '10:00', spo2: 98 },
    { hour: '11:00', spo2: 99 },
    { hour: '12:00', spo2: 97 },
    { hour: '13:00', spo2: 96 },
  ];

  const chartOption = {
    xAxis: {
      type: 'category',
      data: hourlyData.map(data => data.hour),
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      min: Math.min(...hourlyData.map(d => d.spo2)) - 2,
      max: Math.max(...hourlyData.map(d => d.spo2)) + 2,
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: hourlyData.map(data => data.spo2),
        type: 'line',
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 2 },
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
    <div className="blood-oxygen-detail relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="w-full h-[10%] flex items-center justify-center text-black font-bold text-lg">
        当前血氧：
      </div>
      <div className="w-full h-[30%] relative bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="oxygen-value relative top-[15%] z-10 text-center shadow-md bg-white/80 rounded-lg p-2 mx-auto w-fit">
          <span className="value text-5xl font-bold text-blue-600">{value ?? "--"}</span>
          <span className="unit text-2xl text-gray-600 ml-2">{unit}</span>
        </div>
      </div>
      <div className="w-full h-[60%] p-2">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr>
              <th className="text-left p-1">时间</th>
              <th className="text-left p-1">血氧 (%)</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((data, index) => (
              <tr key={index} className="border-t">
                <td className="p-1">{data.hour}</td>
                <td className="p-1">{data.spo2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}