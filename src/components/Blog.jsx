import { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ArticlePage from "./ArticlePage";
import FilterData from "./FilterData";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loadedArticles, setLoadedArticles] = useState([]);
  const [tagsCount, setTagsCount] = useState({});

  useEffect(() => {
    const articleRef = collection(db, "posts");
    const q = query(articleRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Create an empty array to store all the tags
      const tagsArray = [];
      const tagsCount = {};

      // Loop through each article and get the tags array
      articles.forEach((article) => {
        const tags = article.tags;

        // Loop through each tag in the tags array
        tags.forEach((tag) => {
          // If the tag is not in the tags array, add it
          if (!tagsArray.includes(tag)) {
            tagsArray.push(tag);
          }

          // If the tag is in the tags count object, increment the count
          if (tagsCount[tag]) {
            tagsCount[tag] += 1;
          } else {
            // If the tag is not in the tags count object, add it with a count of 1
            tagsCount[tag] = 1;
          }
        });
      });

      // Update the state with the articles and tags count
      setArticles(articles);
      setLoadedArticles(articles);
      setTagsCount(tagsCount);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Welcome to my blog!</h1>
      <FilterData
        articles={articles}
        loadedArticles={loadedArticles}
        setLoadedArticles={setLoadedArticles}
        tagsCount={tagsCount}
      />
      <ArticlePage articles={loadedArticles} />
    </div>
  );
};

export default Blog;
