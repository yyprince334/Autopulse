CREATE TABLE "heartbeats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_id" uuid NOT NULL,
	"recieved_at" timestamp DEFAULT now()
);
