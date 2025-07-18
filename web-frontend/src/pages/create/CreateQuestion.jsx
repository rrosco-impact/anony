import { useState } from "react";
import axios from "axios";

export default function CreateQuestion() {
  const [form, setForm] = useState({ content: "", summary: "" });

  const handleSubmit = async () => {
    try {
      // Step 1: Create base post
      const basePost = await axios.post("http://localhost:3000/api/posts", {
        user_id: 1,
        team_id: 1,
        post_type: "question",
      });

      const postId = basePost.data.post_id;

      // Step 2: Create question
      await axios.post(`http://localhost:3000/api/posts/${postId}/question`, {
        content: form.content,
        summary: form.summary,
      });

      alert("Question posted!");
    } catch (err) {
      console.error(err);
      alert("Error creating question");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Create a Question</h2>
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
