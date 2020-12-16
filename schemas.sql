CREATE TABLE "Users" (
	"user_id" serial NOT NULL PRIMARY KEY,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"pass" VARCHAR(255) NOT NULL
);

CREATE TABLE "Cities" (
	"city_id" serial NOT NULL PRIMARY KEY,
	"country" VARCHAR(255) NOT NULL,
	"name" VARCHAR(255) NOT NULL
);

CREATE TABLE "Continents" (
	"continent_id" serial NOT NULL PRIMARY KEY,
	"country" VARCHAR(255) NOT NULL
);

CREATE TABLE "Months" (
	"month_id" serial NOT NULL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
);

CREATE TABLE "Temperature" (
	"temp_id" serial NOT NULL PRIMARY KEY,
	"city_id" integer NOT NULL,
	"month_id" integer NOT NULL,
	"temperature" integer NOT NULL
);

ALTER TABLE "Temperature" ADD CONSTRAINT "Temperature_fk0" FOREIGN KEY ("city_id") REFERENCES "Cities"("city_id");
ALTER TABLE "Temperature" ADD CONSTRAINT "Temperature_fk1" FOREIGN KEY ("month_id") REFERENCES "Months"("month_id");
