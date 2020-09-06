CREATE DATABASE api;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    dad VARCHAR(40),
    mom VARCHAR(40)
);

INSERT INTO users(name, dad, mom)
VALUES ('Daniel Perez', NULL, NULL),
    ('Claudia Jimenez', NULL, NULL),
    (
        'Camila Perez Jimenez',
        'Daniel Perez',
        'Claudia Jimenez'
    );