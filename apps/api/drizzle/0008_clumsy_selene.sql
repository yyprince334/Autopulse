CREATE TYPE "public"."system_status" AS ENUM('UP', 'DOWN');--> statement-breakpoint
CREATE TABLE "system_health_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_id" uuid NOT NULL,
	"window_start" timestamp NOT NULL,
	"window_end" timestamp NOT NULL,
	"uptime_seconds" integer NOT NULL,
	"downtime_seconds" integer NOT NULL,
	"incident_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_system_window" ON "system_health_snapshots" USING btree ("system_id","window_start","window_end");