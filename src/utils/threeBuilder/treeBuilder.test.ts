import { createTree } from "./treeBuilder";

describe("createTree", () => {
  it("createTree returns only root node if no paths are provided", () => {
    const result = createTree([]);

    expect(result.get("root").children.size).toEqual(0);
  });

  it("createTree should not create new nodes if a node of a path already exists", () => {
    const result = createTree(["directory/file1.txt", "directory/file2.text"]);

    expect(result.get("root").children.size).toEqual(1);
    expect(result.get("root").children.get("directory").children.size).toEqual(
      2
    );
  });

  it("createTree create node objects with name, type, path, and children properties", () => {
    const result = createTree(["directory", "file.txt"]);

    const children = result.get("root").children;

    expect(children.get("directory")).toEqual({
      children: new Map(),
      name: "directory",
      path: "directory",
      type: "directory",
    });
    expect(children.get("file.txt")).toEqual({
      children: new Map(),
      name: "file.txt",
      path: "file.txt",
      type: "file",
    });
  });

  it("createTree should create new node if the node does not exist", () => {
    const result = createTree([
      "directory/subdirectory",
      "directory/subdirectory2",
    ]);

    const children = result.get("root")!.children;

    expect(children.get("directory")!.children.size).toEqual(2);
  });
});
