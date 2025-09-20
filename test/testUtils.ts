import { mockReactiveMenuState } from "./mocks";
import { vi } from "vitest";

export type changeMenuStateType = ReturnType<
  typeof mockMenuState
>["changeMenuState"];

export function mockMenuState() {
  const mockState = vi.fn(() => ({ value: mockReactiveMenuState }));

  function changeMenuState(
    props: {
      newState?: Partial<reactiveMenuState>;
      newTemplateData?: Partial<templateData>;
    },
    depthLevel: number = 1
  ) {
    const { newState, newTemplateData } = props;

    const _newFullState = {
      value: {
        ...mockReactiveMenuState,
        ...newState,
        templateData: {
          ...mockReactiveMenuState.templateData,
          ...newTemplateData,
        },
      },
    };
    for (let i = 0; i < depthLevel; i++) {
      mockState.mockImplementationOnce(() => _newFullState);
    }

    return _newFullState.value;
  }

  return { mockState, changeMenuState };
}

export function getMockClone<T>(mock: T, newProperties?: Partial<T>) {
  let newMock = structuredClone(mock);
  if (newProperties !== undefined) newMock = { ...newMock, ...newProperties };
  return newMock;
}
