import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { usePrivy } from "@privy-io/react-auth";

const Profile = () => {
  const { updateUser, user: contextUser, fetchUser } = useStateContext();
  const { user: privyUser } = usePrivy();
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    age: '',
    gender: ''
  });
  const [isChanged, setIsChanged] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    console.log("Context user in Profile:", contextUser);
    if (contextUser) {
      setProfile({
        name: contextUser.name || '',
        username: contextUser.username || '',
        age: contextUser.age || '',
        gender: contextUser.gender || ''
      });
    }
  }, [contextUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
    setChangedFields(prev => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
    console.log("Profile changed:", { ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (privyUser?.id) {
      console.log("Submitting profile update:", changedFields);
      await updateUser(privyUser.id, changedFields);
      console.log("Profile update submitted");
      // Fetch the updated user data
      await fetchUser(privyUser.id);
      console.log("User data refetched");
    }
    setIsChanged(false);
    setChangedFields({});
  };

  console.log("Current profile state:", profile);

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
            Age
          </label>
          <input
            id="age"
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {isChanged && (
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;