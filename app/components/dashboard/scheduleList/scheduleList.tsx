import { useState, useEffect, useContext, useRef } from 'react';
import { List, Input, Button, Modal, Form, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SelectedPersonContext } from '~/routes/index';
import formatTime from '~/utils/formatTime';
import BScroll from 'better-scroll';
import axios from 'axios';
import './scheduleList.scss';

interface Task {
  scheduleId: number;
  id: string;
  completed: boolean;
  incidentTime: string;
  incident: string;
}

const colors = ['#FFCC99', '#CCFFCC', '#99CCFF', '#FFCCCC', '#CCCCFF'];
const getColor = (index: number) => {
  return colors[index % colors.length];
};

export default function ScheduleList() {
  const selectedPersonId = useContext(SelectedPersonContext) || '001';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bScrollRef = useRef<BScroll | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/schedule/read?id=${selectedPersonId}`);
        setTasks(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        message.error('无法加载待办事项，请稍后重试');
      }
    };
    fetchTasks();
  }, [selectedPersonId]);

  useEffect(() => {
    if (scrollRef.current && !bScrollRef.current) {
      bScrollRef.current = new BScroll(scrollRef.current, {
        scrollY: true,
        click: true,
        probeType: 3,
        mouseWheel: true,
        scrollbar: {
          fade: true,
          interactive: true,
        },
      });
    }

    const handleResize = () => {
      if (bScrollRef.current) {
        bScrollRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (bScrollRef.current) {
        bScrollRef.current.destroy();
        bScrollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bScrollRef.current) {
      bScrollRef.current.refresh();
    }
  }, [tasks]);

  const formatIncidentTime = () => {
    return new Date().toISOString().slice(0, 16) + ':00';
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const task: Task = {
      scheduleId: Date.now(),
      id: selectedPersonId,
      completed: false,
      incidentTime: formatIncidentTime(),
      incident: newTask.trim(),
    };
    try {
      const response = await axios.post('/api/schedule/create', task);
      setTasks([...tasks, response.data]);
      setNewTask('');
      message.success('待办事项添加成功');
    } catch (error) {
      console.error('Failed to add task:', error);
      message.error('添加待办事项失败');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    form.setFieldsValue({ incident: task.incident });
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      if (editTask) {
        const updatedTask: Task = {
          ...editTask,
          incident: values.incident,
          incidentTime: formatIncidentTime(),
        };
        await axios.put(`/api/schedule/update`, updatedTask);
        setTasks(tasks.map((t) => (t.scheduleId === editTask.scheduleId ? updatedTask : t)));
        setEditTask(null);
        setIsModalOpen(false);
        form.resetFields();
        message.success('待办事项更新成功');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      message.error('更新待办事项失败');
    }
  };

  const handleDeleteTask = async (scheduleId: number) => {
    try {
      await axios.delete(`/api/schedule/delete?id=${scheduleId}`);
      setTasks(tasks.filter((task) => task.scheduleId !== scheduleId));
      message.success('待办事项删除成功');
    } catch (error) {
      console.error('Failed to delete task:', error);
      message.error('删除待办事项失败');
    }
  };

  return (
    <div className="schedule-list">
      <div className="add-task">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="输入新待办事项"
          onPressEnter={handleAddTask}
        />
        <Button type="primary" onClick={handleAddTask}>
          添加
        </Button>
      </div>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="scroll-content">
          <List
            dataSource={tasks}
            renderItem={(task, index) => (
              <List.Item
                className="task-item"
                style={{ backgroundColor: getColor(index) }}
                actions={[
                  <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTask(task)} />,
                  <Popconfirm
                    title="确定删除此待办事项？"
                    onConfirm={() => handleDeleteTask(task.scheduleId)}
                    okText="是"
                    cancelText="否"
                  >
                    <Button type="text" icon={<DeleteOutlined />} />
                  </Popconfirm>,
                ]}
              >
                <div className="task-content">
                  <div className="task-incident">{task.incident}</div>
                  <div className="task-time">{formatTime(task.incidentTime)}</div>
                </div>
              </List.Item>
            )}
            locale={{ emptyText: '暂无待办事项' }}
          />
        </div>
      </div>
      <Modal
        title="编辑待办事项"
        open={isModalOpen}
        onOk={handleSaveEdit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditTask(null);
          form.resetFields();
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="incident"
            label="事项内容"
            rules={[{ required: true, message: '请输入待办事项内容' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}