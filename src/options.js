
export function secure(secure) {
  return typeof secure === 'boolean'
    ? secure
    : location.protocol === 'https:'
}

export function host(host = location.hostname) {
  return { host };
}

export function path(path = location.pathname) {
  return { path };
}

export function port(port = location.port) {
  return { port: Number(port) };
}

export function interval(interval = 5000) {
  return { interval };
}
