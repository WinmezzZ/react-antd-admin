import { Licence } from '../common/licence.interface';

export interface NodeMenuListParams {
  NodeId: string;
}

export interface NodeMenuItem {
  IsDefault: YN;
  Licenses: Licence[];
  PanelCode: string;
  PanelIsUpgradable: YN;
  PanelLastestVersion: string;
  PanelName: string;
  PanelVersion: string;
  ShowInMenu: YN;
  ShowIndex: number;
  SoftwareId: number;
}

export type NodeMenuList = NodeMenuItem[];
