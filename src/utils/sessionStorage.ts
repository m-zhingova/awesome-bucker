export interface SettingsProps {
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export const getSettingsFromStorage = (): SettingsProps | undefined => {
  const settings = sessionStorage.getItem("settings");

  if (settings) {
    return JSON.parse(settings);
  }

  return;
};

export const setSettingsInStorage = (setting: SettingsProps) => {
  sessionStorage.setItem("settings", JSON.stringify(setting));
};
