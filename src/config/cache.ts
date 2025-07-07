import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 600, // Standard Time To Live in seconds
  checkperiod: 120, // Check each 120 seconds for expired keys
  useClones: false, // Disable cloning of objects to improve performance
});

export { cache };
