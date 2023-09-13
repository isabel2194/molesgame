import {renderHook} from "@testing-library/react";
import {useGlobalContext} from "../../contexts/global";

describe("useGlobalContext create", () => {
  test("check if the values are initialized", () => {
    const {result} = renderHook(() => useGlobalContext());
    expect(result.current.user).toBe(undefined);
    expect(result.current.logout).toBe(undefined);
  });
});
