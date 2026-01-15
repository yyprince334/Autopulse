CREATE TABLE "system" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"decription" varchar(500) NOT NULL,
	"heartbeat_Interval" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
