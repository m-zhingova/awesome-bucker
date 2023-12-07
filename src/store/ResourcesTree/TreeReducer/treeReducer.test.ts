import { ChildType, TreeNode } from "../../../utils/threeBuilder/treeBuilder";
import { Actions, treeReducer } from "./treeReducer";

describe("treeReducer", () => {
  let initialTree;

  beforeEach(() => {
    initialTree = new Map<string, TreeNode>().set("root", {
      name: "root",
      path: "",
      type: ChildType.Directory,
      children: new Map().set("child", {
        name: "child",
        path: "child",
        type: ChildType.Directory,
        children: new Map(),
      }),
    });
  });

  it("ADD_NODE action adds a node to the existing tree and current node state", () => {
    const { tree, currentNode } = treeReducer(
      { tree: initialTree },
      { type: Actions.AddNode, payload: { nodePath: "/directory" } }
    );

    expect(currentNode.children.size).toEqual(2);
    expect(tree.get("root").children.size).toEqual(2);
  });

  it("REMOVE_NODE action removes a node from the tree and current state", () => {
    const { tree, currentNode } = treeReducer(
      { tree: initialTree },
      { type: Actions.RemoveNode, payload: { nodePath: "/child" } }
    );

    expect(currentNode.children.size).toEqual(0);
    expect(tree.get("root").children.size).toEqual(0);
  });

  it("UPDATE_CURRENT_NODE action updates the current node with the new one", () => {
    const { currentNode } = treeReducer(
      { tree: initialTree },
      {
        type: Actions.UpdateCurrentNode,
        payload: {
          currentNode: {
            name: "newNodeName",
            path: "newPath",
            type: ChildType.Directory,
            children: new Map(),
          },
        },
      }
    );

    expect(currentNode.name).toEqual("newNodeName");
  });

  it("INITIALIZE_TREE action sets the tree and sets the current node to be  the root", () => {
    const { tree, currentNode } = treeReducer(
      { tree: null, currentNode: null },
      { type: Actions.InitializeTree, payload: { tree: initialTree } }
    );

    expect(currentNode.name).toEqual("root");
    expect(tree.get("root").name).toEqual("root");
  });
});
