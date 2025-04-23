import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

const Guidance = () => {
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const semesterRefs = useRef([]);

  const semestersData = [
      {
        name: 'Semester 1',
        intro: 'Start your B.Tech journey by focusing on building a strong programming and logical thinking base.',
        courses: [
          {
            name: 'Introduction to Programming in C',
            link: 'https://nptel.ac.in/courses/106105085',
            description: 'Learn the basics of programming with C, essential for all future programming tasks and problem-solving.'
          },
          {
            name: 'Digital Logic',
            link: 'https://nptel.ac.in/courses/117105080',
            description: 'Understand digital circuits and logic design, a foundation for system-level programming and hardware design.'
          }
        ],
        skills: ['C Programming', 'Digital Circuits', 'Problem Solving'],
        projects: ['Simple calculator in C', 'Binary to Decimal Converter'],
        certifications: [
          { name: 'C Programming - NPTEL', link: 'https://nptel.ac.in/courses/106105085' }
        ],
        youtube: [
          { name: 'Gate Smashers - C', link: 'https://www.youtube.com/watch?v=irqbmMNs2Bo' }
        ],
        interviewTips: ['Be thorough with C basics', 'Understand number systems & conversions']
      },
      {
        name: 'Semester 2',
        intro: 'Strengthen data handling and object-oriented concepts.',
        courses: [
          {
            name: 'Data Structures',
            link: 'https://nptel.ac.in/courses/106102064',
            description: 'Master key data structures like arrays, stacks, and queues to manage and manipulate data effectively.'
          },
          {
            name: 'Object Oriented Programming',
            link: 'https://nptel.ac.in/courses/106105151',
            description: 'Learn the principles of object-oriented programming, crucial for building scalable and maintainable software.'
          }
        ],
        skills: ['C++', 'Stacks, Queues, Trees'],
        projects: ['Student record management', 'Banking system simulation'],
        certifications: [
          { name: 'Data Structures - NPTEL', link: 'https://nptel.ac.in/courses/106102064' }
        ],
        youtube: [
          { name: 'Apna College DSA Series', link: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ' }
        ],
        interviewTips: ['Practice DSA patterns', 'Use platforms like LeetCode & GFG']
      },
      {
        name: 'Semester 3',
        intro: 'Time to master system-level knowledge and recursion logic.',
        courses: [
          {
            name: 'Operating Systems',
            link: 'https://nptel.ac.in/courses/106106144',
            description: 'Gain an understanding of how operating systems work, essential for building efficient software and system applications.'
          },
          {
            name: 'Computer Graphics',
            link: 'https://nptel.ac.in/courses/106102065',
            description: 'Explore the basics of 2D and 3D graphics, rendering techniques, transformations, and how visuals are processed and displayed.'
          }
        ],
        skills: ['Process Management', 'Memory Management', 'Recursion'],
        projects: ['OS scheduler simulation', 'Math expression parser'],
        certifications: [
          { name: 'Operating Systems - NPTEL', link: 'https://nptel.ac.in/courses/106106144' }
        ],
        youtube: [
          { name: 'Operating Systems - Gate Smashers', link: 'https://www.youtube.com/watch?v=1C5g_8KaF1c' }
        ],
        interviewTips: ['Revise memory & scheduling algorithms', 'Practice recursive coding problems']
      },
      {
        name: 'Semester 4',
        intro: 'Time to dive into web development and core system theory.',
        courses: [
          {
            name: 'Database Management Systems',
            link: 'https://nptel.ac.in/courses/106105175',
            description: 'Learn the fundamentals of database design and management, essential for building scalable applications.'
          },
          {
            name: 'Computer Networks',
            link: 'https://nptel.ac.in/courses/106105183',
            description: 'Understand networking protocols and data transmission, critical for developing internet-based applications.'
          }
        ],
        skills: ['SQL', 'HTTP Protocols', 'Relational Algebra'],
        projects: ['Student database system', 'Chat application'],
        certifications: [
          { name: 'DBMS - NPTEL', link: 'https://nptel.ac.in/courses/106105175' }
        ],
        youtube: [
          { name: 'DBMS - Jenny’s Lectures', link: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S' }
        ],
        interviewTips: ['Know basic SQL queries', 'Understand 3-tier architecture']
      },
      {
        name: 'Semester 5',
        intro: 'Focus on core software engineering principles and logic building.',
        courses: [
          {
            name: 'Software Engineering',
            link: 'https://nptel.ac.in/courses/106105182',
            description: 'Learn structured software development practices like SDLC, Agile, and Scrum to build quality software.'
          },
          {
            name: 'Design and Analysis of Algorithms',
            link: 'https://nptel.ac.in/courses/106101060',
            description: 'Understand algorithm design techniques and time complexities to optimize program efficiency.'
          }
        ],
        skills: ['Time Complexity', 'Agile/Scrum', 'Project Planning'],
        projects: ['Bug tracking system', 'Algorithm visualizer'],
        certifications: [
          { name: 'Software Engineering - NPTEL', link: 'https://nptel.ac.in/courses/106105182' }
        ],
        youtube: [
          { name: 'Algorithms - Abdul Bari', link: 'https://www.youtube.com/watch?v=HcL0qvE4qv8' }
        ],
        interviewTips: ['Focus on solving algorithms under constraints', 'Know SDLC phases']
      },
      {
        name: 'Semester 6',
        intro: 'Begin specialization and prepare for internships or open-source contributions.',
        courses: [
          {
            name: 'Machine Learning',
            link: 'https://nptel.ac.in/courses/106106139',
            description: 'Study supervised and unsupervised learning methods to build intelligent data-driven applications.'
          },
          {
            name: 'Cloud Computing',
            link: 'https://nptel.ac.in/courses/106104182',
            description: 'Learn how to deploy, scale, and manage applications using cloud platforms like AWS and Azure.'
          }
        ],
        skills: ['Supervised/Unsupervised ML', 'AWS Basics', 'Kubernetes'],
        projects: ['ML model for predictions', 'Deploy static app on AWS S3'],
        certifications: [
          { name: 'Machine Learning - NPTEL', link: 'https://nptel.ac.in/courses/106106139' }
        ],
        youtube: [
          { name: 'ML Simplified - Krish Naik', link: 'https://www.youtube.com/user/krishnaik06' }
        ],
        interviewTips: ['Work on GitHub projects', 'Revise AI/ML theory with application']
      },
      {
        name: 'Semester 7',
        intro: 'Focus on domain-specific knowledge and real-world exposure.',
        courses: [
          {
            name: 'Cyber Security',
            link: 'https://nptel.ac.in/courses/106105031',
            description: 'Understand cybersecurity principles, encryption, and secure communication protocols.'
          },
          {
            name: 'Big Data Analytics',
            link: 'https://nptel.ac.in/courses/106106142',
            description: 'Learn how to process large datasets using tools like Hadoop and Spark.'
          }
        ],
        skills: ['Cryptography', 'Big Data Tools', 'Hadoop & Spark'],
        projects: ['Data breach simulation', 'Data analysis using Spark'],
        certifications: [
          { name: 'Cyber Security - NPTEL', link: 'https://nptel.ac.in/courses/106105031' }
        ],
        youtube: [
          { name: 'Cyber Security - Great Learning', link: 'https://www.youtube.com/watch?v=inWWhr5tnEA' }
        ],
        interviewTips: ['Know basics of hashing/encryption', 'Be ready with case studies in big data']
      },
      {
        name: 'Semester 8',
        intro: 'Wrap up your B.Tech with research, placements, and advanced electives.',
        courses: [
          {
            name: 'Blockchain Technology',
            link: 'https://nptel.ac.in/courses/106105184',
            description: 'Explore distributed ledgers, smart contracts, and blockchain use cases in modern industries.'
          },
          {
            name: 'Project Work / Internship',
            link: '#',
            description: 'Apply your learning to a real-world project or research under faculty/industry guidance.'
          }
        ],
        skills: ['Blockchain Basics', 'Smart Contracts', 'Research Writing'],
        projects: ['Blockchain-based voting system', 'Capstone internship project'],
        certifications: [
          { name: 'Blockchain Technology - NPTEL', link: 'https://nptel.ac.in/courses/106105184' }
        ],
        youtube: [
          { name: 'Blockchain for Beginners - Simplilearn', link: 'https://www.youtube.com/watch?v=4j2emMn8lbo' }
        ],
        interviewTips: ['Prepare your resume with project links', 'Practice explaining your final project clearly']
      }
    ];
    

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleExpandAll = () => {
    setExpanded(expanded === 'all' ? null : 'all');
  };

  
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('B.Tech Journey Guide', 20, 20);
    let y = 30;

    semestersData.forEach((sem, idx) => {
      doc.setFontSize(14);
      doc.text(`${sem.name}: ${sem.intro}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Btech_Journey_Guide.pdf');
  };

  const filteredSemesters = semestersData.filter((sem) =>
    sem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
          Welcome to the B.Tech Journey Guide
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto font-medium">
          Navigate your college life semester-by-semester, from core subjects to industry readiness 🚀
        </p>
      </motion.div>

      {/* Sticky Nav */}
      

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Semester..."
          className="w-full sm:w-[300px] px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            onClick={handleExpandAll}
            className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            {expanded === 'all' ? 'Collapse All' : 'Expand All'}
          </button>
          <button
            onClick={exportToPDF}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Semester Cards */}
      {filteredSemesters.map((sem, index) => (
        <div
          key={index}
          ref={(el) => (semesterRefs.current[index] = el)}
          className="mb-3 rounded-md shadow-md bg-white/10 backdrop-blur-md border border-white/20"
        >
          <div
            className="flex justify-between items-center p-3 cursor-pointer bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-md"
            onClick={() => toggleExpand(index)}
          >
            <h2 className="text-base font-medium">{sem.name}</h2>
            <span className="text-xl">{expanded === index || expanded === 'all' ? '−' : '+'}</span>
          </div>

          {(expanded === index || expanded === 'all') && (
            <div className="p-6 text-gray-200">
              <p className="mb-4 text-lg italic">{sem.intro}</p>

              <h3 className="text-indigo-300 font-bold mb-2">Courses:</h3>
              <ul className="list-disc ml-6 mb-4">
                {sem.courses.map((c, i) => (
                  <li key={i}>
                    <a href={c.link} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-indigo-300 font-bold mb-2">Skills:</h3>
              <p className="mb-4">{sem.skills.join(', ')}</p>

              <h3 className="text-indigo-300 font-bold mb-2">Projects:</h3>
              <ul className="list-disc ml-6 mb-4">
                {sem.projects.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <h3 className="text-indigo-300 font-bold mb-2">Certifications:</h3>
              <ul className="list-disc ml-6 mb-4">
                {sem.certifications.map((c, i) => (
                  <li key={i}>
                    <a href={c.link} className="text-green-400 hover:underline" target="_blank" rel="noreferrer">
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-indigo-300 font-bold mb-2">YouTube Resources:</h3>
              <ul className="list-disc ml-6 mb-4">
                {sem.youtube.map((y, i) => (
                  <li key={i}>
                    <a href={y.link} className="text-red-400 hover:underline" target="_blank" rel="noreferrer">
                      {y.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-indigo-300 font-bold mb-2">Interview Tips:</h3>
              <ul className="list-disc ml-6">
                {sem.interviewTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* General Tips */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400">📌 General Interview Tips</h2>
        <ul className="list-disc ml-6 text-lg text-gray-300">
          <li>💻 Master core subjects like OS, DBMS, CN, and DSA.</li>
          <li>📄 Build a strong resume with real projects and a GitHub profile.</li>
          <li>🎤 Practice with mock interviews to gain confidence and improve your skills.</li>
          <li>🌍 Contribute to open source and seek internships for hands-on experience.</li>
          <li>🤝 Join coding communities to network and stay updated with industry trends.</li>
          <li>💡 Consistently solve coding problems on platforms like LeetCode or HackerRank.</li>
          <li>🗣️ Prepare for behavioral interviews using the STAR method for clear answers.</li>
          <li>🔍 Research target companies and align your applications with their values.</li>
          <li>📂 Create a personal portfolio showcasing your skills and projects.</li>
          <li>🚀 Learn emerging technologies like AI and Cloud Computing to stay ahead.</li>
        </ul>
      </div>

      {/* Roadmap Link */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400">🧭 Additional Resource - Roadmap</h2>
        <p className="text-lg text-gray-300">
          For an extended interactive career roadmap, visit:{' '}
          <a href="https://roadmap.sh" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
            roadmap.sh
          </a>
        </p>
      </div>
    </div>
  );
};

export default Guidance;

