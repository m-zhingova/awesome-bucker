import { TreeNode, getPathType } from "../../../utils/threeBuilder/treeBuilder";

export enum Actions {
  AddNode = "ADD_NODE",
  RemoveNode = "REMOVE_NODE",
  InitializeTree = "INITIALIZE_TREE",
  UpdateCurrentNode = "UPDATE_CURRENT_NODE",
}

interface TreeStateProps {
  tree: Map<string, TreeNode>;
  currentNode?: TreeNode;
}

export const initialState = {
  tree: new Map(),
};

interface NodePath {
  nodePath: string;
}

export interface ActionProps {
  type: Actions;
  payload: Partial<TreeStateProps> | NodePath;
}

export const treeReducer = (
  state: TreeStateProps,
  action: ActionProps
): TreeStateProps => {
  switch (action.type) {
    case Actions.InitializeTree: {
      const { tree } = action.payload as Partial<TreeStateProps>;
      return {
        ...state,
        ...(tree
          ? {
              currentNode: tree.get("root"),
              tree,
            }
          : {}),
      };
    }

    case Actions.AddNode: {
      const { nodePath } = action.payload as NodePath;

      const newTree = new Map(state.tree);
      let newCurrentNode = state.currentNode;

      let node: TreeNode = newTree.get("root")!;

      const parts = nodePath.split("/").filter(Boolean);

      parts.forEach((part) => {
        if (!node.children.has(part)) {
          node.children.set(part, {
            path: nodePath,
            name: part,
            type: getPathType(part),
            children: new Map(),
          });
          newCurrentNode = node;
        }

        node = node.children.get(part)!;
      });

      return { ...state, tree: newTree, currentNode: newCurrentNode };
    }

    case Actions.RemoveNode: {
      const { nodePath } = action.payload as NodePath;

      const newTree = new Map(state.tree);

      let parentNode = newTree.get("root")!;

      const parts = nodePath.split("/").filter(Boolean);

      const partToDelete = parts.pop();
      if (partToDelete) {
        parts.forEach((part) => {
          parentNode = parentNode.children.get(part) || parentNode;
        });

        parentNode.children.delete(partToDelete);
      }

      return { ...state, tree: newTree, currentNode: parentNode };
    }
    case Actions.UpdateCurrentNode: {
      const { currentNode } = action.payload as Partial<TreeStateProps>;

      return { tree: state.tree, currentNode };
    }
    default:
      return state;
  }
};
