type SettingsStoreState = SettingsBase & SettingsPostData;

interface SettingsBase {
  syncTime: number;
  avatarUrl: string;
  artifactStore: string;
}

interface SettingsPostData {
  auth?: string;
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
