/* eslint-disable react/prop-types */

const Step1 = ({formData, errors, handleChange }) => {
 
  return (
    <div>
      <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
        Personal Information
      </h1>

      {/* Full Name */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Full Name:
        </label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          required
        />
        {errors.full_name && <p className="text-red-500">{errors.full_name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email Address:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Phone Number:
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          required
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      {/* Gender and Age in One Line, Responsive */}
      <div className="flex flex-col md:flex-row md:space-x-6 items-center mt-3 mb-4">
        {/* Gender */}
        <div className="flex space-x-4 md:w-auto w-full mb-2 md:mb-0">
          <span className="font-semibold text-gray-700">Gender:</span>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData.gender === "M"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formData.gender === "F"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Female</span>
          </label>
        </div>

        {/* Age */}
        <div className="flex items-center w-full md:w-auto">
          <label className="text-gray-700 font-semibold mr-2">Birthdate:</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="p-2 border rounded-md focus:outline-blue-500 flex-grow md:flex-none"
            required
          />
        </div>
      </div>
      {errors.gender && <p className="text-red-500">{errors.gender}</p>}
      {errors.birth_date && <p className="text-red-500">{errors.birth_date}</p>}
      {/* Email */}
      
    </div>
  );
};

export default Step1;
