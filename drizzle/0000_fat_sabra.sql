CREATE TABLE `pci_audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_email` text NOT NULL,
	`action` text NOT NULL,
	`object_id` text NOT NULL,
	`event_hash` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pci_control_checks` (
	`id` text PRIMARY KEY NOT NULL,
	`control_ref` text NOT NULL,
	`source` text NOT NULL,
	`result` text NOT NULL,
	`detail` text NOT NULL,
	`checked_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pci_evidence_items` (
	`id` text PRIMARY KEY NOT NULL,
	`object_key` text NOT NULL,
	`filename` text NOT NULL,
	`content_type` text NOT NULL,
	`size` integer NOT NULL,
	`control_ref` text NOT NULL,
	`owner_email` text NOT NULL,
	`sha256` text NOT NULL,
	`status` text DEFAULT 'Pending review' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
