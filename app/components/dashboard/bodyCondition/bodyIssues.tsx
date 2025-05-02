import { List } from 'antd';

const mockIssues = [
  {
    title: '头痛',
    description: '持续头痛3天',
    suggestions: '休息，补充水分，咨询医生',
  },
  {
    title: '背痛',
    description: '久坐后下背部僵硬',
    suggestions: '拉伸，保持正确姿势，咨询医生',
  },
];

export default function BodyIssues() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="!w-[100] !h-[100] overflow-auto">
        <List
          className="w-full max-w-full"
          size="small"
          dataSource={mockIssues}
          renderItem={(item) => (
            <List.Item className="w-full">
              <div className="w-full">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>建议:</strong> {item.suggestions}</p>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}