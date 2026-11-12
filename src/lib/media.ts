import manifest from '../data/media-manifest.json';
import { url } from '../i18n';

export interface AudioInfo {
  src: string;
  duration: number;
  peaks: number[];
}

export interface VideoInfo {
  src: string;
  poster: string;
  duration: number;
  width: number;
  height: number;
}

export function audioInfo(key: string): AudioInfo {
  const info = (manifest.audio as Record<string, AudioInfo>)[key];
  if (!info) throw new Error(`Áudio ausente no manifesto: ${key}`);
  return { ...info, src: url(info.src) };
}

export function videoInfo(key: string): VideoInfo {
  const info = (manifest.video as Record<string, VideoInfo>)[key];
  if (!info) throw new Error(`Vídeo ausente no manifesto: ${key}`);
  return { ...info, src: url(info.src), poster: url(info.poster) };
}
