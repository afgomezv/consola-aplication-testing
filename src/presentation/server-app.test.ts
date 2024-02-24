import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: "test-fileName",
    fileDestination: "test-destination",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run Server App with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File created!");
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });

    expect(logMock).toHaveBeenCalledWith("File created!");
  });
});
