import { useContext, useState, ChangeEvent } from "react";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";

import "./Settings.css";
import {
  setSettingsInStorage,
  SettingsProps,
} from "../../utils/sessionStorage";
import SettingsClientContext from "../../store/SettingsClient/SettingsClientContext";
import { Actions } from "../../store/SettingsClient/settingsClientPropsReducer";
import { useApi } from "../../Api/useApi";

export const Settings = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<SettingsProps>({
    bucket: "",
    secretAccessKey: "",
    accessKeyId: "",
  });
  const { verifyBucket } = useApi();
  const { settingsClientDispatch } = useContext(SettingsClientContext);

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    setError("");

    try {
      const client = await verifyBucket(data);

      setSettingsInStorage(data);
      settingsClientDispatch({
        type: Actions.AddClient,
        payload: {
          client,
          bucket: data.bucket,
        },
      });
    } catch (error) {
      setError("there was a problem with your settings. Please try again");
    }
  };

  return (
    <div className="settings" data-testid="settings-form">
      <div className="settings__form" >
        <h3 className="settings__title">Provide your settings</h3>
        <Input
          data-testid="secretAccessKeyInput"
          required
          name="secretAccessKey"
          placeholder="Secret Access Key"
          onChange={updateData}
        />
        <Input
          data-testid="accessKeyIdInput"
          required
          name="accessKeyId"
          placeholder="Access Key Id"
          onChange={updateData}
        />
        <Input
          data-testid="bucketInput"
          required
          name="bucket"
          placeholder="Bucket"
          onChange={updateData}
        />
        <Button data-testid="settingsSubmitButton" onClick={submit}>Submit</Button>
      </div>
      {error && <div className="settings__error">{error}</div>}
    </div>
  );
};
