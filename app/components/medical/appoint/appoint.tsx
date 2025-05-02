import { useState, useEffect, useRef } from "react";
import { Input, Card, Tag, Modal, Button, Form, DatePicker, TimePicker } from "antd";
import BScroll, { type BScrollInstance } from 'better-scroll';
import "./appoint.scss";

const labels = [
  { name: "三甲医院", id: 1, color: "#ffa940" },
  { name: "综合医院", id: 2, color: "#f5222d" },
  { name: "儿童专科", id: 3, color: "#1890ff" },
  { name: "心血管中心", id: 4, color: "#52c41a" },
  { name: "肿瘤专科", id: 5, color: "#722ed1" },
  { name: "骨科中心", id: 6, color: "#13c2c2" },
];

const data = [
  {
    name: "北京协和医院",
    id: 1,
    image: "/medical/hospitals/_1.jpg",
    labels: [0, 1], // 三甲医院 + 综合医院
    address: "北京市东城区帅府园1号",
    contact: "010-69156114",
    departments: [
      {
        name: "内科",
        doctors: [
          { name: "张医生", id: 1 },
          { name: "李医生", id: 2 },
        ],
      },
      {
        name: "外科",
        doctors: [
          { name: "王医生", id: 3 },
          { name: "赵医生", id: 4 },
        ],
      },
    ],
  },
  {
    name: "上海瑞金医院",
    id: 2,
    image: "/medical/hospitals/_2.png",
    labels: [0, 2], // 三甲医院 + 儿童专科
    address: "上海市黄浦区瑞金二路197号",
    contact: "021-64370045",
    departments: [
      {
        name: "儿科",
        doctors: [
          { name: "陈医生", id: 5 },
          { name: "刘医生", id: 6 },
        ],
      },
    ],
  },
  {
    name: "广州中山大学附属第一医院",
    id: 3,
    image: "/medical/hospitals/_3.webp",
    labels: [0, 3], // 三甲医院 + 心血管中心
    address: "广州市越秀区中山二路58号",
    contact: "020-28823388",
    departments: [
      {
        name: "心血管科",
        doctors: [
          { name: "黄医生", id: 7 },
          { name: "周医生", id: 8 },
        ],
      },
      {
        name: "内科",
        doctors: [
          { name: "吴医生", id: 9 },
          { name: "郑医生", id: 10 },
        ],
      },
    ],
  },
  {
    name: "四川大学华西医院",
    id: 4,
    image: "/medical/hospitals/_4.webp",
    labels: [0, 4], // 三甲医院 + 肿瘤专科
    address: "成都市武侯区国学巷37号",
    contact: "028-85422114",
    departments: [
      {
        name: "肿瘤科",
        doctors: [
          { name: "杨医生", id: 11 },
          { name: "何医生", id: 12 },
        ],
      },
      {
        name: "外科",
        doctors: [
          { name: "罗医生", id: 13 },
          { name: "邓医生", id: 14 },
        ],
      },
    ],
  },
  {
    name: "武汉同济医院",
    id: 5,
    image: "/medical/hospitals/_5.jpg",
    labels: [0, 5], // 三甲医院 + 骨科中心
    address: "武汉市硚口区解放大道1095号",
    contact: "027-83662688",
    departments: [
      {
        name: "骨科",
        doctors: [
          { name: "孙医生", id: 15 },
          { name: "朱医生", id: 16 },
        ],
      },
      {
        name: "内科",
        doctors: [
          { name: "胡医生", id: 17 },
          { name: "余医生", id: 18 },
        ],
      },
    ],
  },
  {
    name: "天津医科大学总医院",
    id: 6,
    image: "/medical/hospitals/_6.webp",
    labels: [0, 3], // 三甲医院 + 心血管中心
    address: "天津市和平区鞍山道154号",
    contact: "022-60362255",
    departments: [
      {
        name: "心血管科",
        doctors: [
          { name: "郭医生", id: 19 },
          { name: "马医生", id: 20 },
        ],
      },
      {
        name: "外科",
        doctors: [
          { name: "贾医生", id: 21 },
          { name: "丁医生", id: 22 },
        ],
      },
    ],
  },
];

