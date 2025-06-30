"use client";
import PropTypes from "prop-types";
import Profile from "./Profile"; 

export default function ProfileWrapper({ userId }) {
  return <Profile userId={userId} />;
}

ProfileWrapper.propTypes = {
  userId: PropTypes.string.isRequired,
};
