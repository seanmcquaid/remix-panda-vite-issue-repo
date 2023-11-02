import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { styled } from "styled-system/jsx";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectCounterValue } from "~/store/counter/selectors";
import { increment } from "~/store/counter/slice";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const Header = styled("h1", {
  base: {
    color: "secondary",
    backgroundColor: "primary",
  },
  variants: {
    isError: {
      true: {
        color: "primary",
      },
    },
    variant: {
      error: {
        color: "primary",
        backgroundColor: "secondary",
      },
    },
  },
});

export default function Index() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCounterValue);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header variant="error" isError>
        {t("HomePage.title")}
      </Header>
      <div>Count {count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