interface Hospital {
  name: string;
  id: number;
  image: string;
  labels: Array<number>;
  address: string;
  contact: string;
  departments: Array<any>;
}

interface Doctor {
  name: string;
  id: number;
}

export default function Appoint({ onBookAppointment }: any) {
  const [hospitals, setHospitals] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const scrollRef = useRef(null);
  const bScrollRef = useRef<BScrollInstance>(null);

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchText.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (scrollRef.current && !bScrollRef.current) {
      bScrollRef.current = new BScroll(scrollRef.current, {
        scrollY: true,
        click: true,
        probeType: 3,
        mouseWheel: true,
        scrollbar: { fade: true, interactive: true },
      });
    }

    const handleResize = () => {
      console.log('fuck')
      if (bScrollRef.current) bScrollRef.current.refresh();
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
    if (bScrollRef.current) bScrollRef.current.refresh();
  }, [filteredHospitals]);

  const showHospitalDetail = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
  };

  const bookAppointment = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setIsBookingModalVisible(true);
  };

  const handleBookingModalClose = () => {
    setIsBookingModalVisible(false);
    setBookingDoctor(null);
  };

  const handleBookingSubmit = (values: any) => {
    const appointment = {
      hospitalId: selectedHospital?.id,
      hospitalName: selectedHospital?.name,
      department: selectedHospital?.departments.find(
        dept => dept.doctors.some((d: Doctor) => d.id === bookingDoctor?.id)
      ).name,
      doctor: bookingDoctor?.name,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      patientName: values.name,
      patientPhone: values.phone,
    };
    onBookAppointment(appointment);
    setIsBookingModalVisible(false);
  };

  return (
    <div className="appoint">
      <div className="search-container">
        <Input.Search
          placeholder="搜索医院名称或地址"
          allowClear
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="hospitals-scroll" ref={scrollRef}>
        <div className="hospitals-content">
          <div className="hospitals-grid">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <Card
                  key={hospital.id}
                  className="hospital-card"
                  onClick={() => showHospitalDetail(hospital)}
                >
                  <div className="hospital-content">
                    <img
                      src={hospital.image}
                      alt={`${hospital.name} image`}
                      className="hospital-image"
                    />
                    <h3 className="hospital-name">{hospital.name}</h3>
                    <div className="hospital-labels">
                      {hospital.labels.map((labelIndex) => {
                        const label = labels[labelIndex];
                        return (
                          <Tag key={label.id} color={label.color}>
                            {label.name}
                          </Tag>
                        );
                      })}
                    </div>
                    <p className="hospital-info">地址: {hospital.address}</p>
                    <p className="hospital-info">联系电话: {hospital.contact}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="no-results">未找到匹配的医院</div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={selectedHospital?.name}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        className="hospital-detail-modal"
      >
        {selectedHospital && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-700 mb-2"><strong>地址:</strong> {selectedHospital.address}</p>
            <p className="text-gray-700 mb-4"><strong>联系电话:</strong> {selectedHospital.contact}</p>
            <h3 className="text-lg font-semibold mb-2">科室</h3>
            {selectedHospital.departments.map((dept) => (
              <div key={dept.name} className="mb-4">
                <h4 className="text-md font-medium mb-1">{dept.name}</h4>
                <ul className="list-disc pl-5">
                  {dept.doctors.map((doctor: Doctor) => (
                    <li key={doctor.id} className="flex justify-between items-center mb-1">
                      <span>{doctor.name}</span>
                      <Button
                        onClick={() => bookAppointment(doctor)}
                        className="ml-4"
                      >
                        预约
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        title={`预约 ${bookingDoctor?.name} 医生`}
        visible={isBookingModalVisible}
        onCancel={handleBookingModalClose}
        footer={null}
        className="booking-modal"
      >
        <Form onFinish={handleBookingSubmit} layout="vertical" className="p-4">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话" rules={[{ required: true, message: "请输入电话" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="预约日期" rules={[{ required: true, message: "请选择日期" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="time" label="预约时间" rules={[{ required: true, message: "请选择时间" }]}>
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交预约
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}