import Pusher from 'pusher-js';

export function initPusher() {
  const socket = new Pusher('52e1b12bd1d0bf1c1890', {
    cluster: 'ap2',
  });

  return socket;
}

