import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as hootService from "../../services/hootService";

const HootForm = (props) => {
  const { hootId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hootId) {
      props.handleUpdateHoot(hootId, formData);
    } else {
      props.handleAddHoot(formData);
    }
  };
  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData); //so we can edit the hoot
    };
    if (hootId) fetchHoot();
    return () => setFormData({ title: "", text: "", category: "News" });
  }, [hootId]);

  return (
    <main>
      <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          name="title"
          id="title-input"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
