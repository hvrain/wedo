import { ChangeEvent } from "react";

export default function SelectWeekDays({
  onChangeWeekDays,
}: {
  onChangeWeekDays: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-[24px] flex-row">
      <p className="mb-[14px]">반복 요일</p>
      <div className="flex justify-between">
        <input
          className="peer/sun peer hidden"
          type="checkbox"
          name="weekDays"
          id="일"
          value="0"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/sun:bg-button-default peer-checked/sun:font-medium peer-checked/sun:text-default-light"
          htmlFor="일"
        >
          일
        </label>
        <input
          className="peer/mon peer hidden"
          type="checkbox"
          name="weekDays"
          id="월"
          value="1"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/mon:bg-button-default peer-checked/mon:font-medium peer-checked/mon:text-default-light"
          htmlFor="월"
        >
          월
        </label>
        <input
          className="peer/tue peer hidden"
          type="checkbox"
          name="weekDays"
          id="화"
          value="2"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/tue:bg-button-default peer-checked/tue:font-medium peer-checked/tue:text-default-light"
          htmlFor="화"
        >
          화
        </label>
        <input
          className="peer/wed peer hidden"
          type="checkbox"
          name="weekDays"
          id="수"
          value="3"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/wed:bg-button-default peer-checked/wed:font-medium peer-checked/wed:text-default-light"
          htmlFor="수"
        >
          수
        </label>
        <input
          className="peer/thu peer hidden"
          type="checkbox"
          name="weekDays"
          id="목"
          value="4"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/thu:bg-button-default peer-checked/thu:font-medium peer-checked/thu:text-default-light"
          htmlFor="목"
        >
          목
        </label>
        <input
          className="peer/fri peer hidden"
          type="checkbox"
          name="weekDays"
          id="금"
          value="5"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/fri:bg-button-default peer-checked/fri:font-medium peer-checked/fri:text-default-light"
          htmlFor="금"
        >
          금
        </label>
        <input
          className="peer/sat peer hidden"
          type="checkbox"
          name="weekDays"
          id="토"
          value="6"
          onChange={onChangeWeekDays}
        />
        <label
          className="block flex h-[48px] w-[44px] items-center justify-center rounded-xl bg-input-default text-placeHolder peer-checked/sat:bg-button-default peer-checked/sat:font-medium peer-checked/sat:text-default-light"
          htmlFor="토"
        >
          토
        </label>
      </div>
    </div>
  );
}
