import { collection, onSnapshot, orderBy, query, setDoc} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import EditArticle from "./EditArticle";
import { FilterData } from "./FilterData";

const Articles = ({edit}) => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "posts");

    const  q = query(articleRef, orderBy('createdAt', 'desc'));
    onSnapshot(q,(snapshot) => {
        const articles = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setArticles(articles);
    });
  }, []);

  return (
    <>
        <div className="text-center text-3xl my-16">
            my projects
        </div>
        <FilterData />
        <div className="flex items-center flex-col">
            {
                articles.length === 0 ? (
                    <p>no artciles found</p>
                ):(
                    articles.map((article) => (      
    
                    <div className="container p-3 bg-light mt-3 rounded" key={article.id}>
                        <div className="row mt-16">
                            <div className="col-3">
                                <img src = {article.imageUrl} alt = 'title' style={{height:'auto', width:120}} />
                            </div>
                            <div className="col-9 ps-3">
                                <h2>{article.title}</h2>
                                <p>{article.createdAt.toDate().toDateString()}</p>
                                <h4>{article.text}</h4>
                                <span>tags: </span>  
                                {
                                article.tags.map((tag) => 
                                     <a key={tag}><span> #{tag}</span></a>
                                )}
                            </div>
                             {
                             edit === true && 
                             <div>
                                <DeleteArticle id={article.id} imageUrl={article.imageUrl} /> 
                                <EditArticle data={article} />
                             </div> 
                            }
                            <div>
                                <a href={article.git} target="_blank">view on github</a>
                                <a href={article.url} target="_blank">open live</a>
                            </div>
                        </div>
                    </div>
                )))
            }
        </div>
    </>
    
  )
}

export default Articles