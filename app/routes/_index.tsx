import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import i18next from "~/i18n/i18n.server";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectCounterValue } from "~/store/counter/selectors";
import { increment } from "~/store/counter/slice";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let t = await i18next.getFixedT(request);
  let title = t("HomePage.title");
  return json({ title });
}

const Header = styled.h1<{
  $isError?: boolean;
}>`
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.primary : theme.colors.secondary};
`;

export default function Index() {
  const { t } = useTranslation();
  const { title } = useLoaderData<typeof loader>();
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCounterValue);
  const isError = count > 15;

  return (
    <div>
      <Header $isError={isError}>{t("HomePage.title")}</Header>
      <div>Count {count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <ul>
        <li>
          <Link to="/error">Error</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>
    </div>
  );
}
