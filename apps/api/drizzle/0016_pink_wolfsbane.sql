ALTER TABLE "system_settings" ALTER COLUMN "warning_threshold_sec" SET DEFAULT 300;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "warning_threshold_sec" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "critical_threshold_sec" SET DEFAULT 900;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "critical_threshold_sec" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "alert_cooldown_sec" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "heartbeat_grace_multiplier" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "email_alerts_enabled" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "system_settings" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "resolved_at" timestamp;--> statement-breakpoint
ALTER TABLE "system_settings" ADD COLUMN "created_at" timestamp DEFAULT now();