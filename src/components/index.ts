import { lazy } from "react";

export { default as DrawerWarpper } from "./DrawerWarpper/DrawerWarpper";
export { default as DeleteConfirm } from "./DeleteConfirm";
export { default as ExportButton } from "./ExportButton";
export { default as TableItemSwitch } from "./TableItemSwitch";
export { default as DictTag } from "./DictTag";
export { default as SvgIcon } from "./SvgIcon";
export { default as Auth } from "./Auth";
export const Editor = lazy(() => import("./Editor/Editor"));
