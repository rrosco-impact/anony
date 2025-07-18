import { useNavigate } from "react-router-dom";

export default function CreateSelector() {
  const navigate = useNavigate();
  const types = ["question", "message", "suggestion", "poll", "proposal"];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Content Management</h2>
      <p className="text-lg font-semibold ">
        What type of content would you like to post?
      </p>
      <div className="flex gap-3">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => navigate(`/create/${type}`)}
            className="px-4 py-2 bg-[#46ADF6] text-white rounded capitalize cursor-pointer hover:bg-[#3a8bbf] transition"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
