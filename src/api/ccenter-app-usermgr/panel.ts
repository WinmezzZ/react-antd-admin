import { request } from '../request';

/** 桌面菜单接口 */
export const apiDesktopInit = () => request<DeskTopResult>('get', 'Desktop.Init', { api_ccenter_app: 'core' });

interface Panel {
  PanelCode: string;
  PanelIsUpgradable: string;
  PanelLastestVersion: string;
  PanelName: string;
  PanelUIVersion: string;
  PanelVersion: string;
  ShowInMenu: string;
  ShowIndex: number;
  SoftwareId: number;
}

interface DeskTopResult {
  PanelList: Panel[];
}
