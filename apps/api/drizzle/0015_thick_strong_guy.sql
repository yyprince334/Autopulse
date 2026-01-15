CREATE TABLE "system_settings" (
	"system_id" uuid PRIMARY KEY NOT NULL,
	"warning_threshold_sec" integer DEFAULT 60 NOT NULL,
	"critical_threshold_sec" integer DEFAULT 300 NOT NULL,
	"alert_cooldown_sec" integer DEFAULT 600 NOT NULL,
	"heartbeat_grace_multiplier" integer DEFAULT 2 NOT NULL,
	"email_alerts_enabled" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "alerts" DROP COLUMN "started_at";--> statement-breakpoint
ALTER TABLE "alerts" DROP COLUMN "ended_at";