import { mock, intercepter } from '../config';

mock.mock('/user/logout', 'post', intercepter(null));
