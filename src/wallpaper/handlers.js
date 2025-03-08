import { logger } from '../logger.js';
import { WallpaperManager } from './manager.js';
import wallpaperRepository from './repository.js';

const wallpaperManager = new WallpaperManager();

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function storeWallpaper(req, res) {
  const userId = '1';
  const maxUploadSize = 20_000_000; // allow uploads up to 20MB

  const data = await req.file({ limits: { fileSize: maxUploadSize } });
  const uploadedFile = data.file;

  const { filename, thumbnail } = await wallpaperManager.saveWallpaper(uploadedFile, data.filename);
  const metadata = wallpaperManager.getWallpaperMetadata(filename);

  await wallpaperRepository.save({
    userId,
    name: data.filename,
    wallpaperFile: filename,
    thumbnailFile: thumbnail,
    height: metadata.height,
    width: metadata.width,
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
      await wallpaperManager.deleteWallpaper(wallpaper.wallpaper_file, wallpaper.thumbnail_file);
      await wallpaperRepository.destroy(wallpaperId);
    }
  } catch (err) {
    logger.error(`Error during wallpaper deletion: ${err}`);
  }

  return res.status(204).send();
}
