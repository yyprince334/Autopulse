CREATE TABLE "alerts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_id" uuid NOT NULL,
	"status" varchar(20) NOT NULL,
	"message" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
