ALTER TABLE "alerts" ALTER COLUMN "severity" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "severity" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "severity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "started_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "ended_at" timestamp;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "acknowledged_by" uuid;