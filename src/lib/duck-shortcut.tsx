import * as React from "react";
import Mousetrap from "mousetrap";

export type DuckShortcutProps = {
  keys: string | string[];
  onKeysPressed: () => void;
};

export const useDuckShortcut: React.FC<DuckShortcutProps> = ({
  keys,
  onKeysPressed,
}) => {
  // Normalize the shortcuts in a state
  const normalizedKeys = React.useMemo(() => normalizeShortcuts(keys), [keys]);

  React.useEffect(() => {
    // Bind the keys using Mousetrap when the component mounts
    Mousetrap.bind(normalizedKeys, onKeysPressed);

    // Unbind the keys when the component unmounts
    return () => {
      Mousetrap.unbind(normalizedKeys);
    };
  }, [normalizedKeys, onKeysPressed]);

  // The component doesn't render anything
  return null;
};

export type Shortcuts = Shortcut[];

export type KeyCombination = string & { keyCombination: never };
export type KeySequence = string & { keySequence: never };
export type Shortcut = KeyCombination | KeySequence;

/**
 * This function converts input keys into an array of strings, one string per key combination/key sequence
 *
 * @param keys String, comma-separated string, or an array of string specifying key combinations/sequences
 */
export const normalizeShortcuts = (keys: string | string[]): Shortcuts =>
  Array.isArray(keys)
    ? keys
        .map(normalizeShortcuts)
        .reduce<Shortcut[]>((acc, v) => acc.concat(v), [])
    : keys
        .split(",")
        .map((str) => str.trim().toLowerCase() as Shortcut)
        .filter((str) => str !== "");
