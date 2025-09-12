import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { isHeading } from "~/utils/typeChecks";
import { MenuTable } from "~~/db/schema";
import { getByName } from "./originalMenus";

function connectToDB() {
  // return drizzle("file:./db/MenuDB.db");
  const { tursoDatabaseUrl, tursoAuthToken } = useRuntimeConfig();
  const turso = createClient({
    url: tursoDatabaseUrl!,
    authToken: tursoAuthToken!,
  });

  const db = drizzle(turso);
  return db;
}

export function addMenuProperties(list: any[]) {
  if (list.length === 0) return [];
  const transformedData = list.map((i) => ({ ...i, editMode: false }));

  transformedData.forEach((i) => {
    if (isHeading(i)) i.children = addMenuProperties(i.children);
  });

  return transformedData;
}

export async function getMenuFromDB(name: string) {
  const db = connectToDB();
  const [dbData] = await db
    .select({ menuJSON: MenuTable.menuJSON })
    .from(MenuTable)
    .where(eq(MenuTable.name, name));

  if (dbData === undefined) return getByName("Empty");

  return JSON.parse(dbData.menuJSON);
}

export async function saveMenuToDB(name: string, content: string) {
  const db = connectToDB();
  await db
    .insert(MenuTable)
    .values({ name, menuJSON: content })
    .onConflictDoUpdate({ target: MenuTable.name, set: { menuJSON: content } });
}

export async function resetMenuInDB(name: string) {
  const db = connectToDB();
  const originalMenu = getByName(name);

  if (originalMenu == null) return null;

  const [result] = await db
    .insert(MenuTable)
    .values({ name, menuJSON: JSON.stringify(originalMenu) })
    .onConflictDoUpdate({
      target: MenuTable.name,
      set: { menuJSON: JSON.stringify(originalMenu) },
    })
    .returning({ menuJSON: MenuTable.menuJSON });

  return JSON.parse(result.menuJSON);
}
