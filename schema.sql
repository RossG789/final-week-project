-- CREATE TABLE users (
-- clerk_id TEXT PRIMARY KEY,
-- username TEXT,
-- location TEXT,
-- food_preferences TEXT
-- )

-- CREATE TABLE restaurants (
-- restaurant_id TEXT PRIMARY KEY,
-- name TEXT
-- )

-- CREATE TABLE dislikes (

-- dislike_id SERIAL PRIMARY KEY,
-- clerk_id TEXT,
-- restaurant_id TEXT,
-- FOREIGN KEY (clerk_id) REFERENCES users (clerk_id),
-- FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
-- );

-- CREATE TABLE likes (
-- like_id SERIAL PRIMARY KEY,
-- clerk_id TEXT,
-- restaurant_id TEXT,
-- FOREIGN KEY (clerk_id) REFERENCES users (clerk_id),
-- FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
-- );