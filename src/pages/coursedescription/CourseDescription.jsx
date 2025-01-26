import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UseData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course,fetchCourses,fetchMycourse} = CourseData();
  const navigate = useNavigate();
  const { fetchUser } = UseData();


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse(params.id);
    console.log(fetchCourse(params.id));
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
  
    try {
      const {
        data: { order },
      } = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
        headers: { token },
      });
  
      const options = {
        key: "rzp_test_2B2fvSHOy7QCpr",
        amount: order.amount.toString(),
        currency: "INR",
        name: "E-learning",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              { headers: { token } }
            );
  
            console.log("Verification successful:", data);
            await fetchUser(); // Fetch updated user details
            await fetchCourses(); // Update course list
            await fetchMycourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_order_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: { color: "#8a4baf" },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.");
      setLoading(false);
    }
  };
  
  

  return (
    <>
      {
        loading? (<Loading />):(<>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor:{course.createdBy}</p>
                  <p>Duration:{course.duration}weeks</p>
                </div>
                
              </div>
              <p>{ course.description}</p>
    
                      <p>Let's get started with course At ₹{course.price}</p>
    
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler}className="common-btn">Buy Now</button>
                )}
            </div>
          )}
        </>)
      }

    </>
  )
};

export default CourseDescription;
