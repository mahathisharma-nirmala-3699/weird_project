CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable uuid-ossp extension

CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email)
);
