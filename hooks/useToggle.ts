import { SetStateAction, useState } from "react";

/**
 * Boolean 형태의 state와 해당 state를 toggle하는 toggle함수를 반환하는 custom hook
 * @param initialValue 상태 초기값
 * @returns [state, toggleState, setState] : state와 state를 toggle하는 함수 및 setState 함수 반환
 */
function useToggle(
  initialValue: boolean,
): [boolean, () => void, React.Dispatch<SetStateAction<boolean>>] {
  const [state, setState] = useState(initialValue);

  const toggleState = () => setState((prevState) => !prevState);

  return [state, toggleState, setState];
}

export default useToggle;
