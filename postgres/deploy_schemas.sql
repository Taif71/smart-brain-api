-- DEPLOY fresh database tables

-- Deploy fresh database tabels:

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- For testing purposes only. This file will add dummy data
\i '/docker-entrypoint-initdb.d/seed/seed.sql'



-- order matters here if your tables depend on each other

-- \i -- Execute scripts