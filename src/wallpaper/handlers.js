import sharp from 'sharp';
import { logger } from '../logger.js';
import wallpaperRepository from './repository.js';
import WallpaperStorage from './storage.js';

const wallpaperStorage = new WallpaperStorage();

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function storeWallpaper(req, res) {
  const userId = '1';
  const maxUploadSize = 20_000_000; // allow uploads up to 20MB

  const data = await req.file({ limits: { fileSize: maxUploadSize } });
  const uploadedFile = data.file;

  const { filename, thumbnail } = await wallpaperStorage.saveWallpaper(uploadedFile, data.filename);

  const storedWallpaperPath = wallpaperStorage.getPathForWallpaper(filename);

  const metadata = await sharp(storedWallpaperPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  await wallpaperRepository.save({
    userId,
    name: data.filename,
    wallpaperFile: filename,
    thumbnailFile: thumbnail,
    height,
    width,
  });

  logger.info('Wallpaper stored', {
    userId,
    file: filename,
    size: uploadedFile.bytesRead,
  });

  res.status(201).send();
}

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function listWallpapers(req, res) {
  const userId = '1';
  const wallpapers = await wallpaperRepository.all({ userId: userId });

  res.send({
    result: {
      wallpapers: wallpapers,
    },
  });
}

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function deleteWallpaper(req, res) {
  const userId = '1';
  const wallpaperId = req.params.id;

  try {
    const wallpaper = await wallpaperRepository.find(wallpaperId);

    if (wallpaper && wallpaper.user_id === parseInt(userId)) {
      await wallpaperStorage.deleteWallpaper(wallpaper.wallpaperFile, wallpaper.thumbnailFile);
      await wallpaperRepository.destroy(wallpaperId);
    }
  } catch (err) {
    logger.error(`Error during wallpaper deletion: ${err}`);
  }

  return res.status(204).send();
}
