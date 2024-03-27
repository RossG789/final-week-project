CREATE TABLE users (
id TEXT PRIMARY KEY,
username TEXT,
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
FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);


-- When Signed up. Insert username into users table

-- When Liked
-- reference person who liked, reference the restaurant Id of what was liked. Insert name of restaurant, and imageUrl into restaurants

-- Profile
-- select username and restaurants from likes table and join on restaurants
-- When disliked on Profile
-- delete from likes where id is the same as the previous like ID and restaurant ID 