import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Button } from "@material-tailwind/react";
import {
  Reducer,
  postActions,
  postState,
} from "../../components/Context/Reducer";
import { AuthContext } from "../../components/Context/Context";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AddPost = () => {
  const { user, userData } = useContext(AuthContext);
  const caption = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(Reducer, postState);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const submitPost = async (event) => {
    event.preventDefault();
    if (caption.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: caption.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        caption.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const uploadImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `posts/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <form className="w-full" onSubmit={submitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`Whats on your mind ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  className="outline-none w-full bg-white rounded-md"
                  ref={caption}
                ></input>
              </div>
              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="previewImage"
                  ></img>
                )}
              </div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        ></span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              Add image
              <input
                id="addImage"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              ></input>
            </label>
            {file && (
              <Button variant="text" onClick={uploadImage}>
                Upload
              </Button>
            )}
          </div>
        </div>
      </div>

      <div ref={scrollRef}></div>
    </div>
  );
};

export default AddPost;
