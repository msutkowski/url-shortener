import { fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupTests } from "../mocks/setupTests";
import { UrlGeneratorForm } from "./UrlGeneratorForm";

const { renderWithProviders } = setupTests();

describe("UrlGeneratorForm", () => {
  let shortenInput: HTMLElement;
  let submitButton: HTMLElement;

  const handleSubmit = jest.fn();

  beforeEach(() => {
    renderWithProviders()(<UrlGeneratorForm onSubmit={handleSubmit} />);

    shortenInput = screen.getByPlaceholderText("Shorten your link");
    submitButton = screen.getByRole("button", { name: /Shorten/i });
  });

  afterEach(() => {
    handleSubmit.mockClear();
  });

  it("renders elements needed to shorten links", () => {
    expect(shortenInput).toBeInTheDocument();
    expect(shortenInput).not.toHaveAttribute("disabled");
    expect(shortenInput).not.toHaveValue();

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  it("shows an error alert when clicking Shorten without inputting a url", async () => {
    fireEvent.blur(shortenInput);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a url/i)).toBeInTheDocument();
    });

    // Our handler shouldn't get called when it's invalid
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows an error alert when clicking Shorten with an invalid url", async () => {
    fireEvent.blur(shortenInput);
    userEvent.type(shortenInput, "sobad.ftp$");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a url/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("does not show an alert when clicking Shorten with an valid url", async () => {
    const url = "http://www.banana.com";
    fireEvent.blur(shortenInput);
    userEvent.type(shortenInput, url);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit.mock.calls[0][0]).toEqual({ url }); // This is the same as `toHaveBeenCalledWith`, which isn't behaving as expected
      expect(screen.queryByText(/Please enter a url/i)).toBeNull();
    });
  });

  it("shows an alert when an invalid submission occurs, then disappears after a valid submission", async () => {
    fireEvent.blur(shortenInput);
    userEvent.type(shortenInput, "sobad.ftp$");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a url/i)).toBeInTheDocument();
    });

    userEvent.clear(shortenInput);

    const url = "http://www.banana.com";
    fireEvent.blur(shortenInput);
    userEvent.type(shortenInput, url);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit.mock.calls[0][0]).toEqual({ url }); // This is the same as `toHaveBeenCalledWith`, which isn't behaving as expected
      expect(screen.queryByText(/Please enter a url/i)).toBeNull();
    });
  });
});
