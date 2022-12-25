create TABLE playlist(
    id SERIAL PRIMARY KEY,
    singer VARCHAR(255),
    song VARCHAR(255),
    genre VARCHAR(255),
    year INTEGER
);

-- {
--     "singer": "Nirvana",
--     "song": "Smells Like Teen Spirit",
--     "genre": "rock",
--     "year": "1991"
-- }

INSERT INTO playlist (singer, song, genre, year) 
VALUES ('Nirvana', 'Some random song', 'blues', 1990);

INSERT INTO playlist (singer, song, genre, year) VALUES ('Imagine Dragons', 'Bones', 'rock', 2022),
('Imagine Dragons', 'Believer', 'rock', 2017), ('Stevie Ray Vaughan', 'Little Wing', 'blues', 1984),
('John Lee Hooker', 'One Bourbon, One Scotch, One Beer', 'blues', 1953);