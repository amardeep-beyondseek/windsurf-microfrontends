// custom-loader.js
export function resolve(specifier, context, nextResolve) {
  // Handle the node:perf_hooks case specifically
  if (specifier === 'node:perf_hooks') {
    return {
      shortCircuit: true,
      url: new URL('perf_hooks', import.meta.url).href,
    };
  }

  // Let Node.js handle all other specifiers
  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  // Forward to the next loader in the chain
  return nextLoad(url, context);
}
