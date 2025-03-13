export type ApiResponse<T> = {
  result: T;
};

export type Wallpaper = {
  id: string;
  userId: string;
  name: string;
  wallpaperFile: string;
  thumbnailFile: string;
  height: number;
  width: number;
  createdAt: string;
  updatedAt: string;
};

export type WallpaperResponse = ApiResponse<{
  wallpapers: Wallpaper[];
}>;
