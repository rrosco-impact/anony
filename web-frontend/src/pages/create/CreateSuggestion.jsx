import { useState } from "react";
import axios from "axios";

export default function CreateSuggestion() {
  const [form, setForm] = useState({ content: "", summary: "" });

  const handleSubmit = async () => {
    try {
      const basePost = await axios.post("http://localhost:3000/api/posts", {
        user_id: 1,
        team_id: 1,
        post_type: "suggestion",
      });
      const postId = basePost.data.post_id;
      await axios.post(`http://localhost:3000/api/posts/${postId}/suggestion`, {
        content: form.content,
        summary: form.summary,
      });

      alert("Suggestion posted!");
    } catch (err) {
      console.error(err);
      alert("Error creating suggestion");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Create a Suggestion</h2>
      <input
        type="text"
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
