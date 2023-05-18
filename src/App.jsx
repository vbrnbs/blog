import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetch, { PostContext } from "./utils/useFetch";
import useFiltering, { FilteredPostsContext } from "./utils/useFiltering";
import useAuth, { AuthContext } from "./components/Login";
import CreatePost from './components/Editing/CreatePost';
import Post from "./components/Post";
import Footer from "./components/Footer";
import Posts from "./components/Posts";
import Loading from "./components/Loading";
import Notfound from "./components/NotFound";
import Header from "./Components/Header";

function App() {

  const { loading, setPosts, posts } = useFetch();
  const { filteredPosts, setFilteredPosts, searchValue, setSearchValue, selectedFilters, setSelectedFilters, handleClickFilter } = useFiltering(posts);
  const { isAuth, setIsAuth } = useAuth();

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <>

      <PostContext.Provider value={{ posts, setPosts }}>
        <FilteredPostsContext.Provider value={{ filteredPosts, setFilteredPosts, selectedFilters, setSelectedFilters, handleClickFilter, searchValue, setSearchValue }}>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <Router>
            <Header />
            <div className='lg:max-w-7xl container mx-auto'>
              {loading ?
                <Loading />
                :
                <Routes>
                  <Route path='/' element={<Posts />} />
                  <Route path='/new' element={<CreatePost />} />
                  <Route path=':id' element={<Post />} />
                  <Route path="*" element={<Notfound />} />
                </Routes>
              }
              <Footer />
            </div>
          </Router>
          </AuthContext.Provider>
        </FilteredPostsContext.Provider>
      </PostContext.Provider>
    </>

  );
}

export default App;

{/* {loading ? 
            (<Route>Loading...</Route> )
            :
            (<Route path="/" element={<Blog data={postLists} />} />
            )
         } */}