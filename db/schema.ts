import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const evidenceItems = sqliteTable("pci_evidence_items", {
  id: text("id").primaryKey(), objectKey: text("object_key").notNull(), filename: text("filename").notNull(),
  contentType: text("content_type").notNull(), size: integer("size").notNull(), controlRef: text("control_ref").notNull(),
  ownerEmail: text("owner_email").notNull(), sha256: text("sha256").notNull(), status: text("status").notNull().default("Pending review"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const controlChecks = sqliteTable("pci_control_checks", {
  id: text("id").primaryKey(), controlRef: text("control_ref").notNull(), source: text("source").notNull(),
  result: text("result").notNull(), detail: text("detail").notNull(), checkedAt: text("checked_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const auditEvents = sqliteTable("pci_audit_events", {
  id: text("id").primaryKey(), actorEmail: text("actor_email").notNull(), action: text("action").notNull(),
  objectId: text("object_id").notNull(), eventHash: text("event_hash").notNull(), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
