export const truncatedString = (origString: string, maxLength: number) => {
  if (origString.length <= maxLength) return origString;
  return origString.substring(0, maxLength) + "...";
};

export const truncatedStrings = (origString: string, maxLength: number) => {
  const words = origString.split(" ");
  let returnString = "";
  words.map((word) => {
    const trancatedString = truncatedString(word, maxLength);
    returnString += trancatedString + " ";
  });
  return returnString;
};

export const formatFloat = (num: number, power: number) => {
  if (typeof num !== "number") {
    console.error('"num" is not a number');
    return -1;
  }
  return parseFloat(num.toFixed(power));
};

export const formatNumberToPrice = (num: number): string => {
  if (typeof num !== "number") return "$0.00";
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

/**
 * Format and object to be converted to a url string
 * @param objListToString
 * @returns
 */
export const formatObjectListToUrlParams = (
  objListToString: { key: string, value: string }[] | null
) => {
  if (!objListToString) return "";
  let returnString = "";
  objListToString.map((obj) => {
    returnString +=
    obj.key + "=" + obj.value + "&";
  });
  return returnString;
};


export const formatUTCDateToLocal = (UTCDate: string) => {
  const date = new Date(UTCDate);
  // Request a weekday along with a long date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-US", options);
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type StorageType = string;
/**
 * Save an ambiguous item to local storage
 * @param type key for the storage
 * @param item object of any type
 */
export const saveToLocalStorage = async (type: StorageType, item: unknown) => {
  let itemsString = await localStorage.getItem(type);
  if (!itemsString) itemsString = "[]";
  const items = JSON.parse(itemsString);
  items.push(item);
  localStorage.setItem(type, JSON.stringify(items));
};

/**
 * Remove an ambiguous item from local storage
 * @param type key for the storage
 * @param item object of any type
 */
export const removeFromLocalStorage = (type: StorageType, item: unknown) => {
  const itemsString = localStorage.getItem(type);
  if (!itemsString) return;
  const items = JSON.parse(itemsString);
  const newItems: unknown[] = [];
  items.map((i: unknown) => {
    if (i !== item) newItems.push(i);
  });
  localStorage.setItem(type, JSON.stringify(newItems));
};

/**
 * Get an ambiguous item from local storage
 * @param type key for the storage
 * @param item object of any type
 */
export const getFromLocalStorage = (
  type: StorageType,
  item: unknown
): unknown => {
  const itemsString = localStorage.getItem(type);
  if (!itemsString) return null;
  const items = JSON.parse(itemsString);
  const returnItem = items.filter((i: unknown) => i === item)[0];
  return returnItem ? returnItem : null;
};
