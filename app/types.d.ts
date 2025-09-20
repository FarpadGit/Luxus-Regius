type categoryType = {
  id: string;
  level: number;
  children: categoryType[] | itemType[];
  text: string;
  isRightColumn: boolean;
  highlightColor?: string;
  cardColor?: string;
  editMode: boolean;
  parent: categoryType | null;
};

type itemType = {
  id: string;
  text: string;
  price: string;
  subtext: string;
  imageUrl: string;
  extras?: {
    id: number;
    text: string;
    price: string;
  }[];
  highlightColor?: string;
  cardColor?: string;
  editMode: boolean;
  disabled: boolean;
  parent: categoryType;
};

type templateType = "A" | "B" | "C" | "D";

type templateData = {
  name: templateType;
  legend: {
    show: boolean;
    text: string;
  };
};

type reactiveMenuState = {
  menuItems: categoryType[];
  templateData: templateData;
  isMenuEditable: boolean;
  selectedItem: categoryType | itemType | false;
  draggedItem: categoryType | itemType | false;
};
