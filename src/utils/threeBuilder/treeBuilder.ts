export enum ChildType {
  File = "file",
  Directory = "directory",
}

export interface TreeNode {
  path: string;
  name: string;
  type: ChildType;
  children: Map<string, TreeNode>;
}

export const getPathType = (value: string) =>
  value.includes(".txt") ? ChildType.File : ChildType.Directory;

export const createTree = (paths: string[]) => {
  let tree = new Map<string, TreeNode>().set("root", {
    name: "root",
    path: "",
    type: ChildType.Directory,
    children: new Map<string, TreeNode>(),
  });

  paths.forEach((path) => {
    const parts = path.split("/").filter(Boolean);
    let currentNode = tree.get("root")!.children;

    parts.forEach((part, index) => {
      const node = currentNode.get(part);

      if (!node) {
        currentNode.set(part, {
          path: parts.slice(0, index + 1).join("/"),
          name: part,
          type: getPathType(part),
          children: new Map(),
        });
        currentNode = currentNode.get(part)!.children;
      } else {
        currentNode = node.children;
      }
    });
  });

  return tree;
};
