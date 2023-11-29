import React, { useState } from "react";
import "./Customer_profile.css";

function UserProfileForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, profilePicture: file });
  };

  const handleUpdateProfile = () => {
    // Send userData to your backend API for updating in the database
    // Example: axios.post("/api/update-profile", userData).then(response => {});
    console.log("Updated user data:", userData);
    // Reset the form after submission if needed
    setUserData({
      name: "",
      email: "",
      password: "",
      profilePicture: null,
    });
  };

  return (
    <>
      <div className="top">
        <h1 className="food-haven-logo">
          <span>
            <span className="food-haven-logo-span">F</span>
            <span className="food-haven-logo-span2">ood</span>
            <span className="food-haven-logo-span3">H</span>
            <span className="food-haven-logo-span4">aven</span>
          </span>{" "}
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
        </svg>

        <a className="home" href="./Home">
          Home
        </a>
      </div>

      

      <div className="user-profile-form">
        <img className="pro_pic" src="Image/passport size photo .jpg" alt="" />
        <h2>Asifur Rahman</h2>
        <h5>asifurrahman06@gmail.com</h5>
        <h2>Update your Profile</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <label>Profile Picture:</label>
        <input type="file" name="profilePicture" onChange={handleFileChange} />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>

      <div className="bottom">
        <div className="copyright-group-6-all-rights-reserved">
          Copyright ©Group-6. All rights reserved.{" "}
        </div>
        <div className="contact-us">
          <div className="contact-inforamtion">Contact Inforamtion </div>
          <svg
            className="vuesax-linear-sms-tracking"
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.1665 8.5C2.1665 5 4.33317 3.5 7.58317 3.5H18.4165C21.6665 3.5 23.8332 5 23.8332 8.5V15.5C23.8332 19 21.6665 20.5 18.4165 20.5H7.58317"
              stroke="black"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.4168 9L15.026 11.5C13.9102 12.32 12.0793 12.32 10.9635 11.5L7.5835 9"
              stroke="black"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.1665 16.5H8.6665"
              stroke="black"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.1665 12.5H5.4165"
              stroke="black"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="cse-21-mist">CSE-21, MIST </div>
          <svg
            className="vuesax-linear-location-cross"
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.92168 7.78242C6.05584 -0.155912 19.955 -0.146746 22.0783 7.79159C23.3242 12.4483 19.9008 16.3899 16.9 18.8283C14.7225 20.6066 11.2775 20.6066 9.08918 18.8283C6.09918 16.3899 2.67584 12.4391 3.92168 7.78242Z"
              stroke="black"
            />
            <g filter="url(#filter0_d_88_519)">
              <path
                d="M15.1665 11.88L10.8765 8.25"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M15.1235 8.28662L10.8335 11.9166"
              stroke="black"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <filter
                id="filter0_d_88_519"
                x="6.37646"
                y="7.75"
                width="13.29"
                height="12.6301"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_88_519"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_88_519"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <div className="foodheaven-gmail-com">foodheaven@gmail.com </div>
        </div>
        <div className="social">
          <div className="social-media">
            <a href="https://www.instagram.com/" className="instragram">
              Instragram{" "}
            </a>
            <a href="https://twitter.com/?lang=en" className="twitter">
              Twitter{" "}
            </a>
            <a
              href="https://www.facebook.com/asifur.rahman.98"
              className="facebook"
            >
              Facebook{" "}
            </a>
            <svg
              className="instagram"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6579 2.54492H6.03572C3.65476 2.54492 1.72461 4.34865 1.72461 6.57367V14.6312C1.72461 16.8562 3.65476 18.6599 6.03572 18.6599H14.6579C17.0389 18.6599 18.969 16.8562 18.969 14.6312V6.57367C18.969 4.34865 17.0389 2.54492 14.6579 2.54492Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7955 10.095C13.9019 10.7655 13.7794 11.4504 13.4453 12.0521C13.1112 12.6539 12.5825 13.1418 11.9345 13.4466C11.2866 13.7514 10.5522 13.8575 9.83603 13.7498C9.11981 13.6421 8.45817 13.3261 7.94522 12.8467C7.43226 12.3674 7.09411 11.7491 6.97886 11.0798C6.86362 10.4105 6.97714 9.72424 7.30328 9.1187C7.62943 8.51316 8.15159 8.01915 8.7955 7.70692C9.4394 7.39469 10.1723 7.28015 10.8898 7.37959C11.6218 7.48102 12.2994 7.79976 12.8227 8.28872C13.3459 8.77769 13.687 9.41095 13.7955 10.095Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0889 6.1709H15.0962"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="0.5"
                y="1.43359"
                width="19.6933"
                height="18.338"
                stroke="black"
              />
            </svg>

            <svg
              className="twitter2"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_88_530)">
                <path
                  d="M19.8312 3.12627C19.0055 3.67053 18.0913 4.08681 17.1238 4.35906C16.6045 3.80109 15.9144 3.40561 15.1468 3.22612C14.3791 3.04663 13.571 3.09178 12.8317 3.35546C12.0925 3.61915 11.4577 4.08865 11.0132 4.70047C10.5688 5.31229 10.3361 6.0369 10.3467 6.77631V7.58206C8.83151 7.61878 7.33007 7.30473 5.97615 6.66789C4.62223 6.03106 3.45787 5.0912 2.58675 3.93202C2.58675 3.93202 -0.862139 11.1838 6.89786 14.4068C5.12214 15.5332 3.00679 16.098 0.862305 16.0183C8.6223 20.047 18.1067 16.0183 18.1067 6.75214C18.1059 6.5277 18.0829 6.30381 18.0378 6.08337C18.9178 5.27237 19.5387 4.24844 19.8312 3.12627V3.12627Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <rect
                x="0.5"
                y="1.20898"
                width="19.6933"
                height="18.338"
                stroke="black"
              />
              <defs>
                <clipPath id="clip0_88_530">
                  <rect
                    y="0.708984"
                    width="20.6933"
                    height="19.338"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>

            <svg
              className="facebook2"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_88_532)">
                <path
                  d="M15.5201 2.16211H12.9334C11.79 2.16211 10.6935 2.58657 9.88501 3.3421C9.07652 4.09764 8.62231 5.12237 8.62231 6.19086V8.6081H6.03564V11.8311H8.62231V18.2771H12.0712V11.8311H14.6579L15.5201 8.6081H12.0712V6.19086C12.0712 5.97716 12.162 5.77221 12.3237 5.6211C12.4854 5.47 12.7047 5.38511 12.9334 5.38511H15.5201V2.16211Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <rect
                x="0.5"
                y="1.05054"
                width="19.6933"
                height="18.338"
                stroke="black"
              />
              <defs>
                <clipPath id="clip0_88_532">
                  <rect
                    y="0.550537"
                    width="20.6933"
                    height="19.338"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileForm;
