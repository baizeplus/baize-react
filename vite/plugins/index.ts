import react from "@vitejs/plugin-react-swc";
// import createSvgIcon from "./svg-icon";
import svgr from "vite-plugin-svgr";

export default function createVitePlugins() {
  const vitePlugins = [react(), svgr({ ref: true })];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // vitePlugins.push(svgr() as any)
  return vitePlugins;
}
