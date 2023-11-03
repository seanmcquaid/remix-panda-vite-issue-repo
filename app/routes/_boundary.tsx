import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styled from "styled-components";

export default function Boundary() {
  return <Outlet />;
}

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Header>Error Boundary</Header>
        <div>{error.status}</div>
        <div>{error.statusText}</div>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Header>Error Boundary</Header>
    </div>
  );
}
