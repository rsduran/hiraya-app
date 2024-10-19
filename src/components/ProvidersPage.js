import React, { useState, useMemo, lazy, Suspense } from "react";
import {
  VStack,
  Flex,
  Input,
  Box,
  Container,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { LuGrid, LuList } from "react-icons/lu";
import { IconBox } from "./IconBox";
import CategoriesDropdown from "./CategoriesDropdown";
import Pagination from "./Pagination";
import { debounce } from "lodash";

const CategoryCard = lazy(() => import("./CategoryCard"));

const LoadingSpinner = () => (
  <Center height="200px">
    <Spinner size="xl" color="#00bfff" thickness="4px" />
  </Center>
);

const ProvidersPage = () => {
  const categoriesData = [
    {
      name: "Cloud Computing",
      providers: [
        {
          name: "Microsoft",
          description: "Azure and cloud infrastructure certifications.",
          image:
            "https://images.credly.com/images/486551f0-13ae-41fe-ae3e-7a046b6d2098/blob.png",
          totalExams: 120,
          totalQuestions: 15000,
          isPopular: true,
        },
        {
          name: "Amazon",
          description: "AWS cloud platform certifications.",
          image:
            "https://seekvectors.com/files/download/e194765ce816c3fa8eb54113cdc79365.png",
          totalExams: 95,
          totalQuestions: 12000,
          isPopular: true,
        },
        {
          name: "Google",
          description: "Google Cloud expertise certifications.",
          image:
            "https://images.credly.com/size/200x200/images/ca55a8cf-9e9c-47e3-9378-d225d63dd1e5/blob.png",
          totalExams: 80,
          totalQuestions: 10000,
          isPopular: true,
        },
        {
          name: "CNCF",
          description: "Cloud native technologies certifications.",
          image: "https://i0.wp.com/collabnix.com/wp-content/uploads/2023/03/cncf-logo-stacked.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: true,
        },
        {
          name: "IBM",
          description: "Certifications in cloud and enterprise solutions.",
          image:
            "https://images.credly.com/size/200x200/images/854d76bf-4f74-4d51-98a0-d969214bfba7/IBM%2BLogo%2Bfor%2BAcclaim%2BProfile.png",
          totalExams: 70,
          totalQuestions: 8500,
          isPopular: false,
        },
        {
          name: "VMware",
          description: "Cloud and virtualization certifications.",
          image:
            "https://images.credly.com/size/200x200/images/a45af8fd-79ca-4388-add0-c32dde2441e6/blob.png",
          totalExams: 60,
          totalQuestions: 7500,
          isPopular: false,
        },
        {
          name: "Oracle",
          description: "Cloud services and database certifications.",
          image:
            "https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png",
          totalExams: 85,
          totalQuestions: 11000,
          isPopular: true,
        },
        {
          name: "Snowflake",
          description: "Cloud data platform and analytics certifications.",
          image:
            "https://logos-world.net/wp-content/uploads/2022/11/Snowflake-Emblem.png",
          totalExams: 40,
          totalQuestions: 5000,
          isPopular: false,
        },
        {
          name: "Mirantis",
          description: "OpenStack and Kubernetes certifications.",
          image: "https://a.storyblok.com/f/146871/918x527/001991d5c1/mirantis-logo-one-color.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "Nutanix",
          description:
            "Cloud infrastructure and storage management certifications.",
          image:
            "https://download.logo.wine/logo/Nutanix/Nutanix-Logo.wine.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "nCino",
          description: "Cloud banking platform certifications.",
          image: "https://cdn.westmonroe.com/-/media/west-monroe-images/logos/partners/ncino-logo.png?mw=720&mh=720&iar=0&as=1&hash=60F7D8C3C7CFAE0481CB3D70728348EA",
          totalExams: 15,
          totalQuestions: 2000,
          isPopular: false,
        },
        {
          name: "Meta",
          description: "Certifications related to cloud and digital platforms.",
          image:
            "https://images.credly.com/size/200x200/images/cc2c9a21-84a0-4f80-bcda-eb9dea7aa35c/blob.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
      ],
    },
    {
      name: "Networking & Security",
      providers: [
        {
          name: "Cisco",
          description: "Networking solutions and technologies certifications.",
          image:
            "https://seeklogo.com/images/C/cisco-logo-FE0AB16DCF-seeklogo.com.png",
          totalExams: 110,
          totalQuestions: 14000,
          isPopular: true,
        },
        {
          name: "Juniper",
          description: "Advanced networking and security certifications.",
          image:
            "https://images.credly.com/size/200x200/images/506849a8-4043-4e8e-9b5e-543677b693c1/blob.png",
          totalExams: 60,
          totalQuestions: 8000,
          isPopular: false,
        },
        {
          name: "Fortinet",
          description:
            "Network security and firewall management certifications.",
          image:
            "https://download.logo.wine/logo/Fortinet/Fortinet-Logo.wine.png",
          totalExams: 55,
          totalQuestions: 7000,
          isPopular: true,
        },
        {
          name: "Checkpoint",
          description: "Cybersecurity and threat prevention certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Check_Point_logo_2022.svg/1024px-Check_Point_logo_2022.svg.png",
          totalExams: 45,
          totalQuestions: 5500,
          isPopular: false,
        },
        {
          name: "Palo Alto Networks",
          description: "Certifications in network security management.",
          image: "https://www.cdnlogo.com/logos/p/57/paloaltonetworks-2020.svg",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: true,
        },
        {
          name: "ISC",
          description: "Cybersecurity and risk management certifications.",
          image:
            "https://seeklogo.com/images/1/isc-2-logo-2CC1EDED2C-seeklogo.com.png",
          totalExams: 40,
          totalQuestions: 5000,
          isPopular: false,
        },
        {
          name: "Huawei",
          description: "Telecommunications and networking certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/f/fa/Huawei_logo_icon_170010.png",
          totalExams: 65,
          totalQuestions: 8500,
          isPopular: false,
        },
        {
          name: "Arista",
          description: "Cloud networking certifications.",
          image:
            "https://www.exclusive-networks.com/se/wp-content/uploads/sites/25/2021/01/Arista-Logo-2.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "WatchGuard",
          description: "Certifications in firewall and network security.",
          image:
            "https://cdn-public.softwarereviews.com/production/logos/offerings/4012/original/1280px-Watchguard_logo.svg.png?1619470043",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "CyberArk",
          description: "Privileged access management certifications.",
          image:
            "https://www.kuppingercole.com/pictures/600/gradient_vertical.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Alcatel-Lucent",
          description: "Telecommunications and networking certifications.",
          image:
            "https://web-assets.al-enterprise.com/-/media/assets/internet/images/al-enterprise-primary-horizontal-rgb-logo.png?v=1&d=20231229T083731Z",
          totalExams: 40,
          totalQuestions: 5000,
          isPopular: false,
        },
        {
          name: "Nokia",
          description: "Certifications in mobile network infrastructure.",
          image:
            "https://images.credly.com/size/200x200/images/24c27529-f879-4275-bfa4-fc9bb72d17b2/blob.png",
          totalExams: 45,
          totalQuestions: 5800,
          isPopular: false,
        },
        {
          name: "SolarWinds",
          description: "Network management and IT operations certifications.",
          image:
            "https://images.credly.com/size/200x200/images/067f5c07-d4d4-46e7-94e4-9c4efc0f20dd/blob.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "Symantec",
          description: "Cybersecurity and data protection certifications.",
          image:
            "https://bomitsolutions.co.uk/wp-content/uploads/symantec-partner-logo.png",
          totalExams: 55,
          totalQuestions: 7000,
          isPopular: true,
        },
        {
          name: "F5",
          description:
            "Application delivery and network security certifications.",
          image:
            "https://images.credly.com/size/200x200/images/8a62efed-7ddb-4ef2-9e56-c9f053b230b3/blob.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "A10 Networks",
          description:
            "Application and network security solutions certifications.",
          image:
            "https://pingidentity.my.site.com/servlet/servlet.FileDownload?file=00P1W00001JyiUdUAJ",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "SNIA",
          description: "Certifications in storage networking.",
          image:
            "https://www.snia.org/sites/default/files/snia_logos/SNIA_R_logo.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "Blue Coat",
          description: "Certifications in web security and content filtering.",
          image: "https://res.cloudinary.com/djproto/image/upload/v1689338164/keystone6/clk2kbpj700000fmlfoqoekut.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "Novell",
          description: "Networking and IT infrastructure certifications.",
          image: "https://download.logo.wine/logo/Novell/Novell-Logo.wine.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "Riverbed",
          description: "Network and application performance certifications.",
          image: "https://tech-wiki.net/images/2/24/Riverbed_logo.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
      ],
    },
    {
      name: "Enterprise Solutions & IT Operations",
      providers: [
        {
          name: "Dell",
          description: "IT infrastructure and server certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png",
          totalExams: 70,
          totalQuestions: 9000,
          isPopular: true,
        },
        {
          name: "ServiceNow",
          description:
            "Digital workflow and IT service management certifications.",
          image:
            "https://www.bloorresearch.com/wp-content/uploads/2013/01/SERVICENOW-logo-300-x-470px-.png",
          totalExams: 55,
          totalQuestions: 7000,
          isPopular: true,
        },
        {
          name: "NetApp",
          description:
            "Hybrid cloud storage and data management certifications.",
          image:
            "https://logos-world.net/wp-content/uploads/2022/05/NetApp-Symbol.png",
          totalExams: 45,
          totalQuestions: 5800,
          isPopular: false,
        },
        {
          name: "Citrix",
          description: "Virtualization and workspace solutions certifications.",
          image:
            "https://www.brand2global.com/wp-content/uploads/2017/03/citrix-logo.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: true,
        },
        {
          name: "Splunk",
          description: "Data analytics and security certifications.",
          image:
            "https://images.credly.com/size/200x200/images/be09abd3-e1d1-4807-86b5-93dbd6066dfb/blob.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "SAP",
          description: "ERP and business process management certifications.",
          image:
            "https://seekvectors.com/files/download/Sap-01.png",
          totalExams: 85,
          totalQuestions: 11000,
          isPopular: true,
        },
        {
          name: "HashiCorp",
          description:
            "Infrastructure automation and cloud operations certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/8/83/HashiCorp_Logo.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "RedHat",
          description: "Linux and open-source software certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/79/Red_Hat_Logo_2019.svg",
          totalExams: 60,
          totalQuestions: 7800,
          isPopular: true,
        },
        {
          name: "Databricks",
          description: "Big data and machine learning platform certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "Veritas",
          description: "Data backup and recovery solutions certifications.",
          image:
            "https://images.credly.com/size/200x200/images/92d56a6d-284c-4f32-8527-27ba3b0a3cc4/blob.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Veeam",
          description: "Data management and backup solutions certifications.",
          image:
            "https://images.credly.com/size/200x200/images/75b9eeec-532a-4047-ae7f-1a90a6d0f397/blob.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "Pegasystems",
          description:
            "Business process automation and customer engagement certifications.",
          image:
            "https://download.logo.wine/logo/Pegasystems/Pegasystems-Logo.wine.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "Genesys",
          description:
            "Customer experience and contact center solutions certifications.",
          image:
            "https://images.credly.com/size/200x200/images/357f688f-640c-47df-8e46-20aaa9e5bf3d/blob.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Hitachi",
          description: "IT and data operations solutions certifications.",
          image: "https://seekvectors.com/files/download/Hitachi-01.png",
          totalExams: 45,
          totalQuestions: 5800,
          isPopular: false,
        },
        {
          name: "HP",
          description: "IT solutions and infrastructure certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/6/6f/HP_logo_630x630.png",
          totalExams: 65,
          totalQuestions: 8500,
          isPopular: true,
        },
        {
          name: "Mulesoft",
          description: "API management and integration certifications.",
          image:
            "https://www.salesforce.com/news/wp-content/uploads/sites/3/2023/09/MuleSoft-From-Salesforce-Logo-RGB.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "The Open Group",
          description: "Certifications in enterprise architecture (TOGAF).",
          image:
            "https://www.opengroup.org/sites/default/files/the-open-group-logo_og.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "Tibco",
          description:
            "Data integration and analytics platform certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tibco_logo-_Palo_Alto%2C_CA_company-_%28PNG%29_2013-11-24_16-00.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "FileMaker",
          description: "Low-code database platform certifications.",
          image: "https://cdn.icon-icons.com/icons2/2699/PNG/512/filemaker_logo_icon_169176.png",
          totalExams: 15,
          totalQuestions: 1800,
          isPopular: false,
        },
        {
          name: "HCL Software Academy",
          description:
            "Certifications in software solutions and IT operations.",
          image:
            "https://cdn-public.softwarereviews.com/production/logos/offerings/5159/large/HCLSoftware-removebg-preview.png?1702065843",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "CA Technologies",
          description: "Enterprise IT solutions certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/CA_Technologies_brand.svg/1280px-CA_Technologies_brand.svg.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: false,
        },
        {
          name: "Certinia",
          description: "Certifications in cloud-based financial management.",
          image:
            "https://images.credly.com/size/200x200/images/a8b385d1-ded8-4397-83ce-6dbe4526832b/blob.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "BCS",
          description: "IT and digital skills certifications.",
          image: "https://www.coursesonline.co.uk/wp-content/uploads/BCS-logo-250-pix.png",
          totalExams: 40,
          totalQuestions: 5000,
          isPopular: false,
        },
        {
          name: "Infor",
          description: "Enterprise software and ERP certifications.",
          image: "https://cdn.icon-icons.com/icons2/2699/PNG/512/infor_logo_icon_167926.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
      ],
    },
    {
      name: "Project Management & Agile",
      providers: [
        {
          name: "PMI",
          description: "Project management professional (PMP) certifications.",
          image: "https://www.cdnlogo.com/logos/p/22/pmi.svg",
          totalExams: 45,
          totalQuestions: 5800,
          isPopular: true,
        },
        {
          name: "PRINCE2",
          description: "Project management methodology certifications.",
          image: "https://www.cognidox.com/hubfs/prince2-logo-600px.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "Scrum",
          description: "Agile methodology and Scrum framework certifications.",
          image:
            "https://images.credly.com/size/200x200/images/db768524-81d9-435e-96fc-33b517e15616/blob.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: true,
        },
        {
          name: "Scaled Agile",
          description: "Certifications for scaling Agile in enterprises.",
          image:
            "https://learnagile.co.in/wp-content/uploads/sites/24/2023/03/ScaledAgileLogo-600x600-1.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "PEOPLECERT",
          description:
            "Certifications in project management frameworks like ITIL and PRINCE2.",
          image:
            "https://images.credly.com/images/ff25afa4-48f9-47e7-b3e4-55cc90cd598a/blob.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
      ],
    },
    {
      name: "Cybersecurity",
      providers: [
        {
          name: "CompTIA",
          description:
            "Vendor-neutral IT certifications across various domains.",
          image:
            "https://cdn2.hubspot.net/hubfs/2529362/Imported_Blog_Media/CompTIA-Large-Logo.png",
          totalExams: 80,
          totalQuestions: 10000,
          isPopular: true,
        },
        {
          name: "ECCouncil",
          description: "Certifications in ethical hacking and cybersecurity.",
          image:
            "https://images.credly.com/images/4de1c3b8-f9f6-4447-8879-e4f74012f8b8/blob.png",
          totalExams: 60,
          totalQuestions: 7800,
          isPopular: true,
        },
        {
          name: "GIAC",
          description: "Cybersecurity and information security certifications.",
          image:
            "https://images.contentstack.io/v3/assets/blt36c2e63521272fdc/bltcc3d24814ce68f0c/614cf23d947b692d209b6e45/GIAC-Logo-2021-revDL.png",
          totalExams: 55,
          totalQuestions: 7000,
          isPopular: false,
        },
        {
          name: "ISACA",
          description:
            "Governance, risk management, and cybersecurity certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/a/a1/ISACA_logo.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: true,
        },
        {
          name: "CrowdStrike",
          description: "Endpoint protection and cybersecurity certifications.",
          image:
            "https://seeklogo.com/images/C/crowdstrike-logo-4EE777D7FD-seeklogo.com.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "CSA",
          description: "Certifications in cloud security.",
          image: "https://www.rhopointcomponents.com/wp-content/uploads/2021/01/csa-group_logo_v2-1.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "McAfee",
          description: "Cybersecurity and data protection certifications.",
          image:
            "https://1000logos.net/wp-content/uploads/2020/09/McAfee-Logo.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "Guidance Software",
          description:
            "Certifications in digital forensics and incident response.",
          image:
            "https://cybersecurity-excellence-awards.com/wp-content/uploads/2017/07/501743.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "DSCI",
          description: "Certifications in data privacy and cybersecurity.",
          image:
            "https://wsr.pearsonvue.com/pvueImages/clients/dsci/dsci-logo.png",
          totalExams: 15,
          totalQuestions: 1800,
          isPopular: false,
        },
        {
          name: "Netskope",
          description: "Certifications in cloud security.",
          image:
            "https://go.netskope.com/rs/665-KFP-612/images/Netskope-Stacked-Logo-Full-Color-RGB.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "SANS",
          description: "Information security and cybersecurity certifications.",
          image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/SANS_Institute_Logo.svg/1200px-SANS_Institute_Logo.svg.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: true,
        },
      ],
    },
    {
      name: "Business Analysis & Privacy",
      providers: [
        {
          name: "IIBA",
          description: "Business analysis certifications.",
          image: "https://www.cdnlogo.com/logos/i/89/iiba.svg",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: true,
        },
        {
          name: "IIA",
          description: "Internal audit and risk management certifications.",
          image:
            "https://www.auditboard.com/img/elevate/logos/iia.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
        {
          name: "IAPP",
          description: "Certifications in privacy laws and data protection.",
          image:
            "https://i.pinimg.com/originals/f4/67/95/f4679577b1d9babfac7f27655648c258.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "ACAMS",
          description:
            "Certifications in anti-money laundering and financial crime prevention.",
          image:
            "https://eimf.eu/wp-content/uploads/2023/12/ACAMS-Logo_TM_RGB-3.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
      ],
    },
    {
      name: "Data Science & Analytics",
      providers: [
        {
          name: "SAS Institute",
          description: "Analytics and data management certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/SAS_logo_horiz.svg/1280px-SAS_logo_horiz.svg.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: true,
        },
        {
          name: "Tableau",
          description:
            "Certifications in data visualization and business intelligence.",
          image:
            "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Logo.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: true,
        },
        {
          name: "QlikView",
          description: "Data visualization and analytics certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Qlik_Logo.svg/2560px-Qlik_Logo.svg.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "Teradata",
          description:
            "Data warehousing and big data analytics certifications.",
          image:
            "https://images.credly.com/size/200x200/images/e44500f0-343f-4008-86d6-72c284b9a6dd/blob.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Cloudera",
          description: "Big data and machine learning platform certifications.",
          image:
            "https://cdn.freelogovectors.net/wp-content/uploads/2020/04/cloudera-logo.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
      ],
    },
    {
      name: "Software Development & Automation",
      providers: [
        {
          name: "Adobe",
          description:
            "Certifications for digital marketing and creative tools.",
          image:
            "https://images.credly.com/size/200x200/images/6975ffc1-5e18-4a37-96de-845dcd47e888/blob.png",
          totalExams: 60,
          totalQuestions: 7800,
          isPopular: true,
        },
        {
          name: "Autodesk",
          description: "CAD and 3D modeling software certifications.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Autodesk_Logo.svg/2560px-Autodesk_Logo.svg.png",
          totalExams: 40,
          totalQuestions: 5000,
          isPopular: true,
        },
        {
          name: "Blue Prism",
          description: "Robotic process automation (RPA) certifications.",
          image:
            "https://images.credly.com/size/200x200/images/e056d8c1-4527-4e45-8dbb-e809856f02fe/blob.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "Python Institute",
          description: "Python programming and development certifications.",
          image:
            "https://images.credly.com/size/200x200/images/92e71655-b3e2-464b-a524-0ae5a8cce418/blob.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: true,
        },
        {
          name: "Linux Foundation",
          description: "Open-source software and Linux certifications.",
          image:
            "https://images.credly.com/size/200x200/images/e6066b96-c59d-49b6-87cc-d8873022e84f/blob.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: true,
        },
        {
          name: "UiPath",
          description: "Robotic process automation (RPA) certifications.",
          image:
            "https://upload.wikimedia.org/wikipedia/en/8/80/UiPath_2019_Corporate_Logo.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Zend",
          description: "PHP development and web application certifications.",
          image:
            "https://logodix.com/logo/2073071.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "Appian",
          description:
            "Certifications in low-code development and automation platforms.",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Appian_Logo.svg/2560px-Appian_Logo.svg.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "C++ Institute",
          description: "Certifications in C++ programming.",
          image:
            "https://i2.wp.com/filipjaniszewski.com/wp-content/uploads/2016/12/C-PNG-Clipart.png?fit=550%2C380",
          totalExams: 15,
          totalQuestions: 1800,
          isPopular: false,
        },
        {
          name: "Sitecore",
          description: "Digital experience platform certifications.",
          image: "https://digitalaccountants.org/wp-content/uploads/2022/10/fullpurple.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "CertNexus",
          description: "Emerging technology certifications.",
          image: "https://www.prunderground.com/wp-content/uploads/2018/06/CertNexus-logo-SC.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },      
        {
          name: "iSAQB",
          description: "Software architecture certifications.",
          image: "https://www.isaqb.org/wp-content/uploads/2020/09/logo-isaqb-large-500x250.png",
          totalExams: 15,
          totalQuestions: 2000,
          isPopular: false,
        },
        {
          name: "Magento",
          description: "E-commerce platform certifications.",
          image: "https://clipart.info/images/ccovers/1499955338magento-logo-png.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "NI",
          description: "Engineering and scientific software certifications.",
          image: "https://download.logo.wine/logo/National_Instruments/National_Instruments-Logo.wine.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
      ],
    },
    {
      name: "Telecommunications & Collaboration",
      providers: [
        {
          name: "Avaya",
          description:
            "Telecommunications and communication solutions certifications.",
          image:
            "https://images.credly.com/size/200x200/images/b42613d7-cc70-4368-b75d-67fb69e022d1/blob.png",
          totalExams: 45,
          totalQuestions: 5800,
          isPopular: false,
        },
        {
          name: "Axis Communications",
          description:
            "Certifications in video surveillance and security solutions.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Axis_Communications_logo.svg/1200px-Axis_Communications_logo.svg.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
      ],
    },
    {
      name: "Quality Management & Process Improvement",
      providers: [
        {
          name: "APICS",
          description: "Supply chain and operations management certifications.",
          image: "https://www.ascm.org/globalassets/ascm_website_assets/img/apics-wide-opt.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: true,
        },
        {
          name: "Six Sigma",
          description:
            "Process improvement and quality management certifications.",
          image:
            "https://skillsetgroup.com/wp-content/uploads/2021/10/lean-six-sigma.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: true,
        },
        {
          name: "ASQ",
          description: "Certifications in quality assurance and improvement.",
          image:
            "https://seeklogo.com/images/A/ASQ-logo-F4B15A8A1F-seeklogo.com.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: false,
        },
      ],
    },
    {
      name: "Finance, Audit & Legal Compliance",
      providers: [
        {
          name: "GARP",
          description: "Risk management and financial certifications.",
          image:
            "https://uniqueglobaleducation.com/wp-content/uploads/2024/08/GARP_Logo_RGB-removebg-preview.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "FINRA",
          description:
            "Certifications in financial industry regulations and compliance.",
          image:
            "https://www.ftfnews.com/wp-content/uploads/2012/12/finra-logo.png?w=300",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "AICPA",
          description:
            "Certified public accountant and finance certifications.",
          image:
            "https://i.pinimg.com/originals/66/3f/31/663f31b4f9d5300514dc53497d782bed.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: true,
        },
        {
          name: "NACVA",
          description: "Certifications in valuation and financial forensics.",
          image:
            "https://s3.amazonaws.com/web.nacva.com/img/NACVA201210bw.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "NCMA",
          description:
            "Contract management and legal compliance certifications.",
          image:
            "https://www.ncmahq.org/images/about/ncma%20logo_new%20540pc_r%20(1).png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "AIWMI",
          description:
            "Wealth management and investment advisory certifications.",
          image:
            "https://www.epravesh.com/wp-content/uploads/2022/05/AIWMI.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "ABA",
          description: "Banking industry certifications and training.",
          image: "https://iconape.com/wp-content/files/io/350719/png/350719.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "ACFE",
          description: "Fraud examination and financial forensics certifications.",
          image: "https://cdn.prod.website-files.com/613a53a94111286b54741135/65527768fff9823a079d9d8d_ACFE_color.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
      ],
    },
    {
      name: "Other Certifications",
      providers: [
        {
          name: "ACSM",
          description: "Certifications in sports medicine and fitness.",
          image:
            "https://lifestylemedicine.org/wp-content/uploads/2022/06/american-college-sports-medicine.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "BACB",
          description: "Certifications in behavior analysis.",
          image:
            "https://surveygizmolibrary.s3.amazonaws.com/library/727799/BACBLogoWhiteBG1A.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "AHIMA",
          description: "Certifications in health information management.",
          image:
            "https://images.credly.com/size/200x200/images/bafbf8f1-3b2f-4a4d-8a39-ba8adcdc829a/AHIMA_sized.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "API",
          description: "Certifications in oil and gas industry standards.",
          image:
            "https://www.publicationstore.com/wp-content/uploads/2023/01/API.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "NFPA",
          description: "Fire protection and safety standards certifications.",
          image:
            "https://fleenorsecurity.com/wp-content/uploads/2016/09/nfpa-logo.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "English Test Preparation",
          description: "Certifications in English language proficiency.",
          image:
            "https://keystoneacademic-res.cloudinary.com/image/upload/element/20/204722_Picture1.png",
          totalExams: 40,
          totalQuestions: 5200,
          isPopular: true,
        },
        {
          name: "AHIP",
          description:
            "Certifications in health insurance and related industries.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/72/AHIP_%28America%27s_Health_Insurance_Plans%29_logo.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "AHLEI",
          description: "Certifications in hospitality management.",
          image:
            "https://static.wixstatic.com/media/3473f8_4316081d2cb84bad8e8687142e7cb5ac~mv2.png",
          totalExams: 20,
          totalQuestions: 2500,
          isPopular: false,
        },
        {
          name: "Logical Operations",
          description: "Certifications in IT skills and training.",
          image:
            "https://training.logicaloperations.com/w/content/d/YzvI0hFCJJ3DprOXx0KDQZjjOv2Xj9dV3lNVMo8by0HTLG6b/LO_logo_blue_transparent%20%28003%29.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "Unlimited",
          description: "IT certifications across a range of technologies.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Unlimited-logo.svg/1280px-Unlimited-logo.svg.png",
          totalExams: 50,
          totalQuestions: 6500,
          isPopular: false,
        },
        {
          name: "GMAC",
          description: "Certifications for graduate management education.",
          image:
            "https://mlt.org/wp-content/uploads/2015/11/GMAC-logo.png",
          totalExams: 15,
          totalQuestions: 1800,
          isPopular: false,
        },
        {
          name: "AAPC",
          description: "Medical coding and billing certifications.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aapc-logo-new.svg/800px-Aapc-logo-new.svg.png",
          totalExams: 35,
          totalQuestions: 4500,
          isPopular: false,
        },
        {
          name: "DMI",
          description: "Digital marketing and social media certifications.",
          image: "https://s3.us-east-1.amazonaws.com/accredible_temp_credential_images/15863432629855239733691747126974.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
        {
          name: "WorldatWork",
          description: "Total rewards and human resources certifications.",
          image: "https://www.strategicpay.co.nz/wp-content/uploads/2023/08/worldatwork_logo.png",
          totalExams: 25,
          totalQuestions: 3200,
          isPopular: false,
        },
        {
          name: "APSE",
          description: "Employment support and inclusion certifications.",
          image: "https://matchboxvirtual.com/wp-content/uploads/2020/05/logo-APSE-color-1.png",
          totalExams: 15,
          totalQuestions: 2000,
          isPopular: false,
        },
        {
          name: "GMAC",
          description: "Graduate management education assessments.",
          image: "https://mlt.org/wp-content/uploads/2015/11/GMAC-logo.png",
          totalExams: 10,
          totalQuestions: 1500,
          isPopular: false,
        },
        {
          name: "HAAD",
          description: "Healthcare practice and administration certifications.",
          image: "https://seeklogo.com/images/H/health-authority-abu-dhabi-logo-7DE14E5492-seeklogo.com.png",
          totalExams: 30,
          totalQuestions: 3800,
          isPopular: false,
        },
      ],
    },
  ];

  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 2;

  const categoryNames = categoriesData.map((category) => category.name);

  const filteredCategories = useMemo(() => {
    let filtered = categories;
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (category) => category.name === selectedCategory
      );
    }
    if (searchTerm) {
      filtered = filtered
        .map((category) => ({
          ...category,
          providers: category.providers.filter((provider) =>
            provider.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.providers.length > 0);
    }
    return filtered;
  }, [categories, selectedCategory, searchTerm]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage, categoriesPerPage]);

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  const renderContent = () => {
    if (paginatedCategories.length === 0) {
      return (
        <Center>
          <Box fontSize="xl" textAlign="center" marginY={8}>
            No providers found. Try adjusting your search or selected category.
          </Box>
        </Center>
      );
    } else {
      return (
        <VStack spacing={6} width="100%">
          {paginatedCategories.map((category, index) => (
            <Suspense key={index} fallback={<LoadingSpinner />}>
              <CategoryCard
                categoryName={category.name}
                providers={category.providers}
                view={view}
              />
            </Suspense>
          ))}
        </VStack>
      );
    }
  };

  return (
    <Container maxWidth="100%" paddingLeft={4} paddingRight={4}>
      <VStack spacing={8} align="stretch" width="100%">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          flexWrap="wrap"
        >
          <Input
            placeholder="Search providers..."
            size="lg"
            width={{ base: "100%", md: "400px" }}
            onChange={handleSearch}
          />
          <Flex alignItems="center" gap={4}>
            <Box width="250px">
              <CategoriesDropdown
                categories={categoryNames}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </Box>
            <Flex gap={2}>
              <IconBox
                icon={LuGrid}
                size="48px"
                iconScale={0.4}
                borderThickness={3}
                bgColor={view === "grid" ? "#b3ebf2" : "white"}
                onClick={() => setView("grid")}
              />
              <IconBox
                icon={LuList}
                size="48px"
                iconScale={0.4}
                borderThickness={3}
                bgColor={view === "list" ? "#b3ebf2" : "white"}
                onClick={() => setView("list")}
              />
            </Flex>
          </Flex>
        </Flex>
        {renderContent()}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </VStack>
    </Container>
  );
};

export default ProvidersPage;
