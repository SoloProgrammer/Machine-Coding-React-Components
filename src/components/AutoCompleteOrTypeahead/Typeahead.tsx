import { ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";
import useDebounce from "../../hooks/use-debounce";
import useLocalStorage from "../../hooks/use-localstorage";

type AutoCompleteProps = {
  onChange: (q: string) => void;
  results: string[];
  staticSuggesstions?: string[];
  isLoading?: true | false;
  error?: string;
  debounce?: true | false;
};
const AutoComplete = ({
  results,
  onChange,
  isLoading,
  error,
  staticSuggesstions,
}: AutoCompleteProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { get, set } = useLocalStorage();
  const [query, setQuery] = useState<string>("");
  
  const handleChange = (q: string) => {
    if (staticSuggesstions) {
      setSuggestions(
        staticSuggesstions.filter((r) => r.toLowerCase().includes(q))
      );
    }
    if (q.trim().length < 1) {
      setSuggestions([]);
    }
    setQuery(q);
  };

  const debouncedVal = useDebounce(query, 500);

  function isMatchFound(data: any[], key: string) {
    return data.some((su: string) =>
      su.toLowerCase().includes(key.toLowerCase())
    );
  }

  function updateSuggestions(suggestions: any[]) {
    setSuggestions(
      suggestions.filter((su) =>
        su.toLowerCase().includes(debouncedVal.toLowerCase())
      )
    );
  }
  
  useEffect(() => {
    if (staticSuggesstions || !debouncedVal || !debouncedVal.length) return;
    const cachedRes = get("results");
    if (cachedRes.length > 0 && isMatchFound(cachedRes, debouncedVal)) {
      updateSuggestions(cachedRes);
    } else if (isMatchFound(suggestions, debouncedVal)) {
      updateSuggestions(suggestions);
    } else onChange(debouncedVal);
  }, [debouncedVal]);

  useEffect(() => {
    setSuggestions(results);
    // update cache whenever new gets results 
    set("results", [...(get("results") ? get("results") : []), ...results]);
  }, [results]);

  const getHighlightedText = useCallback(
    (highlight: string) => {
      return suggestions.map((s, i) => {
        const parts = s.split(new RegExp(`(${query})`, "gi"));
        return (
          <ListItem key={i}>
            {parts.map((p: string, i: number) => (
              <span key={i}>
                {p.toLowerCase() === highlight.toLowerCase() ? <b>{p}</b> : p}
              </span>
            ))}
          </ListItem>
        );
      });
    },
    [query, suggestions]
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <input
          autoComplete="off"
          type="text"
          name="search"
          value={query}
          id="search"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type reciepe name.."
        />
      </div>
      {(isLoading || error || suggestions.length > 0) && (
        <ul className={styles.list}>
          {isLoading ? (
            <span>Loading..</span>
          ) : !isLoading && error ? (
            <div>
              <span>{error}</span>
              <button>Try again</button>
            </div>
          ) : (
            getHighlightedText(query)
          )}
          {suggestions.length < 1 && staticSuggesstions && (
            <span>No matching suggestions found</span>
          )}
        </ul>
      )}
    </div>
  );
};

const ListItem = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>;
};

export default AutoComplete;
