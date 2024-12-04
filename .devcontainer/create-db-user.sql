CREATE USER "phamily-dev" WITH PASSWORD 'qwerty' CREATEDB;
ALTER ROLE "phamily-dev" SUPERUSER;
CREATE DATABASE keycloak_dev OWNER "phamily-dev";
CREATE DATABASE interop_development OWNER "phamily-dev";
