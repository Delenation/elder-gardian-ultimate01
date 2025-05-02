import { useEffect, useRef, useState, useMemo } from "react";
import { Modal, List, Button, Input } from "antd";
import Hls from "hls.js";
import "./camera.scss";

interface CameraProps {
  personId: string | null;
}

interface Camera {
  id: string;
  name: string;
  streamUrl: string;
}

export default function Camera({ personId }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCameraName, setNewCameraName] = useState("");
  const [newCameraUrl, setNewCameraUrl] = useState("");
  const [nextId, setNextId] = useState(2);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    setCameras([
      {
        id: "default",
        name: "Default Camera",
        streamUrl: "http://8.140.243.53:888/live/streamkey/hls.m3u8",
      },
    ]);
    setSelectedCameraId("default");
  }, []);

  const selectedStreamUrl = useMemo(() => {
    const camera = cameras.find((c) => c.id === selectedCameraId);
    return camera ? camera.streamUrl : "";
  }, [cameras, selectedCameraId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedStreamUrl || isPaused) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(selectedStreamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.error("Video play failed:", err));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = selectedStreamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.error("Video play failed:", err));
      });
      return () => {
        video.src = "";
      };
    }
  }, [selectedStreamUrl, isPaused]);

  const handleSelect = (id: string) => {
    setSelectedCameraId(id);
    setIsModalVisible(false);
  };

  const handleRemove = (id: string) => {
    const newCameras = cameras.filter((c) => c.id !== id);
    setCameras(newCameras);
    if (selectedCameraId === id) {
      if (newCameras.length > 0) {
        setSelectedCameraId(newCameras[0].id);
      } else {
        setSelectedCameraId(null);
      }
    }
  };

  const handleAdd = () => {
    if (newCameraName.trim() && newCameraUrl.trim()) {
      const newId = String(nextId);
      setCameras([...cameras, { id: newId, name: newCameraName, streamUrl: newCameraUrl }]);
      setNextId(nextId + 1);
      setNewCameraName("");
      setNewCameraUrl("");
    }
  };

  const handleTogglePause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPaused) {
        video.play().catch((err) => console.error("Video play failed:", err));
      } else {
        video.pause();
      }
      setIsPaused(!isPaused);
    } else {
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-status">
        <span className="status-title">Monitor</span>
        <span className="status-switch">{isPaused ? "Off" : "On"}</span>
      </div>
      <div className="camera-controls" style={{ display: "flex", gap: "4px" }}>
        <button onClick={() => setIsModalVisible(true)}>切换摄像头</button>
        <button onClick={handleTogglePause}>{isPaused ? "恢复" : "暂停"}</button>
      </div>
      {selectedStreamUrl ? (
        <video
          ref={videoRef}
          className="camera-video"
          controls
          muted
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <div className="no-camera">No camera available</div>
      )}
      <Modal
        title="摄像头管理"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={cameras}
          renderItem={(camera) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => handleSelect(camera.id)}
                  disabled={camera.id === selectedCameraId}
                >
                  选择
                </Button>,
                <Button onClick={() => handleRemove(camera.id)} danger>
                  删除
                </Button>,
              ]}
            >
              {camera.name} {camera.id === selectedCameraId && <span>(当前)</span>}
            </List.Item>
          )}
        />
        <div className="add-camera-form">
          <Input
            placeholder="摄像头名称"
            value={newCameraName}
            onChange={(e) => setNewCameraName(e.target.value)}
          />
          <Input
            placeholder="视频流地址"
            value={newCameraUrl}
            onChange={(e) => setNewCameraUrl(e.target.value)}
          />
          <Button onClick={handleAdd}>添加摄像头</Button>
        </div>
      </Modal>
    </div>
  );
}