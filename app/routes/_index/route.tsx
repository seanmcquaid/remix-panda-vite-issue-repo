import {
    json,
    type LoaderFunctionArgs,
    type MetaFunction,
  } from "@remix-run/node";
  import { Link, useLoaderData } from "@remix-run/react";
  import { styled } from "styled-components";
  import getFixedAppT from "~/i18n/getFixedAppT";
  import { useAppDispatch, useAppSelector } from "~/store";
  import { selectCounterValue } from "~/store/counter/selectors";
  import { decrement, increment } from "~/store/counter/slice";
  
  export const meta: MetaFunction = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  
  export async function loader({ request }: LoaderFunctionArgs) {
    const { t } = await getFixedAppT(request);
    const title = t("HomePage.title");
    return json({ title });
  }
  
  const Header = styled.h1<{
    $isError?: boolean;
  }>`
    color: ${({ $isError, theme }) =>
      $isError ? theme.colors.primary : theme.colors.secondary};
  `;
  
  export default function Index() {
    const { title } = useLoaderData<typeof loader>();
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCounterValue);
    const isError = count > 15;
  
    return (
      <div>
        <Header $isError={isError}>{title}</Header>
        <div>Count {count}</div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
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
  