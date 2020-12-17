-- psql -d postgres://iuowxmfk:jF4QcmBMddvDEm5efZ_ypVi24cYriqqt@suleiman.db.elephantsql.com:5432/iuowxmfk -f 'schemas.sql'

DROP TABLE IF EXISTS "Users" CASCADE

DROP TABLE IF EXISTS "Continents" CASCADE

DROP TABLE IF EXISTS "Countries" CASCADE
DROP TABLE IF EXISTS "Cities" CASCADE
DROP TABLE IF EXISTS "Months" CASCADE
DROP TABLE IF EXISTS "Temperatures" CASCADE

CREATE TABLE "Users" (
	"user_id" serial NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"pass" VARCHAR(255) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Cities" (
	"city_id" serial NOT NULL,
	"country_id" integer NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "Cities_pk" PRIMARY KEY ("city_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Continents" (
	"continent_id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "Continents_pk" PRIMARY KEY ("continent_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Temperature" (
	"temp_id" serial NOT NULL,
	"city_id" integer NOT NULL,
	"month" VARCHAR(255) NOT NULL,
	"temperature" FLOAT NOT NULL,
	CONSTRAINT "Temperature_pk" PRIMARY KEY ("temp_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Countries" (
	"country_id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"continent_id" integer NOT NULL,
	CONSTRAINT "Countries_pk" PRIMARY KEY ("country_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Cities" ADD CONSTRAINT "Cities_fk0" FOREIGN KEY ("country_id") REFERENCES "Countries"("country_id");


ALTER TABLE "Temperature" ADD CONSTRAINT "Temperature_fk0" FOREIGN KEY ("city_id") REFERENCES "Cities"("city_id");

ALTER TABLE "Countries" ADD CONSTRAINT "Countries_fk0" FOREIGN KEY ("continent_id") REFERENCES "Continents"("continent_id");
