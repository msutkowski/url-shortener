import React from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { mockServer } from "./mockServer";
import { ChakraProvider } from "../theme/Provider";
import { Router } from "react-router";
import { createMemoryHistory, MemoryHistory } from "history";
import { api } from "../services/api";

interface RenderProviderOptions {
  history?: MemoryHistory<any>;
}

export function setupTests() {
  let defaultHistory = createMemoryHistory();

  const { server } = mockServer();

  beforeAll(() => {
    server.listen();
    defaultHistory = createMemoryHistory();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  function renderWithProviders(options?: RenderProviderOptions) {
    const { history } = Object.assign({ history: defaultHistory }, options);
    return function (
      children: React.ReactNode,
      options?:
        | Pick<
            RenderOptions<typeof queries>,
            "container" | "baseElement" | "hydrate" | "wrapper"
          >
        | undefined
    ) {
      return render(
        <ApiProvider api={api}>
          <ChakraProvider>
            <Router history={history}>{children}</Router>
          </ChakraProvider>
        </ApiProvider>,
        options
      );
    };
  }

  return {
    history: defaultHistory,
    server,
    renderWithProviders,
  };
}
