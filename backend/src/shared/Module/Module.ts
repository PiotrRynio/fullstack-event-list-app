import { ModuleCore } from './core/ModuleCore';
import { ModuleRestApi } from './presentation/rest-api/ModuleRestApi';

export type Module = {
  core: ModuleCore;
  restApi?: ModuleRestApi;
};
