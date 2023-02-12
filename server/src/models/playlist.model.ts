import { PrismaClient } from "@prisma/client";
import { Filters, MusicProperties } from "../controllers/playlist.controller";

const prisma = new PrismaClient();

async function getMusics(page = 0, perPage = 25, column = "singer", order = "asc", filters: Filters) {
  const options = {
    where: {
      playlistId: 1,
      song: {
        singer: {
          singer_name: { in: filters.singers },
        },
        genre: {
          genre_name: { in: filters.genres },
        },
        year: { in: filters.years },
      },
    },
    include: {
      song: {
        select: {
          song_name: true,
          genre: {
            select: {
              genre_name: true,
            },
          },
          singer: {
            select: {
              singer_name: true,
            },
          },
          year: true,
        },
      },
    },
    orderBy: {} as const,
    skip: +page * +perPage,
    take: +perPage,
  };

  // Order By options
  if (column === "singer") {
    options.orderBy = {
      song: {
        singer: {
          singer_name: order,
        },
      },
    };
  } else if (column === "song") {
    options.orderBy = {
      song: {
        song_name: order,
      },
    };
  } else if (column === "genre") {
    options.orderBy = {
      song: {
        genre: {
          genre_name: order,
        },
      },
    };
  } else if (column === "year") {
    options.orderBy = {
      song: {
        year: order,
      },
    };
  }
  // End Order By options

  const playlist = await prisma.songsInPlaylist.findMany(options);

  return playlist;
}

async function getQuantityMusics(filters: Filters) {
  const quantity = await prisma.songsInPlaylist.count({
    where: {
      playlistId: 1,
      song: {
        singer: {
          singer_name: { in: filters.singers },
        },
        genre: {
          genre_name: { in: filters.genres },
        },
        year: { in: filters.years },
      },
    },
  });
  return quantity;
}

async function getUniqueMusicTypes() {
  const uniqueTypes: Filters = {
    singers: [],
    genres: [],
    years: [],
  };

  const singers = await prisma.singer.findMany({
    select: {
      singer_name: true,
    },
    distinct: ["singer_name"],
  });
  const genres = await prisma.genre.findMany({
    select: {
      genre_name: true,
    },
    distinct: ["genre_name"],
  });
  const years = await prisma.song.findMany({
    select: {
      year: true,
    },
    distinct: ["year"],
  });

  singers.forEach((array: { singer_name: string }) => {
    uniqueTypes.singers!.push(array.singer_name);
  });

  genres.forEach((array: { genre_name: string }) => {
    uniqueTypes.genres!.push(array.genre_name);
  });

  years.forEach((array: { year: number }) => {
    uniqueTypes.years!.push(array.year);
  });

  return uniqueTypes;
}

async function postMusic({ singer, song, genre, year }: MusicProperties) {
  // let genre_id = 0;
  // if (!singer || !song || !genre || !year) return false;

  // const genres = await pool.query("SELECT genre FROM genres ORDER BY genre;");
  // if (genres.rows[0].includes(genre)) genre_id = genres.rows[0].indexOf(genre) + 1;
  // else {
  //   await pool.query(`INSERT INTO genres (genre) values (${genre})`);
  //   genre_id = genres.rowCount + 1;
  // }

  // const response = await pool.query(
  //   "INSERT INTO playlist (singer, song, genre, year) values ($1, $2, $3, $4) RETURNING *",
  //   [singer, song, genre_id, year]
  // );

  // return response.rows[0] as MusicProperties;

  const genre_id = await prisma.genre.findFirst({
    where: {
      genre_name: genre,
    },
    select: {
      id: true,
    },
  });

  console.log(genre_id);

  const singer_id = await prisma.singer.findFirst({
    where: {
      singer_name: singer,
    },
    select: {
      id: true,
    },
  });

  console.log(singer_id);

  // const song = await prisma.song.create({
  //   data: {
  //     song_name: song,
  //     year: year,
  //     genre:
  //   }
  // })

  return [];
}

export { getMusics, getQuantityMusics, getUniqueMusicTypes, postMusic };
