ALTER TABLE "systems" ADD COLUMN "api_key_hash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "systems" ADD COLUMN "api_key_last_used_at" timestamp;