function noop() {
  return null;
}

require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
