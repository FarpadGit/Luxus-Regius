export const mockCategory: categoryType = {
  id: "MockCategoryID",
  text: "MockCategoryText",
  level: 0,
  isRightColumn: false,
  editMode: false,
  parent: null,
  children: [],
};

export const mockMenuItem: itemType = {
  id: "MockItemID",
  text: "MockItemText",
  price: "MockPrice",
  subtext: "MockSubtext",
  imageUrl: "",
  disabled: false,
  editMode: false,
  parent: mockCategory,
};

export const mockMenu: categoryType[] = [
  {
    id: "MockCategoryID1",
    text: "MockCategoryText1",
    level: 0,
    isRightColumn: false,
    editMode: false,
    parent: null,
    children: [
      {
        id: "MockCategoryID2",
        text: "MockCategoryText2",
        level: 1,
        isRightColumn: false,
        editMode: false,
        parent: null,
        children: [
          {
            id: "MockItemID1",
            text: "MockItemText1",
            price: "MockPrice1",
            subtext: "MockSubtext1",
            imageUrl: "",
            disabled: false,
            editMode: false,
            parent: mockCategory,
          },
          {
            id: "MockItemID2",
            text: "MockItemText2",
            price: "MockPrice2",
            subtext: "MockSubtext2",
            imageUrl: "",
            disabled: false,
            editMode: false,
            parent: mockCategory,
          },
          {
            id: "MockItemID3",
            text: "MockItemText3",
            price: "MockPrice3",
            subtext: "MockSubtext3",
            imageUrl: "",
            disabled: false,
            editMode: false,
            parent: mockCategory,
          },
          {
            id: "MockItemID4",
            text: "MockItemText4",
            price: "MockPrice4",
            subtext: "MockSubtext4",
            imageUrl: "",
            disabled: false,
            editMode: false,
            parent: mockCategory,
          },
          {
            id: "MockItemID5",
            text: "MockItemText5",
            price: "MockPrice5",
            subtext: "MockSubtext5",
            imageUrl: "",
            disabled: false,
            editMode: false,
            parent: mockCategory,
          },
        ],
      },
    ],
  },
];

export const mockMenuParentless: Omit<categoryType, "parent">[] = mockMenu.map(
  (m) => {
    const temp: any = { ...m };
    delete temp.parent;
    return temp;
  }
);

export const mockCategoryWithSubs: categoryType = mockMenu[0];
export const mockCategoryWithItems: categoryType = mockMenu[0]
  .children[0] as categoryType;

export const mockTemplateData: templateData = {
  name: "A",
  legend: {
    show: false,
    text: "",
  },
};

export const mockReactiveMenuState: reactiveMenuState = {
  menuItems: [],
  templateData: mockTemplateData,
  isMenuEditable: true,
  selectedItem: false,
  draggedItem: false,
};

export const mockReactiveMenu = {
  props: {
    menu: Array,
    templateData: Object,
    readOnly: {
      type: Boolean,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["onSave", "onReset"],
  template: "<div id='mockReactiveMenu'></div>",
};
