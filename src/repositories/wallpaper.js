import { db } from '../database.js';

/**
 * @param {Object} data
 * @param {string} data.userId
 * @param {string} data.name
 * @param {string} data.wallpaperFile
 * @param {string} data.thumbnailFile
 * @param {number} data.height
 * @param {number} data.width
 */
async function save(data) {
  await db('wallpapers').insert({
    user_id: data.userId,
    name: data.name,
    wallpaper_file: data.wallpaperFile,
    thumbnail_file: data.thumbnailFile,
    height: data.height,
    width: data.width,
  });
}

/**
 * @param {Obejct} filters
 * @param {string} filters.userId
 */
async function allByUserId(filters) {
  return await db('wallpapers').select('*').where('user_id', '=', filters.userId);
}

export default { save, allByUserId };
