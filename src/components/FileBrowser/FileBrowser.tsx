import { useContext, useEffect, useState } from "react";
import { ContentPanel } from "./ContentPanel/ContentPanel";
import { NavigationPanel } from "./NavigationPanel/NavigationPanel";
import { createTree } from "../../utils/threeBuilder/treeBuilder";
import { Actions } from "../../store/ResourcesTree/TreeReducer/treeReducer";
import TreeContext from "../../store/ResourcesTree/TreeContext";
import { useApi } from "../../Api/useApi";

import "./FileBrowser.css";

export const FileBrowser = () => {
  const [error, setError] = useState("");
  const { treeDispatch } = useContext(TreeContext);
  const { getAllResources } = useApi();
  useEffect(() => {
    setError("");

    getAllResources().then(
      (response) => {
        const constructedTree = createTree(response.map((r) => r.Key!));
        treeDispatch({
          type: Actions.InitializeTree,
          payload: { tree: constructedTree },
        });
      },
      () => {
        setError("Something went wrong. Please refresh.");
      }
    );
  }, []);

  return (
    <div className="file-panel" data-testid="file-panel">
      {error && <div>{error}</div>}
      <NavigationPanel className="file-panel__navigation" />
      <ContentPanel className="file-panel__content" />
    </div>
  );
};
