ALTER TABLE "alerts" ADD COLUMN "acknowledged_at" timestamp;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "severity" varchar(10) DEFAULT 'MEDIUM';