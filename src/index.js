
import UUID from 'uuid';

import pb from './packet';

import {
  sta,
  encode,
  decode
} from './writer';

import {
  ConnectionUnestablished,
  InvalidPacket,
  InvalidNamespace,
  InvalidChannel
} from './errors';

export default class Hyper {

  constructor(...opts) {

    /**
     * apply hyper configurations
     */
    if ( Array.isArray(opts) ) {
      for ( const opt of opts ) {
        for ( const i in opt ) {
          this.options[i] = opt[i];
        }
      }
    }

    this.$bind();
  }

  /**
   * hyper configurations
   */
  options = {
    host    : location.hostname,
    path    : location.pathname,
    port    : location.port,
    secure  : false,
    interval: 5000,
  }

  /**
   * hyper client state
   */
  state = {
    connected: false,
    channels : [ ],
  }

  /**
   * bind events to hyper instance
   */
  $bind() {
    this.$onopen = this.$onopen.bind(this);
    this.$onclose = this.$onclose.bind(this);
    this.$onmessage = this.$onmessage.bind(this);
    this.$onerror = this.$onerror.bind(this);
    this.$oncheck = this.$oncheck.bind(this);
  }

  /**
   * keep websocket client alive
   *
   * if client is not connected, spin up a new client instance
   */
  $keepalive() {
    const { interval } = this.options;
    if ( !this.$i ) {
      this.$i = window.setInterval(this.$oncheck, interval);
    }
  }

  /**
   * create websocket client handler
   *
   * if websocket client exists, disconnect the session and re-create
   * a new client instance
   */
  $create() {
    Promise.resolve(
      this.websocket
      ? this.$close()
      : true
    ).then(e => {
      const { host, path, port, secure } = this.options;
      this.$ws = new WebSocket(`${secure ? 'wss' : 'ws'}://${host}${port > 0 ? `:${port}` : ''}${path}`);
      this.$ws.binaryType = 'arraybuffer';
      this.$ws.onopen = this.$onopen;
      this.$ws.onclose = this.$onclose;
      this.$ws.onmessage = this.$onmessage;
      this.$ws.onerror = this.$onerror;
    });
  }

  /**
   * close websocket client handler
   */
  $close() {
    return new Promise(resolve => {
      this.$ws.onclose = function () {};
      this.$ws.close();
      this.state.connected = false;
    });
  }

  /**
   * websocket client open event handler
   */
  $onopen(e) {
    this.state.connected = true;
    if ( typeof this.onopen === 'function' ) {
      this.onopen(e);
    }
  }

  /**
   * websocket client close event handler
   */
  $onclose(e) {
    this.state.connected = false;
    if ( typeof this.onclose === 'function' ) {
      this.onclose(e);
    }
  }

  /**
   * websocket client receive message event handler
   */
  $onmessage(e) {
    if ( e.data instanceof ArrayBuffer ) {
      const bytes = new Uint8Array(e.data);
      try {
        const decoded = pb.sync.Packet.decode(bytes);
        if ( typeof this.onmessage === 'function' ) {
          this.onmessage(decoded);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  /**
   * websocket client error event handler
   */
  $onerror(e) {
    if ( typeof this.onerror === 'function' ) {
      this.onerror(e);
    }
  }

  /**
   * websocket client health check handler
   */
  $oncheck() {
    const { connected } = this.state;
    if ( !connected ) {
      this.$create();
    }
  }

  /**
   * destroy hyper client
   *
   * close all the active connections and event listeners
   */
  destroy() {
    this.$close().then(e => {
      this.$i && window.clearInterval(this.$i);
    });
  }

  /**
   * expose websocket client
   */
  ws() {
    return new Promise(resolve => resolve(this.$ws));
  }

  /**
   * connect to server
   */
  connect() {
    this.$create();
    this.$keepalive();
  }

  /**
   * expose websocket connected state
   */
  connected() {
    const { connected } = this.state;
    return connected;
  }

  /**
   * write message to server
   */
  write(message) {
    return new Promise((resolve, reject) => {
      if ( !(message instanceof pb.sync.Packet) ) {
        return reject(InvalidPacket);
      }
      const buffer = pb.sync.Packet.encode(message).finish();
      this.$ws.send(buffer);
      return resolve(buffer);
    });
  }

  /**
   * subscribe channel
   */
  subscribe(namespace, channel) {
    const { connected } = this.state;
    return new Promise((resolve, reject) => {
      if ( !connected ) {
        return reject(ConnectionUnestablished);
      }
      if ( typeof namespace !== 'string' || namespace.trim().length === 0 ) {
        return reject(InvalidNamespace);
      }
      if ( typeof channel !== 'string' || channel.trim().length === 0 ) {
        return reject(InvalidChannel);
      }
      const message = pb.sync.Packet.create({
        ID: UUID.v4(),
        Action: 1,
        Namespace: namespace,
        Channel: channel,
      });
      return this.write(message).then(
        success => resolve(success),
        failure => reject(failure),
      );
    });
  }

  /**
   * unsubscribe channel
   */
  unsubscribe(namespace, channel) {
    return new Promise(resolve => {
    });
  }

  send(namespace, channel, call, data) {
    return new Promise((resolve, reject) => {
      const message = pb.sync.Packet.create({
        ID: UUID.v4(),
        Action: 7,
        Namespace: namespace,
        Channel: channel,
        Call: call,
        Message: sta(data),
      });
      return this.write(message).then(
        success => resolve(success),
        failure => reject(failure),
      );
    });
  }

}

export { secure, host, path, port, interval } from './options';

