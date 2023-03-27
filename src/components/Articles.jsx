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

const Articles = ({ edit }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "posts");

    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="mt-16 container">
        <FilterData />
      </div>
      <div className="flex items-center container flex-col">
        {articles.length === 0 ? (
          <p>no artciles found</p>
        ) : (
          articles.map((article) => (
            <div
              className="px-8 p-8 mt-3 w-full rounded-lg border-black border-1"
              key={article.id}
            >
              <div className="lg:flex lg:grid lg:grid-cols-3 lg:gap-8">
                {/* IMAGE */}
                <div className="w-full lg:col-span-1">
                  <img src={article.imageUrl} alt="title" className="" />
                </div>
                <div className="col-span-2">
                  <h2 className="windsor">{article.title}</h2>
                  <p>{article.createdAt.toDate().toDateString()}</p>
                  <p className="text-md text-grey-900">{article.text}</p>
                </div>
              </div>
              {edit === true && (
                <div>
                  <DeleteArticle id={article.id} imageUrl={article.imageUrl} />
                  <EditArticle data={article} />
                </div>
              )}
              <div>
                <div>
                  <a href={article.git} target="_blank" rel="noreferrer">
                    view on github
                  </a>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    open live
                  </a>
                </div>
                <div>
                  <span>tags: </span>
                  {article.tags.map((tag) => (
                    <a key={tag}>
                      <span> #{tag}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PageChange />
      <Footer />
    </>
  );
};

export default Articles;
