import { useEffect, useState, createContext } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const PostContext = createContext();

export default function useFetch() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            const postsCollectionRef = collection(db, "posts");
            const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPosts(data);
            setLoading(false);
        };

        getPosts();
    }, []);

    return { loading, setPosts, posts };
}