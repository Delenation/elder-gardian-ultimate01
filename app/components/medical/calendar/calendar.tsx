import { useState } from 'react';
import { Calendar, Badge, List, Typography, Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import "./calendar.scss";

dayjs.locale('zh-cn');

const { Text } = Typography;

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

interface CalendarComponentProps {
  onDateSelect: (dateStr: string) => void;
  selectedDate: string | null;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function CalendarComponent({ onDateSelect, selectedDate, appointments, onCancelAppointment }: CalendarComponentProps) {
  const cellRender = (current: any, info: any) => {
    if (info.type !== 'date') return null;
    const dateStr = current.format('YYYY-MM-DD');
    const hasAppointment = appointments.some((appt) => appt.date === dateStr);
    return (
      <div className="h-full">
        {hasAppointment && <Badge status="error" />}
      </div>
    );
  };

  const onSelect = (value: any) => {
    const dateStr = value.format('YYYY-MM-DD');
    onDateSelect(dateStr);
  };

  const calendarValue = selectedDate ? dayjs(selectedDate) : undefined;

  const selectedAppointments = selectedDate
    ? appointments.filter((appt) => appt.date === selectedDate)
    : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Calendar
        cellRender={cellRender}
        onSelect={onSelect}
        value={calendarValue}
        className="custom-calendar"
      />
      <div className="appointment-list-container">
        <List
          header={<div className="appointment-list-header">预约详情</div>}
          bordered
          dataSource={selectedAppointments}
          renderItem={(item) => (
            <List.Item>
              <div>
                <Text strong>时间: </Text>
                <Text>{item.time}</Text>
                <br />
                <Text strong>医生: </Text>
                <Text>{item.doctor}</Text>
                <br />
                <Text strong>科室: </Text>
                <Text>{item.department}</Text>
                <br />
                <Text strong>医院: </Text>
                <Text>{item.hospitalName}</Text>
                <br />
                <Text strong>患者: </Text>
                <Text>{item.patientName}</Text>
                <br />
                <Text strong>电话: </Text>
                <Text>{item.patientPhone}</Text>
                <br />
                <Button
                  onClick={() => onCancelAppointment(item.id)}
                  style={{ marginTop: 8 }}
                >
                  取消预约
                </Button>
              </div>
            </List.Item>
          )}
          locale={{ emptyText: selectedDate ? '该日期无预约' : '请先选择日期' }}
        />
      </div>
    </div>
  );
}