import { useState } from "react";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment: </label>
      <textarea
        required
        name="text"
        type="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
