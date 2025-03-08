import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import stream from 'stream/promises';
import { fileURLToPath } from 'url';
import { logger } from '../internal/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WallpaperManager {
  constructor() {
    this.wallpaperDir = path.join(__dirname, '../../storage/wallpapers');
    this.thumbnailDir = path.join(__dirname, '../../storage/thumbnails');
  }

  /**
   * Ensures the storage directories exist.
   */
  async ensureDirectories() {
    await fs.promises.mkdir(this.wallpaperDir, { recursive: true });
    await fs.promises.mkdir(this.thumbnailDir, { recursive: true });
  }

  /**
   * Saves a wallpaper and its thumbnail.
   * @param {stream.Readable} fileStream - The uploaded file stream.
   * @param {string} originalFilename - The original filename.
   * @returns {Promise<{ filename: string, thumbnail: string }>} - The generated filenames.
   */
  async saveWallpaper(fileStream, originalFilename) {
    await this.ensureDirectories();

    const { filename, thumbnail } = this.generateFilenames(originalFilename);
    const wallpaperPath = path.join(this.wallpaperDir, filename);
    const thumbnailPath = path.join(this.thumbnailDir, thumbnail);

    await stream.pipeline(fileStream, fs.createWriteStream(wallpaperPath));

    const thumbnailStream = sharp(wallpaperPath).resize(500, 500, {
      fit: 'inside', // maintain aspect ratio, ensuring dimensions do not exceed 500x500
      withoutEnlargement: true, // do not enlarge the image if it's smaller than 500x500
    });

    await stream.pipeline(thumbnailStream, fs.createWriteStream(thumbnailPath));

    return { filename, thumbnail };
  }

  /**
   * Deletes a wallpaper and its thumbnail.
   * @param {string} filename - The wallpaper filename.
   * @param {string} thumbnail - The thumbnail filename.
   */
  async deleteWallpaper(filename, thumbnail) {
    fs.unlink(path.join(this.wallpaperDir, filename), (err) => {
      logger.warn(`Error while deleting wallpaper: ${err}`);
    });

    fs.unlink(path.join(this.thumbnailDir, thumbnail), (err) => {
      logger.warn(`Error while deleting thumbnail: ${err}`);
    });
  }

  /**
   * @param {string} filename
   * @returns {Promise<sharp.Metadata>}
   */
  async getWallpaperMetadata(filename) {
    return await sharp(this.#getPathForWallpaper(filename)).metadata();
  }

  /**
   * Generates unique filenames for a wallpaper and its thumbnail.
   * @param {string} originalFilename - The original filename.
   * @returns {{ filename: string, thumbnail: string }} - The generated filenames.
   */
  generateFilenames(originalFilename) {
    const filename = `${Date.now()}_${originalFilename}`;
    const thumbnail = `thumb_${filename}`;
    return { filename, thumbnail };
  }

  /**
   * Returns the full path for a wallpaper file.
   * @param {string} filename - The wallpaper filename.
   * @returns {string} - The full path to the wallpaper file.
   */
  #getPathForWallpaper(filename) {
    return path.join(this.wallpaperDir, filename);
  }
}
