import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ApplicantStats = ({ applicant = [], selectedWorkPlace }) => {
  
  const [stats, setStats] = useState({
    total: 0,
    gender: { male: 0, female: 0 },
    institution: { government: 0, private: 0 },
    program: { regular: 0, distance: 0, extension: 0 },
    cgpa: { under2: 0, "2.5-3.0": 0, "3.0-3.5": 0, "3.5-4.0": 0 },
    exitExam: { "50-75": 0, "75-100": 0 },
    experience: { "1-5": 0, "5-10": 0, "10-15": 0 },
    placeOfWork: {},
  });

  const extractStats = () => {
    const filtered = applicant.filter(
      (a) => a.selected_work_place === selectedWorkPlace
    );

    const newStats = {
      total: filtered.length,
      gender: { male: 0, female: 0 },
      institution: { government: 0, private: 0 },
      program: { regular: 0, distance: 0, extension: 0 },
      cgpa: { under2: 0, "2.5-3.0": 0, "3.0-3.5": 0, "3.5-4.0": 0 },
      exitExam: { "50-75": 0, "75-100": 0 },
      experience: { "1-5": 0, "5-10": 0, "10-15": 0 },
      placeOfWork: { [selectedWorkPlace]: filtered.length },
    };

    filtered.forEach((a) => {
      // Gender
      if (a.gender === "M") newStats.gender.male++;
      else if (a.gender === "F") newStats.gender.female++;

      const edu = a.educations?.find((e) => e.user_for_application);
      if (edu) {
        // CGPA
        const cgpa = parseFloat(edu.cgpa);
        if (cgpa < 2.0) newStats.cgpa.under2++;
        else if (cgpa >= 2.5 && cgpa < 3.0) newStats.cgpa["2.5-3.0"]++;
        else if (cgpa >= 3.0 && cgpa < 3.5) newStats.cgpa["3.0-3.5"]++;
        else if (cgpa >= 3.5 && cgpa <= 4.0) newStats.cgpa["3.5-4.0"]++;

        // Exit Exam
        const exit = parseFloat(edu.exit_exam);
        if (exit >= 50 && exit < 75) newStats.exitExam["50-75"]++;
        else if (exit >= 75) newStats.exitExam["75-100"]++;
      }

      // Experience calculation by years
      const experienceYears = a.experiences?.reduce((acc, exp) => {
        const from = new Date(exp.from_date);
        const to = new Date(exp.to_date || new Date());
        const years = (to - from) / (1000 * 60 * 60 * 24 * 365.25);
        return acc + years;
      }, 0);

      if (experienceYears >= 1 && experienceYears <= 5) newStats.experience["1-5"]++;
      else if (experienceYears > 5 && experienceYears <= 10) newStats.experience["5-10"]++;
      else if (experienceYears > 10 && experienceYears <= 15) newStats.experience["10-15"]++;
    });

    setStats(newStats);
  };

  useEffect(() => {
    if (selectedWorkPlace) extractStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicant, selectedWorkPlace]);

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow space-y-4 text-sm text-gray-800">
      <div className="font-semibold text-lg text-gray-700">
        Total Number Of Applicants: {" "}
        <span className="font-bold text-blue-600">{stats.total}</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        <div>
          <h4 className="font-medium mb-1">Gender</h4>
          <p>
            Male: <span className="font-semibold">{stats.gender.male}</span>
          </p>
          <p>
            Female: <span className="font-semibold">{stats.gender.female}</span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">By Institution</h4>
          <p>
            Government: <span className="font-semibold">{stats.institution.government}</span>
          </p>
          <p>
            Private: <span className="font-semibold">{stats.institution.private}</span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">By Program</h4>
          <p>
            Regular: <span className="font-semibold">{stats.program.regular}</span>
          </p>
          <p>
            Distance: <span className="font-semibold">{stats.program.distance}</span>
          </p>
          <p>
            Extension: <span className="font-semibold">{stats.program.extension}</span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">By CGPA</h4>
          <p>
            (Under 2.0): <span className="font-semibold">{stats.cgpa.under2}</span>
          </p>
          <p>
            (2.5 - 3.0): <span className="font-semibold">{stats.cgpa["2.5-3.0"]}</span>
          </p>
          <p>
            (3.0 - 3.5): <span className="font-semibold">{stats.cgpa["3.0-3.5"]}</span>
          </p>
          <p>
            (3.5 - 4.0): <span className="font-semibold">{stats.cgpa["3.5-4.0"]}</span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">By Exit Exam</h4>
          <p>
            (50 - 75): <span className="font-semibold">{stats.exitExam["50-75"]}</span>
          </p>
          <p>
            (75 - 100): <span className="font-semibold">{stats.exitExam["75-100"]}</span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">By Work Experience</h4>
          <p>
            (1 - 5 years): <span className="font-semibold">{stats.experience["1-5"]}</span>
          </p>
          <p>
            (5 - 10 years): <span className="font-semibold">{stats.experience["5-10"]}</span>
          </p>
          <p>
            (10 - 15 years): <span className="font-semibold">{stats.experience["10-15"]}</span>
          </p>
        </div>

        <div className="sm:col-span-2">
          <h4 className="font-medium mb-1">By Place of Work</h4>
          <p>
            {selectedWorkPlace}: <span className="font-semibold">{stats.placeOfWork[selectedWorkPlace]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantStats;