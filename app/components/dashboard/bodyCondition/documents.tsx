import { useState } from 'react';
import { Upload, Table, Input, Button } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

interface FileItem {
  name: string;
  date: string;
  url: string;
}

export default function Documents() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const newFile: FileItem = {
      name: file.name,
      date: new Date().toLocaleString(),
      url,
    };
    setFiles((prevFiles) => [...prevFiles, newFile]);
    return false;
  };

  const handleDelete = (url: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f.url !== url);
      URL.revokeObjectURL(url);
      return updatedFiles;
    });
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: '文件名', dataIndex: 'name', key: 'name' },
    { title: '上传日期', dataIndex: 'date', key: 'date' },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: FileItem) => (
        <>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => {
              const link = document.createElement('a');
              link.href = record.url;
              link.download = record.name;
              link.click();
            }}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.url)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Upload
        customRequest={({ file }) => handleUpload(file as File)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
      <Input
        placeholder="搜索文件"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '50%' }}
      />
      <Table
        dataSource={filteredFiles}
        columns={columns}
        rowKey="url"
        pagination={false}
      />
    </div>
  );
}