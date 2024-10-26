import React, { useState, useEffect } from "react";
import { FaStar, FaCodeBranch } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";

const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";
const EMOJI_URL =
  "https://cdn.jsdelivr.net/gh/zachey01/zachey01.github.io@main/static/tg_emoji_list.min.json";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emojiMap, setEmojiMap] = useState({});

  useEffect(() => {
    const fetchEmojiList = async () => {
      try {
        const response = await fetch(EMOJI_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch emoji list.");
        }
        const emojis = await response.json();
        const emojiMapping = emojis.reduce((acc, { name, emoji }) => {
          acc[
            emoji
          ] = `https://cdn.jsdelivr.net/gh/zachey01/zachey01.github.io@main/static/telegram_emoji/${name}.webp`;
          return acc;
        }, {});
        setEmojiMap(emojiMapping);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchEmojiList();
  }, []);

  useEffect(() => {
    const fetchPinnedRepositories = async () => {
      try {
        const cache = await caches.open("github-repos-cache");
        const cacheKey = `${CORS_PROXY}${process.env.github}`;
        const cachedResponse = await cache.match(cacheKey);
        let repoNames;

        if (cachedResponse) {
          const htmlText = await cachedResponse.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const repoElements = doc.querySelectorAll(
            "ol.js-pinned-items-reorder-list li .pinned-item-list-item-content .d-flex a"
          );
          repoNames = Array.from(repoElements).map((el) =>
            el.getAttribute("href").substring(1)
          );
        } else {
          const response = await fetch(cacheKey);
          if (!response.ok) {
            throw new Error("Failed to fetch the GitHub profile page.");
          }
          cache.put(cacheKey, response.clone());
          const htmlText = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const repoElements = doc.querySelectorAll(
            "ol.js-pinned-items-reorder-list li .pinned-item-list-item-content .d-flex a"
          );
          repoNames = Array.from(repoElements).map((el) =>
            el.getAttribute("href").substring(1)
          );
        }

        const repoDataPromises = repoNames.map(async (fullName) => {
          const apiResponse = await fetch(
            `https://api.github.com/repos/${fullName}`
          );
          if (!apiResponse.ok) {
            throw new Error(`Failed to fetch data for repository: ${fullName}`);
          }
          const data = await apiResponse.json();
          return {
            name: data.name,
            description: data.description,
            githubLink: data.html_url,
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
          };
        });

        const projectsData = await Promise.all(repoDataPromises);
        setProjects(projectsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepositories();
  }, []);

  // Replace emojis with images and remove the original emoji from the text
  const replaceEmojisWithImages = (text) => {
    if (!emojiMap || Object.keys(emojiMap).length === 0) {
      return text; // Return original text if emojiMap is not ready
    }
    return text.split(" ").map((word, index) => {
      const emojiImage = emojiMap[word];
      if (emojiImage) {
        return (
          <span
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: "4px",
            }}
          >
            <img
              src={emojiImage}
              alt={word}
              style={{
                width: "20px",
                marginRight: "4px",
                verticalAlign: "middle",
              }}
            />
          </span>
        );
      } else {
        return <span key={index}>{word} </span>; // Return non-emoji text
      }
    });
  };

  if (loading) {
    return (
      <div className="text-white bg-[#000] border-0 border-red-400 p-8">
        <div className="text-xl text-center text-pink mb-4">Projects</div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white bg-[#000] border-0 border-red-400 p-8">
        <div className="text-xl text-center text-pink mb-4">Projects</div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="text-white bg-[#000] border-0 border-red-400 p-8">
      <div className="text-xl text-center text-pink mb-4">Projects</div>
      <div className="flex flex-wrap justify-center gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-black/20 backdrop-filter backdrop-blur-sm rounded-xl border-0 p-4 max-w-xl w-full"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl font-extrabold hover:underline mr-4"
                >
                  {project.name}
                </a>
                <div className="flex items-center text-sm mr-4">
                  <FaStar className="mr-2 text-yellow-500" />
                  {project.stars}
                </div>
                <div className="flex items-center text-sm mr-4">
                  <FaCodeBranch className="mr-2" />
                  {project.forks}
                </div>
                <div className="flex items-center text-sm">
                  <GoIssueOpened className="mr-2" />
                  {project.issues}
                </div>
              </div>
            </div>
            <p className="mt-2">
              {replaceEmojisWithImages(project.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
