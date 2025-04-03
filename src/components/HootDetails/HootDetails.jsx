import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as hootService from "../../services/hootService"; //we could actually just import the show service
import CommentForm from "../CommentForm/CommentForm";

const HootDetails = (props) => {
  const [hoot, setHoot] = useState(null);
  const { hootId } = useParams();
  const { user } = useContext(UserContext); //accesses the user

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot(); //this will run when the effect function runs
  }, [hootId]); //this happens anytime the hoodId changes

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({
      ...hoot,
      comments: [...hoot.comments, newComment],
    });
  };

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await hootService.deleteComment(hootId, commentId);
    setHoot({
      ...hoot,
      comments: hoot.comments.filter((comment) => comment._id !== commentId),
    });
  };

  if (!hoot) return <main>Loading...</main>; //show loading while Hoot is getting requested
  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteHoot(hootId)}>
                Delete
              </button>
            </>
          )}
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!hoot.comments.length && <p>There are no comments</p>}
        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username}
                            ${new Date(
                              comment.createdAt
                            ).toLocaleDateString()}`}
              </p>
              {comment.author._id === user._id && (
                <>
                  <Link to={`/hoots/${hootId}/comments/${comment._id}`}>
                    Edit Comment
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
