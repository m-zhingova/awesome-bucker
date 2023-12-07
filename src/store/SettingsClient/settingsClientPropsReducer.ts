import { S3Client } from "@aws-sdk/client-s3/dist-types/S3Client";

export enum Actions {
  AddClient = "ADD_CLIENT",
  RemoveClient = "REMOVE_CLIENT",
}

export interface SettingsClientProps {
  client: S3Client | null;
  bucket: string;
}

export const initialState = {
  client: null,
  bucket: "",
};

export interface ActionProps {
  type: Actions;
  payload?: SettingsClientProps;
}

export const settingsClientReducer = (
  state: SettingsClientProps,
  action: ActionProps
): SettingsClientProps => {
  switch (action.type) {
    case Actions.AddClient: {
      const { client, bucket } = action.payload as SettingsClientProps;

      return { ...state, client, bucket };
    }
    case Actions.RemoveClient: {
      return { ...state, client: null, bucket: "" };
    }
    default:
      return state;
  }
};
