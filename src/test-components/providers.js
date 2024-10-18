const ProviderExamsCard = () => {
  const providers = [
    {
      name: "Amazon Web Services (AWS)",
      exams: [
        { title: "AWS Certified Cloud Practitioner", progress: 65, totalQuestions: 100 },
        { title: "AWS Certified Solutions Architect - Associate", progress: 30, totalQuestions: 100 },
        { title: "AWS Certified Developer - Associate", progress: 45, totalQuestions: 100 },
        { title: "AWS Certified SysOps Administrator - Associate", progress: 20, totalQuestions: 100 },
        { title: "AWS Certified DevOps Engineer - Professional", progress: 10, totalQuestions: 100 },
      ]
    },
    {
      name: "Microsoft Azure",
      exams: [
        { title: "AZ-900: Microsoft Azure Fundamentals", progress: 80, totalQuestions: 100 },
        { title: "AZ-104: Microsoft Azure Administrator", progress: 55, totalQuestions: 100 },
        { title: "AZ-204: Developing Solutions for Microsoft Azure", progress: 40, totalQuestions: 100 },
        { title: "AZ-305: Designing Microsoft Azure Infrastructure Solutions", progress: 25, totalQuestions: 100 },
        { title: "AZ-400: Designing and Implementing Microsoft DevOps Solutions", progress: 15, totalQuestions: 100 },
      ]
    },
    {
      name: "Cisco",
      exams: [
        { title: "CCNA: Cisco Certified Network Associate", progress: 70, totalQuestions: 100 },
        { title: "CCNP Enterprise", progress: 35, totalQuestions: 100 },
        { title: "CCNP Security", progress: 50, totalQuestions: 100 },
        { title: "CCNP Data Center", progress: 20, totalQuestions: 100 },
        { title: "Cisco Certified DevNet Professional", progress: 5, totalQuestions: 100 },
      ]
    },
    {
      name: "CompTIA",
      exams: [
        { title: "CompTIA A+", progress: 90, totalQuestions: 100 },
        { title: "CompTIA Network+", progress: 75, totalQuestions: 100 },
        { title: "CompTIA Security+", progress: 60, totalQuestions: 100 },
        { title: "CompTIA Cloud+", progress: 40, totalQuestions: 100 },
        { title: "CompTIA CySA+", progress: 30, totalQuestions: 100 },
      ]
    },
    {
      name: "Google Cloud",
      exams: [
        { title: "Google Cloud Digital Leader", progress: 85, totalQuestions: 100 },
        { title: "Google Cloud Associate Cloud Engineer", progress: 50, totalQuestions: 100 },
        { title: "Google Cloud Professional Cloud Architect", progress: 35, totalQuestions: 100 },
        { title: "Google Cloud Professional Data Engineer", progress: 20, totalQuestions: 100 },
        { title: "Google Cloud Professional Cloud DevOps Engineer", progress: 10, totalQuestions: 100 },
      ]
    }
  ];