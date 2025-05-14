// This file provides polyfills for Node.js built-ins
import { performance } from 'perf_hooks';

globalThis.performance = performance;

export {};
