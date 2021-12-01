import { PanelEnv } from '../common/panel-env.interface';
import { ServiceStatus } from '../common/status.interface';

export interface ServiceDetailParams {
  /** 服务代号。ServiceCode和AppCode+EnvId必须二选一。 */
  ServiceCode: string;

  EnvId: string;
}

export interface ServiceDetailResult {
  ServiceCode: string;
  Status: ServiceStatus;
  Autostart: YN;
  IsWatched: YN;
  SupportedActions: {
    reload: boolean;
    restart: boolean;
    start: boolean;
    stop: boolean;
  };
  PanelEnvs: PanelEnv[];
}
