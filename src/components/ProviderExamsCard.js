import React, { useState } from 'react';
import { 
  VStack, 
  Flex, 
  Input, 
  Box,
  Container
} from '@chakra-ui/react';
import { LuGrid, LuList } from "react-icons/lu";
import { IconBox } from './IconBox';
import ProviderCard from './ProviderCard';
import ProviderDropdown from './ProviderDropdown';

const ProviderExamsCard = () => {
  const allProviders = [
    "Microsoft", "Cisco", "CompTIA", "Amazon", "Oracle", "Isaca", "VMware", "Salesforce", "Google", "PMI",
    "ECCouncil", "ServiceNow", "Fortinet", "Dell", "Juniper", "Checkpoint", "Palo Alto Networks", "ISC", "HP",
    "Snowflake", "Citrix", "IBM", "The Open Group", "Splunk", "Netapp", "IIA", "IIBA", "LPI", "PRINCE2", "CyberArk",
    "APICS", "IAPP", "Huawei", "ACAMS", "Avaya", "HashiCorp", "Pegasystems", "Databricks", "Nutanix", "ITIL",
    "UiPath", "Test Prep", "GIAC", "Scrum", "Adobe", "F5", "Mulesoft", "Veeam", "SAP", "CrowdStrike",
    "Alcatel-Lucent", "CSA", "Nokia", "Six Sigma", "NetSuite", "Blue Prism", "Python Institute", "Linux Foundation",
    "Genesys", "AHIMA", "API", "RedHat", "SAS Institute", "Tableau", "ISTQB", "CWNP", "ASQ", "Atlassian", "AndroidATC",
    "ASIS", "BICSI", "Exin", "CIW", "iSQI", "Appian", "GAQM", "WatchGuard", "Veritas", "Vmedu", "Zend", "Arista",
    "Blockchain", "HRCI", "GARP", "QlikView", "Alibaba", "ISA", "English Test Preparation", "NFPA", "Axis Communications",
    "IAAP", "Scaled Agile", "BACB", "Sitecore", "Teradata", "NADCA", "SOA", "Versa Networks", "ABA", "CertNexus",
    "Hitachi", "iSAQB", "ACSM", "DSCI", "SolarWinds", "Symantec", "AAPC", "FINRA", "BCS", "CNCF", "ACFE", "Mirantis",
    "SANS", "Infor", "Magento", "Novell", "nCino", "NI", "A10 Networks", "Apple", "Riverbed", "AAFM India", "McAfee",
    "DMI", "Meta", "SNIA", "WorldatWork", "AHIP", "AHLEI", "Guidance Software", "HCL Software Academy", "NCMA",
    "Netskope", "CA Technologies", "C++ Institute", "Tibco", "Aruba", "Cloudera", "FileMaker", "PEOPLECERT", "USGBC",
    "AICPA", "AIWMI", "APSE", "Autodesk", "Blue Coat", "Certinia", "GMAC", "HAAD", "Logical Operations", "NACVA", "Unlimited"
  ];

  const [selectedProvider, setSelectedProvider] = useState("All Providers");
  const [providers, setProviders] = useState([
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
  ]);

  return (
    <Container maxWidth="100%" paddingLeft={4} paddingRight={4}>
      <VStack spacing={8} align="stretch" width="100%">
        <Flex alignItems="center" gap={4}>
          <Input 
            placeholder="Search exams..." 
            size="lg" 
            flex={1}
          />
          <Box width="250px">
            <ProviderDropdown 
              providers={allProviders}
              selectedProvider={selectedProvider}
              onSelect={setSelectedProvider}
            />
          </Box>
          <Flex gap={2}>
            <IconBox 
              icon={LuGrid} 
              size="40px" 
              iconScale={0.4} 
              borderThickness={3}
              bgColor="#b3ebf2"
              onClick={() => console.log('Grid view clicked')}
            />
            <IconBox 
              icon={LuList} 
              size="40px" 
              iconScale={0.4} 
              borderThickness={3}
              bgColor="#b3ebf2"
              onClick={() => console.log('List view clicked')}
            />
          </Flex>
        </Flex>
        {providers.map((provider, index) => (
          <ProviderCard 
            key={index} 
            providerName={provider.name} 
            exams={provider.exams} 
          />
        ))}
      </VStack>
    </Container>
  );
};

export default ProviderExamsCard;