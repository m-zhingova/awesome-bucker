import { useContext, useEffect, useState } from "react";
import SettingsClientContext from "../../store/SettingsClient/SettingsClientContext";
import { Settings } from "../Settings/Settings";
import { Spinner } from "../shared/Spinner/Spinner";
import { getSettingsFromStorage } from "../../utils/sessionStorage";
import { Actions } from "../../store/SettingsClient/settingsClientPropsReducer";
import { useApi } from "../../Api/useApi";

import "./Main.css";
import { FileBrowser } from "../FileBrowser/FileBrowser";
import { TreeProvider } from "../../store/ResourcesTree/TreeProvider";

export const Main = () => {
  const [loading, setLoading] = useState(true);
  const { verifyBucket } = useApi();
  const { client, settingsClientDispatch } = useContext(SettingsClientContext);

  useEffect(() => {
    const credentials = getSettingsFromStorage();
    if (credentials) {
      verifyBucket(credentials)
        .then((responseClient) => {
          settingsClientDispatch({
            type: Actions.AddClient,
            payload: {
              client: responseClient,
              bucket: credentials.bucket,
            },
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="spinner" data-testid="spinner">
        <Spinner size={100} />
      </div>
    );
  }

  return client ? (
    <TreeProvider>
      <FileBrowser />
    </TreeProvider>
  ) : (
    <Settings />
  );
};
