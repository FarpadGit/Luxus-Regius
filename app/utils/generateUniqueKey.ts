import { hasMenuItems } from "./typeChecks";

// generate ID not present in list of items
export default function generateUniqueKey(list: categoryType[] | itemType[]) {
  const newKey = crypto.randomUUID();
  if (hasSameKey(list, newKey)) return generateUniqueKey(list);
  return newKey;
}

function hasSameKey(list: categoryType[] | itemType[], key: string): boolean {
  if (list.length === 0) return false;
  if (list.some((i) => i.id === key)) return true;
  if (hasMenuItems(list)) return false;
  return list.some((i) => hasSameKey(i.children, key));
}
