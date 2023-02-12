import { PrismaClient } from "@prisma/client";
import musics from "./musics.json";

const prisma = new PrismaClient();

const reducedMusics = musics.slice(0, 500);

const genreRecords = reducedMusics
  .map((item) => item.genre)
  .filter((genre, index, genres) => genres.indexOf(genre) === index)
  .map((genre, index) => {
    return { id: index + 1, genre_name: genre };
  });

const singerRecords = reducedMusics
  .map((item) => item.singer)
  .filter((singer, index, singers) => singers.indexOf(singer) === index)
  .map((singer, index) => {
    return { id: index + 1, singer_name: singer };
  });

const songRecords = reducedMusics.map((item, index) => {
  return {
    id: index + 1,
    song_name: item.song,
    singerId: singerRecords.find((element) => element.singer_name === item.singer)?.id!,
    genreId: genreRecords.find((element) => element.genre_name === item.genre)?.id!,
    year: item.year,
  };
});

async function main() {
  await prisma.singer.createMany({
    data: singerRecords,
    skipDuplicates: true,
  });

  await prisma.genre.createMany({
    data: genreRecords,
    skipDuplicates: true,
  });

  await prisma.song.createMany({
    data: songRecords,
    skipDuplicates: true,
  });

  await prisma.playlist.createMany({
    data: [{ id: 1 }],
    skipDuplicates: true,
  });

  await prisma.songsInPlaylist.createMany({
    data: Array.from({ length: songRecords.length }).map((_, index) => ({
      playlistId: 1,
      songId: index + 1,
    })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log("DISCONNECTED FROM DATABASE STAGE 1");
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.log("DISCONNECTED FROM DATABASE STAGE 2");
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
