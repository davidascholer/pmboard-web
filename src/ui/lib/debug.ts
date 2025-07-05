export const debug = (key: string, value: string) => {
    const mode = import.meta.env.MODE;
    if (mode === "development") {
      console.debug(key, value);
    }
  };
  
  export const logEnvVars = () => {
    for (const key in import.meta.env) {
      if (Object.hasOwnProperty.call(import.meta.env, key)) {
        console.log(`${key}: ${import.meta.env[key]}`);
      }
    }
  };
  