import { useEffect, useRef } from "react";
import "./map.scss";

interface MapProps {
  personId: string | null;
}

declare var AMap: any;

export default function Map({ personId }: MapProps) {
  const mapRef = useRef<any>(null);
  const mouseToolRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new AMap.Map(mapContainerRef.current, {
      zoom: 19,
      viewMode: "3D",
      controls: ["zoom", "mapType"],
      center: [117.145152, 39.06313]
    });

    markerRef.current = new AMap.Marker({
      position: new AMap.LngLat(117.145152, 39.06313),
      icon: "https://webapi.amap.com/images/0.png",
    });
    mapRef.current.add(markerRef.current);

    AMap.plugin("AMap.MouseTool", () => {
      mouseToolRef.current = new AMap.MouseTool(mapRef.current);
    });

    return () => {
      if (mouseToolRef.current) {
        mouseToolRef.current.close(true);
        mouseToolRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  const drawPolygon = () => {
    if (mouseToolRef.current) {
      mouseToolRef.current.polygon({
        strokeColor: "#1890ff",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#1791fc",
        fillOpacity: 0.4,
        strokeStyle: "solid",
      });
    }
  };

  const clearPolygon = () => {
    if (polygonRef.current) {
      mapRef.current.remove(polygonRef.current);
      polygonRef.current = null;
    }
  };

  return (
    <div className="map-container">
      <div className="map-status">
        <span className="status-title">Status:</span>
        <span className="status-switch">Safe</span>
      </div>
      <div
        ref={mapContainerRef}
        className="map-element"
        style={{ width: "100%", height: "100%" }}
      />
      <button className="draw-button" onClick={drawPolygon}>
        绘制区域
      </button>
      <button className="clear-button" onClick={clearPolygon}>
        清除绘制
      </button>
    </div>
  );
}