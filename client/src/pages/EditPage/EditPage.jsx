import { useState } from "react";
import { useParams } from "react-router-dom";

import useLocalStorageItem from "../../hooks/useLocalStorageItem";

import Form from "../../components/Form/Form";
import { Toast } from "../../components/Toast/Toast";

import "./EditPage.scss";

export default function EditPage() {
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();
  const item = useLocalStorageItem(Number(id));

  const onSubmit = (author, location) => {
    const storedData = JSON.parse(localStorage.getItem("data"));

    const updatedData = storedData.map((storedItem) =>
      storedItem.id === item.id
        ? { ...storedItem, author, location }
        : storedItem
    );

    localStorage.setItem("data", JSON.stringify(updatedData));

    setShowToast(true);
  };

  const toastMarkup = showToast ? (
    <Toast
      content="Post updated successfully!"
      duration={3000}
      onDismiss={() => setShowToast(false)}
    />
  ) : null;

  return (
    <div className="EditPage">
      <h3>Edit Page</h3>
      {item && <Form item={item} onSubmit={onSubmit} />}
      {toastMarkup}
    </div>
  );
}
