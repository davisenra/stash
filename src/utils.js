/**
 * @param {Object} obj
 * @returns {Object}
 */
export function toCamelCase(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    acc[camelCaseKey] = toCamelCase(obj[key]);
    return acc;
  }, {});
}

/**
 *
 * @param {string} originalFilename
 * @returns {{ filename: string, thumbnail: string }}
 */
export function generateFilenames(originalFilename) {
  const filename = `${Date.now()}_${originalFilename}`;
  const thumbnail = `thumb_${filename}`;
  return { filename, thumbnail };
}
