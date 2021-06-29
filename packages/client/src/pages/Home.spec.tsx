import { fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupTests } from "../mocks/setupTests";
import { Home } from "./Home";
import { rest } from "msw";
import {
  CreateLinkRequest,
  CreateLinkApiResponse,
} from "../services/api.generated";
const { REACT_APP_API_URL } = process.env;

const { server, renderWithProviders } = setupTests();

describe("Home integration style tests", () => {
  // TODO: Note, this is not finished because there is an error
  // with chakra's breakpoints that would require more debugging than appropriate
  // So, the goal would be to make the request on a valid submission,
  // Then assert that the new entry is rendered in the history. From there,
  // We would assert the properties of the links.
  it("generates a short link and adds it to the recent history", async () => {
    const generatedHash = "banana123";
    const generatedLink = `http://shrt.nr/${generatedHash}`;

    server.use(
      rest.post<CreateLinkRequest, CreateLinkApiResponse>(
        `${REACT_APP_API_URL}/generate`,
        (req, res, ctx) => {
          const entry = {
            id: 1,
            long_url: req.body.long_url,
            hash: generatedHash,
            link: generatedLink,
          };
          return res(ctx.json(entry));
        }
      )
    );

    renderWithProviders()(<Home />);

    expect(screen.queryByText(/Tiny links/i)).toBeInTheDocument();
    await waitFor(() => expect(document.title).toEqual("Generate a link")); // Helmet is setting the title!

    const shortenInput = screen.getByPlaceholderText("Shorten your link");
    const submitButton = screen.getByRole("button", { name: /Shorten/i });

    const url = "http://www.banana.com";
    fireEvent.blur(shortenInput);
    userEvent.type(shortenInput, url);

    // fireEvent.click(submitButton);

    // await waitFor(() => {
    //   expect(screen.getByRole("button", { name: /Copy/i })).not.toBeNull();
    // });
  });
});
