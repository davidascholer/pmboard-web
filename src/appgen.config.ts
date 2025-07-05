/*
A config file is a file that contains the configuration settings for the application.
Note: All routes must be configured in the @/router files.
*/
type ConfigType = {
  title: string;
  serverUrl: string;
  navigationType: "side" | "bottom" | "none";
  navigationItems: string[];
  toolbar: {
    menuItems: string[];
    filterItems: string[];
  };
};

const config: ConfigType = {
  title: "Met",
  serverUrl: "https://socketshock-server-b8acf64c3cfc.herokuapp.com",
  // serverUrl: "http://localhost:8000",
  navigationType: "side",
  navigationItems: ["Home", "Saved", "History"],
  toolbar: {
    menuItems: ["One", "Two", "Three", "Four", "Five"],
    filterItems: ["one", "two", "three", "four", "five"],
  },
};

export default config;
