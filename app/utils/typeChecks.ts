export const isHeading = (item: any): item is categoryType =>
  item && item.children !== undefined;

export const isMenuItem = (item: any): item is itemType =>
  item && item.children === undefined;

export const hasHeadings = (items: any[]): items is categoryType[] =>
  items.length > 0 && items.some((i) => isHeading(i));

export const hasMenuItems = (items: any[]): items is itemType[] =>
  items.length > 0 && items.some((i) => isMenuItem(i));
