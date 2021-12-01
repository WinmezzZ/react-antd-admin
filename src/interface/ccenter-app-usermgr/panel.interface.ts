export interface Panel {
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

export interface DeskTopResult {
  PanelList: Panel[];
}
