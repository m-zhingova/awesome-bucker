import { useContext } from "react";
import SettingsClientContext from "../store/SettingsClient/SettingsClientContext";
import {
  deleteObject,
  getAllObjects,
  putObject,
  verifyBucket as verify,
} from "./objectApi";
import { SettingsProps } from "../utils/sessionStorage";

export const useApi = () => {
  const { client, bucket } = useContext(SettingsClientContext);


  const getAllResources = async () => {
    return await getAllObjects(client!, bucket);
  };

  const addResource = async (key: string, body?: string) => {
    return await putObject(client!, bucket, key, body);
  };

  const deleteResource = async (key: string) => {
    return await deleteObject(client!, bucket, key);
  };

  const verifyBucket = async (data: SettingsProps) => {
    return await verify(data);
  };

  return {
    verifyBucket,
    getAllResources,
    addResource,
    deleteResource,
  };
};
