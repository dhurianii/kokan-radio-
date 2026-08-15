export interface Track {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number; // seconds
  videoId: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}
