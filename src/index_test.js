
import Hyper, { host, path, port, secure } from './index';

const hyper = new Hyper(
  host('localhost'),
  path('/_s'),
  port(4000),
  secure(false),
)

hyper.onopen = e => {
  console.log('hyper open', e);
  hyper.subscribe('default', 'test-channel');
  window.setInterval(_ => {
    hyper.send('default', 'test-channel', 'ping', 'hello');
  }, 5000);
}

hyper.onclose = e => {
  console.log('hyper close', e);
}

hyper.onmessage = e => {
  console.log('hyper message', e);
}

hyper.onerror = e => {
  console.log('hyper error', e);
}

hyper.connect();
