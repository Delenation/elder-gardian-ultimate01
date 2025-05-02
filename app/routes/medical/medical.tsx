import { useEffect, useState } from 'react';
import { Row, Col, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import CalendarComponent from '~/components/medical/calendar/calendar';
import Appoint from '~/components/medical/appoint/appoint';
import './medical.scss';

interface Appointment {
  id: string;
  hospitalId: number;
  hospitalName: string;
  department: string;
  doctor: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  patientName: string;
  patientPhone: string;
}

export default function Medical() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      hospitalId: 1,
      hospitalName: '北京协和医院',
      department: '内科',
      doctor: '张医生',
      date: '2025-05-02',
      time: '10:00',
      patientName: '张三',
      patientPhone: '13800138000',
    },
    {
      id: '2',
      hospitalId: 1,
      hospitalName: '北京协和医院',
      department: '外科',
      doctor: '王医生',
      date: '2025-05-03',
      time: '14:00',
      patientName: '李四',
      patientPhone: '13900139000',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDate = () => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  }

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const bookAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: crypto.randomUUID() };
    setAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
  };

  useEffect(() => {
    getDate();
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <div className="w-full h-full overflow-hidden p-6">
        <Row gutter={16}>
          <Col span={10}>
            <CalendarComponent
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              appointments={appointments}
              onCancelAppointment={cancelAppointment}
            />
          </Col>
          <Col span={14}>
            <Appoint onBookAppointment={bookAppointment} />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}