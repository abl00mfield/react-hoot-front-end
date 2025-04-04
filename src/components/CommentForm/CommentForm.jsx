import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as hootService from "../../services/hootService";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });
  const { hootId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(
        hootData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hootId && commentId) {
      hootService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      props.handleAddComment(formData);
    }
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
