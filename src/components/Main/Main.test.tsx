import { SettingsClientProvider } from "../../store/SettingsClient/SettingsClientProvider";
import { render, screen, waitFor } from "@testing-library/react";
import { Main } from "./Main";
import * as sessionStorageMock from "../../utils/sessionStorage";
import userEvent from "@testing-library/user-event";

jest.mock("../FileBrowser/FileBrowser", () => ({
  FileBrowser: () => {
    return null;
  },
}));

jest.mock("../../utils/sessionStorage");

jest.mock("../../Api/useApi", () => ({
  useApi: () => ({
    verifyBucket: jest.fn().mockResolvedValue({}),
  }),
}));

describe("Main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Wrapper = () => (
    <SettingsClientProvider>
      <Main />
    </SettingsClientProvider>
  );

  it("should display settings for if no settings are stored", () => {
    render(<Wrapper />);

    waitFor(() => {
      expect(screen.getByTestId("settings-form")).toBeVisible();
    });
  });

  it("should display file browser if settings are stored", () => {
    jest.spyOn(sessionStorageMock, "getSettingsFromStorage").mockReturnValue({
      bucket: "bucket123",
      accessKeyId: "accessKeyId123",
      secretAccessKey: "secretAccessKey123",
    });
    render(<Wrapper />);

    waitFor(() => {
      expect(screen.getByTestId("file-browser")).toBeVisible();
    });
  });

  it("should display file browser after successful credentials sumption", () => {
    render(<Wrapper />);

    userEvent.type(
      screen.getByTestId("secretAccessKeyInput"),
      "secretAccessKey123"
    );
    userEvent.type(screen.getByTestId("accessKeyIdInput"), "accessKeyId123");
    userEvent.type(screen.getByTestId("bucketInput"), "bucket123");
    userEvent.click(screen.getByTestId("settingsSubmitButton"));

    waitFor(() => {
      expect(screen.getByTestId("file-browser")).toBeVisible();
    });
  });
});
