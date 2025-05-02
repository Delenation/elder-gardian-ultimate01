import { useState } from 'react';
import { Segmented } from 'antd';
import BodyModel from './bodyModel/bodyModel';
import BodyIssues from './bodyIssues';
import Documents from './documents';
import './bodyCondition.scss';

export default function BodyCondition() {
  const [activeTab, setActiveTab] = useState('issues');

  const getOrganInfo = () => {
    // Placeholder for future implementation
  };

  return (
    <div className="body-card">
      <div className="body-model">
        <BodyModel />
      </div>
      <div className="shared-area">
        <Segmented
          options={[
            { label: '问题', value: 'issues' },
            { label: '诊断报告', value: 'documents' },
          ]}
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
        />
        <div className="content relative">
          {activeTab === 'issues' && <BodyIssues />}
          {activeTab === 'documents' && <Documents />}
        </div>
      </div>
    </div>
  );
}