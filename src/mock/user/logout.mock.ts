import { intercepter, mock } from '../config';

mock.mock('/user/logout', 'post', intercepter(null));
