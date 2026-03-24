import configProps from "./config-props";

let idIndex = -1;
export function generateUniqueId() {
  idIndex++;
  const id = `jwplayer-${idIndex}`;
  return id;
}

export function createPlayerLoadPromise(url) {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.onload = res;
    script.onerror = rej;
    script.src = url;

    document.body.append(script);
  });
}

const loadedLibraryPromises = new Map();
const libraryDefaultsMap = new Map();

export function loadPlayer(url) {
  if (!window.jwplayer && !url)
    throw new Error(
      "jwplayer-react requires either a library prop, or a library script",
    );
  if (!url) return Promise.resolve();
  if (loadedLibraryPromises.has(url)) return loadedLibraryPromises.get(url);

  const promise = createPlayerLoadPromise(url).then(() => {
    if (window.jwDefaults) {
      libraryDefaultsMap.set(url, { ...window.jwDefaults });
    }
  });
  loadedLibraryPromises.set(url, promise);
  return promise;
}

export function getLibraryDefaults(url) {
  return libraryDefaultsMap.get(url) || window.jwDefaults || {};
}

export function generateConfig(props) {
  const config = {};

  Object.keys(props).forEach((key) => {
    if (configProps.has(key)) config[key] = props[key];
  });

  return { ...props.config, ...config, isReactComponent: true };
}

export function getHandlerName(prop, regex) {
  const match = prop.match(regex) || ["", ""];

  // lowercase the first letter of the match and return
  return match[1].charAt(0).toLowerCase() + match[1].slice(1);
}
