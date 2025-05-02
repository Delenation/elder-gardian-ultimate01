import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route("/", "./routes/index/index.tsx", [
    index("./routes/redirectIndex.tsx"),
    route("dashboard", "./routes/dashboard/dashboard.tsx"),
    route("monitor", "./routes/monitor/monitor.tsx"),
    route("medical", "./routes/medical/medical.tsx"),
  ])
] satisfies RouteConfig;
