import './StepsDetail.scss';

interface DetailData {
  personId: string;
  value: number | null;
  label: string;
  unit: string;
}

export default function StepsDetail({ personId, value, label, unit }: DetailData) {
  const stepData = [
    { date: '05/01', steps: 12000 },
    { date: '04/30', steps: 8000 },
    { date: '04/29', steps: 15000 },
    { date: '04/28', steps: 6000 },
    { date: '04/27', steps: 10000 },
    { date: '04/26', steps: 9000 },
    { date: '04/25', steps: 11000 },
  ];

  return (
    <div className="steps-detail relative h-full flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="w-full h-[10%] flex items-center justify-center text-black font-bold text-lg">
        当前步数：
      </div>
      <div className="w-full h-[30%] relative bg-gradient-to-b from-green-100 to-green-200">
        <div className="steps-value relative top-[15%] z-10 text-center shadow-md bg-white/80 rounded-lg p-2 mx-auto w-fit">
          <span className="value text-5xl font-bold text-green-600">{value ?? "--"}</span>
          <span className="unit text-2xl text-gray-600 ml-2">{unit}</span>
        </div>
      </div>
      <div className="w-full h-[60%] p-2">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr>
              <th className="text-left p-1">日期</th>
              <th className="text-left p-1">步数</th>
            </tr>
          </thead>
          <tbody>
            {stepData.map((data, index) => (
              <tr key={index} className="border-t">
                <td className="p-1">{data.date}</td>
                <td className="p-1">{data.steps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}