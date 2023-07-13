import { BsSignpostSplit } from "react-icons/bs";

export default function HomePage() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center mt-5 ">
      <h1>Welcome to the Edit Post App</h1>
      <BsSignpostSplit size={72} />
      <p>Please select a post to edit</p>
    </div>
  );
}
