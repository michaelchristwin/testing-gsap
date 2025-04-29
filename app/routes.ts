import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/gsap", "routes/gsap.tsx"),
] satisfies RouteConfig;
