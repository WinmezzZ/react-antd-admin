import { intercepter, mock } from '../config';

mock.onPost('/user/logout').reply(200, intercepter(null));
