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
async function all(filters) {
  return await db('wallpapers').select('*').where('user_id', '=', filters.userId);
}

/**
 * Finds a wallpaper by its ID.
 * @param {string} id - The ID of the wallpaper.
 * @returns {Promise<Object|null>} - The wallpaper object or null if not found.
 */
async function findById(id) {
  return await db('wallpapers').select('*').where('id', '=', id).first();
}

/**
 * Deletes a wallpaper by its ID.
 * @param {string} id - The ID of the wallpaper to delete.
 * @returns {Promise<void>}
 */
async function deleteById(id) {
  await db('wallpapers').where('id', '=', id).delete();
}

export default { save, all, findById, deleteById };
