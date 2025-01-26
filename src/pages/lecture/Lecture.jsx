import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";


const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, SetLecture] = useState(null); // Use null instead of [] for better conditional checks
  const [loading, setLoading] = useState(true);
  const [lecloading, setLecloading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setbtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    navigate("/");

  // Fetching all lectures
  async function fetchLectures() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false even on error
    }
  }

  async function fetchLecture(id) {
    setLecloading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      SetLecture(data.lecture); // Set the specific lecture
      setLecloading(false);
    } catch (error) {
      console.log(error);
      setLecloading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const submitHandler = async (e) => {
    setbtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setbtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you want to delete this Lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    console.log("lecture completed", id);
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };


console.log(progress)

  useEffect(() => {
    fetchLectures(); // Fetch all lectures when the component mounts
    fetchProgress();
  }, [params.id]); // Refetch when `params.id` changes

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecloading ? (
              <Loading />
            ) : (
                  <>
                    <div className="progress">
                      Lecture completed - {completedLec} out of {lectLength} <br />
                      <progress 
  value={completed} 
  max={100} 
  style={{
    appearance: "none", 
    width: "60%", 
    height: "10px",
    backgroundColor: "#333", // Background color of the progress bar
  }}
></progress>
<span style={{ color: "white" }}>{completed} %</span>

                    </div>
                {lecture ? (
                  <>
                    <video
                      src={`${server}/${lecture.video}`}
                      width={"100%"}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                          autoPlay
                          onEnded={() => {
                            addProgress(lecture._id)
                          }}
                    ></video>
                    {/* Check if the title and description exist before rendering */}
                    {lecture.title && <h1>{lecture.title}</h1>}
                    {lecture.description && <h3>{lecture.description}</h3>}
                  </>
                ) : (
                  <h1>Please Select a Lecture</h1>
                )}
              </>
            )}
          </div>
          <div className="right">
            {user && user.role === "admin" && (
              <button className="common-btn" onClick={() => setShow(!show)}>
                {show ? "close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  {/* Title Input */}
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  {/* Description Input */}
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  {/* Video File Input */}
                  <input
                    type="file"
                    placeholder="Choose video"
                    onChange={changeVideoHandler}
                    required
                  />

                  {/* Video Preview */}
                  {videoPrev && (
                    <video src={videoPrev} alt="" width={300} controls></video>
                  )}

                  {/* Submit Button */}
                  <button
                    disabled={btnLoading}
                    type="submit"
                    className="common-btn"
                  >
                    {btnLoading ? "Please wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div key={e._id}>
                  <div
                    onClick={() => {
                      if (e._id) fetchLecture(e._id); // Fetch the specific lecture by ID
                    }}
                    className={`lecture-number ${
                      lecture && lecture._id === e._id ? "active" : ""
                    }`}
                  >
                    {i + 1}. {e.title}{" "}
                      {progress[0] &&
                        progress[0].completedLectures.includes(e._id) && (
                          <span
                            style={{
                              background: "red",
                              padding: "2px",
                              borderRadius: "6px",
                              color: "greenyellow",
                            }}
                          >
                            <TiTick />
                          </span>
                        )}
                  </div>
                  {user && user.role === "admin" && (
                    <button
                      className="common-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteHandler(e._id)}
                    >
                      Delete {e.title}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No Lectures Yet!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
