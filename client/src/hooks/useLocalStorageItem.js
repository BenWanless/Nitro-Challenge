import { useState, useEffect } from "react";

function useLocalStorageItem(id) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));

    if (storedData) {
      const foundItem = storedData.find((item) => item.id === id);

      if (foundItem) {
        setItem(foundItem);
      }
    }
  }, [id]);

  return item;
}

export default useLocalStorageItem;
