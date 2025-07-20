import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import icon from "../assets/icon-placeholder.svg";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

const TABS = [
  "For you",
  "question",
  "suggestion",
  "message",
  "proposal",
  "poll",
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("For you");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === "For you"
            ? "http://localhost:3000/api/posts"
            : `http://localhost:3000/api/posts/${activeTab}s`; // pluralized route

        const res = await axios.get(endpoint);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  return (
    <div className="h-full w-full flex flex-row">
      <NavBar active={"feed"}/>
      <div className="h-full w-full">
        <TopBar/>
      {/* <div className="p-6 max-w-3xl mx-auto space-y-6"> */}
        <h1 className="text-2xl font-bold capitalize">Activity Feed</h1>
        <div className="flex items-center mb-2 px-4">
          <div>
            <img
              src={icon}
              alt="User Icon"
              className="w-8 h-8 rounded-full mb-2"
            />
          </div>
          <div>
            <button
              onClick={() => navigate("/create")}
              className=" text-gray-400 px-4 py-2 rounded cursor-pointer  hover:text-gray-800 transition"
            >
              What's on your mind?
            </button>
          </div>
        </div>

        <div className="flex gap-2 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1  capitalize transition cursor-pointer ${
                activeTab === tab
                  ? "border-b border-b-[#46ADF6] text-[#46ADF6]"
                  : "border-b border-b-gray-200 hover:text-[#46ADF6] "
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <span className="text-lg font-semibold capitalize ">
            {activeTab} Posts
          </span>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500">No posts found.</div>
          ) : (
            posts.map((post) => (
              <div
                key={post.post_id}
                className="p-4 border border-[#e7e7e7] rounded-lg mt-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div>
                    <img
                      src={icon}
                      alt="User Icon"
                      className="w-8 h-8 rounded-full mb-2"
                    />
                  </div>
                  <div>
                    <h2 className=" font-semibold">User</h2>
                    <div className="text-xs mb-1 gap-2 flex items-center text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                      <span className="text-gray-400">•</span>
                      {post.post_type}
                    </div>
                  </div>
                </div>

                <p className="mt-3">{post.content || "No content available"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
