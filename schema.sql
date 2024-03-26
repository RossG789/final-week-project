CREATE TABLE users (
id TEXT PRIMARY KEY,
username TEXT
)

CREATE TABLE restaurants (
id TEXT PRIMARY KEY,
name TEXT,
img_url TEXT

)

CREATE TABLE dislikes (
users_id TEXT,
restaurant_id TEXT,
FOREIGN KEY (users_id) REFERENCES users (id),
FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);

CREATE TABLE likes (
users_id TEXT,
restaurant_id TEXT,
FOREIGN KEY (users_id) REFERENCES users (id),
FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);