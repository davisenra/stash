import fs from 'node:fs';
import stream from 'node:stream/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { logger } from '../logger.js';
import wallpaperRepository from '../repositories/wallpaper.js';
import { generateFilenames, toCamelCase } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function storeWallpaper(req, res) {
  const userId = 1;
  const maxUploadSize = 20_000_000; // allow uploads up to 20MB

  const data = await req.file({ limits: { fileSize: maxUploadSize } });
  const uploadedFile = data.file;

  const fileDetails = generateFilenames(data.filename);
  const wallpaperPath = path.join(__dirname, '../../storage/wallpapers', fileDetails.filename);
  const thumbnailPath = path.join(__dirname, '../../storage/thumbnails', fileDetails.thumbnail);

  // Ensure the storage directories exist
  await fs.promises.mkdir(path.dirname(wallpaperPath), { recursive: true });
  await fs.promises.mkdir(path.dirname(thumbnailPath), { recursive: true });

  await stream.pipeline(uploadedFile, fs.createWriteStream(wallpaperPath));

  const metadata = await sharp(wallpaperPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  const thumbnailStream = sharp(wallpaperPath).resize(500, 500, {
    fit: 'inside', // maintain aspect ratio, ensuring dimensions do not exceed 500x500
    withoutEnlargement: true, // do not enlarge the image if it's smaller than 500x500
  });

  await stream.pipeline(thumbnailStream, fs.createWriteStream(thumbnailPath));

  await wallpaperRepository.save({
    userId,
    name: data.filename,
    wallpaperFile: wallpaperPath,
    thumbnailFile: thumbnailPath,
    height,
    width,
  });

  logger.info('Wallpaper stored successfully', {
    userId,
    file: fileDetails.filename,
    size: uploadedFile.bytesRead,
  });

  res.status(201).send();
}

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function listWallpapers(req, res) {
  const userId = 1;
  const wallpapers = Array.from(await wallpaperRepository.allByUserId({ userId: userId })).map(
    (w) => toCamelCase(w),
  );

  res.send({
    result: {
      wallpapers: wallpapers,
    },
  });
}
