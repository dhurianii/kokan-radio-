import type { Playlist } from "../types/track";

// NOTE on copyright: the song list you provided consists of popular Marathi tracks
// that are almost certainly under copyright. To stay within YouTube's developer
// policies and copyright law, only use videoIds for tracks where:
//   1) you have the rights to use the song, OR
//   2) the upload comes from the rights holder's own YouTube channel
//      and embedding is enabled (no "Embedding not allowed" on the watch page).
// Do NOT search for or paste random YouTube IDs for these tracks — the
// `onError` handler will skip broken/embedding-disabled videos, but that
// only papers over the underlying infringement.
//
// To add a track, drop the YouTube videoId in the videoId field below.
// To add a new playlist, append a new entry to PLAYLISTS.

export const PLAYLISTS: Playlist[] = [
  {
    id: "kokan-classics",
    name: "Kokan Classics",
    tracks: [
      { id: "1", title: "Thai Thai Nachat Yave Rangani Ganraya", artist: "Sushant Garate", film: "", year: 0, duration: 0, videoId: "JfVRoQIZotw" },
      { id: "2", title: "He Gana… Sang Mala Yeshil Tu Kava", artist: "Pankaj Katale / Rajesh Padyal / Vishal Sutar", film: "", year: 0, duration: 0, videoId: "WvrZ3IHpcBg" },
      { id: "2b", title: "He Gana… Sang Mala Yeshil Tu Kava (Swami Samarth Kalamanch)", artist: "Pankaj Katale", film: "", year: 0, duration: 0, videoId: "JfVRoQIZotw" },
      { id: "3", title: "Vedavle Maan Bappa", artist: "SwarPankaj / Vishal Sutar", film: "", year: 2025, duration: 0, videoId: "uQX-unVgJkw" },
      { id: "4", title: "Jikde Tikde Chahu Kde", artist: "SwarPankaj", film: "", year: 0, duration: 0, videoId: "VLYWWhwGshs" },
      { id: "5", title: "Naad Ghumla", artist: "", film: "", year: 0, duration: 0, videoId: "rDK7e7_uFlY" },
    ],
  },
  {
    id: "ganpati-special",
    name: "Ganpati Special",
    tracks: [
      { id: "6", title: "Ganpati Ale", artist: "", film: "", year: 0, duration: 0, videoId: "zrbQKLFaMgU" },
      { id: "7", title: "Navsachi Gaurai", artist: "", film: "", year: 0, duration: 0, videoId: "84GP60c5fXc" },
    ],
  },
  {
    id: "kokan-vibes",
    name: "Kokan Vibes",
    tracks: [
      { id: "8", title: "Maza Kokan Bhari", artist: "", film: "", year: 0, duration: 0, videoId: "I6iSPLbeFxU" },
      { id: "9", title: "Yei Oh Vithale Nihar", artist: "", film: "", year: 0, duration: 0, videoId: "oHM4zm8OdGU" },
    ],
  },
];
