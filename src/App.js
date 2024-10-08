import NavBar from "./components/Navbar/NavBar";
import LeftSidebar from "./components/Navbar/LeftSidebar";
import RightSidebar from "./components/Navbar/RightSidebar";
import AddPost from "./pages/posts/AddPost";

function App() {
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <NavBar />
      </div>
      <div className="flex">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSidebar />
        </div>
        <div className="flex-auto w-[60%]">
          <div className="W-[80%] mx-auto absolute left-[20%] top-[20%]"><AddPost /></div>
         
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
