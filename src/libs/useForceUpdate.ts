import { useCallback, useState } from "react";

export default function () {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}
