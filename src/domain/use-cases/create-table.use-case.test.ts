import { options } from "yargs";
import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 3 });
    const rows = table.split("\n").length;

    //console.log(table);

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 10 = 30");
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = {
      base: 5,
      limit: 20,
    };

    const createTable = new CreateTable();
    const table = createTable.execute(options);
    const rows = table.split("\n").length;

    //console.log(table);

    expect(table).toContain("5 x 1 = 5");
    expect(table).toContain("5 x 10 = 50");
    expect(table).toContain("5 x 20 = 100");
    expect(rows).toBe(options.limit);
  });
});
