import { useState, useEffect, useCallback } from "react";
import { TextInput } from "./components/TextInput";

export default function Form({ item, onSubmit }) {
  const [author, setAuthor] = useState(item.author);
  const [location, setLocation] = useState(item.location);

  useEffect(() => {
    setAuthor(item.author);
    setLocation(item.location);
  }, [item]);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(author, location);
    },
    [author, location, onSubmit]
  );

  return (
    <div className="mt-5">
      <h4>Update Post Details</h4>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Time"
          id="Time"
          value={formatDate(new Date(item.time * 1000))}
          readonly
        />
        <TextInput
          label="Author"
          id="inputAuthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextInput
          label="Location"
          id="inputLocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextInput
          label="Text"
          id="staticText"
          value={item.text}
          long
          readonly
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
