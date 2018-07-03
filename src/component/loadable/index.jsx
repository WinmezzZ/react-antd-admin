import Loadable from 'react-loadable';
import Loading from './loading';

export default function withLoadable (comp) {
  return Loadable({
    loader: comp,
    loading: Loading,
    delay: 300
  })
}