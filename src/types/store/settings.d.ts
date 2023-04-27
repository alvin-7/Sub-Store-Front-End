type SettingsStoreState = SettingsBase & SettingsPostData;

interface SettingsBase {
  syncTime: number;
  avatarUrl: string;
  artifactStore: string;
}

interface SettingsPostData {
  password?: string;
  hasfetch?: boolean;
  auth?: boolean;
  gistToken?: string;
  githubUser?: string;
  theme?: {
    auto: boolean;
    name?: CustomTheme;
    dark: CustomTheme;
    light: CustomTheme;
  };
}

type CustomTheme = 'light' | 'dark';
