CREATE TABLE IF NOT EXISTS "user_customer" (
	"id" serial NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"account" boolean,
	"name" varchar(25) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "workout_type" (
	"id" serial NOT NULL UNIQUE,
	"category" varchar(9) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "exersise" (
	"id" serial NOT NULL UNIQUE,
	"workout_type_id" bigint NOT NULL,
	"workout" varchar(20) NOT NULL UNIQUE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_worksouts" (
	"id" serial NOT NULL UNIQUE,
	"exercise_id" bigint NOT NULL,
	"sets" bigint NOT NULL,
	"reps" bigint NOT NULL,
	"weight" bigint NOT NULL,
	"duration" bigint NOT NULL,
	"user_customer_id" bigint NOT NULL,
	"date" date NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "federated_credentials" (
	"subject" serial NOT NULL UNIQUE,
	"user_customer_id" bigint NOT NULL,
	"provider" varchar(255) NOT NULL,
	PRIMARY KEY ("subject")
);

CREATE TABLE IF NOT EXISTS "session" (
	"sid" varchar(255) NOT NULL UNIQUE,
	"sess" jsonb NOT NULL,
	"expire" timestamp with time zone NOT NULL,
	PRIMARY KEY ("sid")
);

CREATE TABLE IF NOT EXISTS "checkout" (
	"id" serial NOT NULL UNIQUE,
	"payment_method" bigint NOT NULL,
	"amount" double precision NOT NULL,
	"checkout_date" date NOT NULL,
	"checkout_status" varchar(4) NOT NULL,
	"customer_user_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);



ALTER TABLE "excersise" ADD CONSTRAINT "excersise_fk1" FOREIGN KEY ("workout_type_id") REFERENCES "workout_type"("id");
ALTER TABLE "user_worksouts" ADD CONSTRAINT "user_worksouts_fk1" FOREIGN KEY ("exercise_id") REFERENCES "excersise"("id");

ALTER TABLE "user_worksouts" ADD CONSTRAINT "user_worksouts_fk6" FOREIGN KEY ("user_customer_id") REFERENCES "user_customer"("id");
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_fk1" FOREIGN KEY ("user_customer_id") REFERENCES "user_customer"("id");

ALTER TABLE "checkout" ADD CONSTRAINT "checkout_fk5" FOREIGN KEY ("customer_user_id") REFERENCES "user_customer"("id");

INSERT INTO workout_type (category)
VALUES ('Back'), ('Legs'), ('Shoulders'), ('Chest'), ('Core');

INSERT INTO excersise (workout_type_id, workout)
VALUES (1, 'Lat Pulldown'), (1, 'Row'), 
(2, 'Squat'), (2, 'Deadlift'), 
(3, 'Shoulder Press'), (3, 'Lateral Raise'),
(4, 'Bench Press'), (4, 'Fly'),
(5, 'Situp'),(5, 'Crunches');