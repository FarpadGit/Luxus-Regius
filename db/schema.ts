import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const MenuTable = sqliteTable("Menus", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().unique().notNull(),
  menuJSON: text().notNull(),
});
