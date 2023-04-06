import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import EditArticle from "./EditArticle";
import Footer from "./Footer";
import { Header } from "./Header";
import FilterData from "./FilterData";
import PageChange from "./PageChange";
import Button from "./Button";

const Articles = ({ edit }) => {
  const [articles, setArticles] = useState([]);
  const [tagsCount, setTagsCount] = useState({});
  const array = JSON.stringify(articles);

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
      console.log(articles);
      const filteredPosts = articles.filter((post) =>
        post.tags.includes("react")
      );
      console.log(filteredPosts);
      setTagsCount(tagsCount);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-16 container">
        <FilterData tags={{ tagsCount }} />
      </div>
      <div className="flex items-center container flex-col">
        {array}
        {articles.length === 0 ? (
          <p>no artciles found</p>
        ) : (
          articles.map((article) => (
            <div
              className="px-8 p-8 mt-3 w-full rounded-lg border-black border-1"
              key={article.id}
            >
              <div className="md:flex">
                {/* IMAGE  lg:grid lg:grid-cols-2*/}
                <div>
                  <img
                    src={article.imageUrl}
                    alt="image"
                    className="post-image"
                  />
                </div>
                <div className="md:pl-3 h-72h">
                  <div className="m-0 p-0 h-4">
                    <h2 className="windsor text-lg mb-0 md:mt-0 mt-2 font-semibold">
                      {article.title}
                    </h2>

                    <p className="text-xs windsor">
                      {article.createdAt.toDate().toDateString()}
                    </p>
                  </div>

                  <div className="h-24 md:h-56 mt-12 overflow-hidden relative text-container">
                    <p className="text-sm text-grey-900 font-light ">
                      {article.text}
                    </p>
                  </div>
                </div>
              </div>
              {edit === true && (
                <div className="flex justify-end">
                  <DeleteArticle id={article.id} imageUrl={article.imageUrl} />
                  <EditArticle data={article} />
                </div>
              )}
              <div>
                <div className="flex flex-wrap">
                  {article.tags.map((tag) => (
                    <Button tag={tag} />
                  ))}
                </div>
                <div className="flex my-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800 font-light  no-underline mr-4"
                  >
                    VISIT LIVE PROJECT
                  </a>
                  |
                  <a
                    href={article.git}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800  font-light no-underline ml-4"
                  >
                    GITHUB
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <PageChange />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Articles;
