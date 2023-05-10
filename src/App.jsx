import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import useFetch, { PostContext } from "./hooks/useFetch";
import useFiltering, { FilteredPostsContext } from "./hooks/useFiltering";
import CreatePost from './Components/Editing/CreatePost';
import Header from './Components/Header';
import Post from "./components/Post";
import Footer from "./components/Footer";
import Posts from "./components/Posts";
import Loading from "./components/Loading";
import Notfound from "./components/NotFound";

function App() {

  const { loading, setPosts, posts } = useFetch();
  const { filteredPosts, setFilteredPosts, searchValue, setSearchValue, selectedFilters, setSelectedFilters, handleClickFilter } = useFiltering(posts);

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <>
      <Header />
      {loading ?
        <Loading />
        :
        <PostContext.Provider value={{ posts, setPosts }}>
          <FilteredPostsContext.Provider value={{ filteredPosts, setFilteredPosts, selectedFilters, setSelectedFilters, handleClickFilter, searchValue, setSearchValue }}>
            <div className='lg:max-w-7xl container mx-auto'>
              <Router>
                <Routes>
                  <Route path='/' element={<Posts />} />
                  <Route path='/new' element={<CreatePost />} />
                  <Route path=':id' element={<Post />} />
                  <Route path="*" element={<Notfound />} />
                </Routes>
              </Router>
              <Footer />
            </div>
          </FilteredPostsContext.Provider>
        </PostContext.Provider>
      }
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