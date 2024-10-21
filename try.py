import os

# Define all mappings for VMware
mappings = {
    'VMware': {
        '1v0-2120': 'VMware Certified Technical Associate - Application Modernization-code-1V0-2120',
        '1v0-3121': 'VMware Certified Technical Associate - Data Center Virtualization 2021-code-1V0-3121',
        '1v0-4120': 'VMware Certified Technical Associate - Security 2021-code-1V0-4120',
        '1v0-601': 'VMware Certified Associate 6 - Data Center Virtualization Fundamentals-code-1V0-601',
        '1v0-701': 'VMware Certified Associate 6 - Cloud Management and Automation Fundamentals-code-1V0-701',
        '1v0-7121': 'VMware Certified Technical Associate - Network Virtualization 2021-code-1V0-7121',
        '1v0-8120': 'VMware Certified Technical Associate - Security 2021-code-1V0-8120',
        '2v0-0119': 'VMware vSphere 6.x Foundations Exam 2019-code-2V0-0119',
        '2v0-2119': 'VMware Professional vSphere 6.x Exam-code-2V0-2119',
        '2v0-2119-pse': 'VMware Professional vSphere 6.x PSE Exam-code-2V0-2119-PSE',
        '2v0-2119d': 'VMware Professional vSphere 6.x Exam Delta-code-2V0-2119D',
        '2v0-2120': 'VMware Professional - Data Center Virtualization 2020-code-2V0-2120',
        '2v0-2123': 'VMware Professional - Data Center Virtualization 2023-code-2V0-2123',
        '2v0-3119': 'VMware Advanced Professional vSphere 6.x Exam-code-2V0-3119',
        '2v0-3120': 'VMware Professional - Cloud Management and Automation 2020-code-2V0-3120',
        '2v0-3121': 'VMware Professional - Cloud Management and Automation 2021-code-2V0-3121',
        '2v0-3123': 'VMware Professional - Cloud Management and Automation 2023-code-2V0-3123',
        '2v0-3322': 'VMware Professional - Application Modernization 2022-code-2V0-3322',
        '2v0-4119': 'VMware Professional - Network Virtualization 2019-code-2V0-4119',
        '2v0-4120': 'VMware Professional - Network Virtualization 2020-code-2V0-4120',
        '2v0-4123': 'VMware Professional - Network Virtualization 2023-code-2V0-4123',
        '2v0-5119': 'VMware Professional - Security 2019-code-2V0-5119',
        '2v0-5121': 'VMware Professional - Security 2021-code-2V0-5121',
        '2v0-5123': 'VMware Professional - Security 2023-code-2V0-5123',
        '2v0-602': 'VMware Certified Professional 6 - Data Center Virtualization-code-2V0-602',
        '2v0-6119': 'VMware Certified Professional 6.5 - Data Center Virtualization 2019-code-2V0-6119',
        '2v0-6120': 'VMware Certified Professional 6.7 - Data Center Virtualization 2020-code-2V0-6120',
        '2v0-620': 'VMware Certified Professional 6 - Cloud Management and Automation-code-2V0-620',
        '2v0-621': 'VMware Certified Professional 6 - Data Center Virtualization-code-2V0-621',
        '2v0-621d': 'VMware Certified Professional 6 - Data Center Virtualization Delta-code-2V0-621D',
        '2v0-622': 'VMware Certified Professional 6.5 - Data Center Virtualization-code-2V0-622',
        '2v0-6221': 'VMware Certified Professional 6.7 - Cloud Management and Automation 2021-code-2V0-6221',
        '2v0-6223': 'VMware Certified Professional - Cloud Management and Automation 2023-code-2V0-6223',
        '2v0-622d': 'VMware Certified Professional 6.5 - Data Center Virtualization Delta-code-2V0-622D',
        '2v0-642': 'VMware Certified Professional 6 - Network Virtualization-code-2V0-642',
        '2v0-651': 'VMware Certified Professional 6.5 - Network Virtualization-code-2V0-651',
        '2v0-7121': 'VMware Certified Professional - Network Virtualization 2021-code-2V0-7121',
        '2v0-7123': 'VMware Certified Professional - Network Virtualization 2023-code-2V0-7123',
        '2v0-7222': 'VMware Certified Professional - Network Virtualization 2022-code-2V0-7222',
        '2v0-731': 'VMware Certified Professional 6 - Cloud Management and Automation-code-2V0-731',
        '2v0-751': 'VMware Certified Professional 6 - Cloud Management and Automation-code-2V0-751',
        '2vb-601': 'VMware Certified Professional 6 - Virtualization and Cloud Infrastructure-code-2VB-601',
        '3v0-2121': 'VMware Advanced Professional - Data Center Virtualization Design 2021-code-3V0-2121',
        '3v0-3221': 'VMware Advanced Professional - Cloud Management and Automation Design 2021-code-3V0-3221',
        '3v0-4220': 'VMware Advanced Professional - Network Virtualization Design 2020-code-3V0-4220',
        '3v0-622': 'VMware Advanced Professional - Data Center Virtualization 6.5-code-3V0-622',
        '3v0-624': 'VMware Advanced Professional - Data Center Virtualization Design 6.7-code-3V0-624',
        '3v0-732': 'VMware Advanced Professional - Cloud Management and Automation Design 6.7-code-3V0-732',
        '3v0-752': 'VMware Advanced Professional - Cloud Management and Automation 6.7-code-3V0-752',
        '5v0-1121': 'VMware Certified Specialist - Application Modernization 2021-code-5V0-1121',
        '5v0-2119': 'VMware Specialist - Cloud Provider 2019-code-5V0-2119',
        '5v0-2120': 'VMware Specialist - Cloud Provider 2020-code-5V0-2120',
        '5v0-2121': 'VMware Specialist - Cloud Provider 2021-code-5V0-2121',
        '5v0-2221': 'VMware Specialist - Cloud Foundation 2021-code-5V0-2221',
        '5v0-2223': 'VMware Specialist - Cloud Foundation 2023-code-5V0-2223',
        '5v0-2320': 'VMware Specialist - Cloud Management and Automation 2020-code-5V0-2320',
        '5v0-3119': 'VMware Certified Advanced Professional - Cloud Provider 2019-code-5V0-3119',
        '5v0-3120': 'VMware Certified Advanced Professional - Cloud Provider 2020-code-5V0-3120',
        '5v0-3122': 'VMware Certified Advanced Professional - Cloud Provider 2022-code-5V0-3122',
        '5v0-3219': 'VMware Certified Advanced Professional - Data Center Virtualization 2019-code-5V0-3219',
        '5v0-3221': 'VMware Certified Advanced Professional - Data Center Virtualization 2021-code-5V0-3221',
        '5v0-3319': 'VMware Certified Advanced Professional - Network Virtualization 2019-code-5V0-3319',
        '5v0-3419': 'VMware Certified Advanced Professional - Security 2019-code-5V0-3419',
        '5v0-3521': 'VMware Certified Advanced Professional - Security 2021-code-5V0-3521',
        '5v0-4221': 'VMware Certified Advanced Professional - Cloud Foundation 2021-code-5V0-4221',
        '5v0-6119': 'VMware Certified Advanced Professional - Cloud Management and Automation 2019-code-5V0-6119',
        '5v0-6122': 'VMware Certified Advanced Professional - Cloud Management and Automation 2022-code-5V0-6122',
        '5v0-6219': 'VMware Certified Advanced Professional - Data Center Virtualization 2019-code-5V0-6219',
        '5v0-6222': 'VMware Certified Advanced Professional - Data Center Virtualization 2022-code-5V0-6222',
        '5v0-9120': 'VMware Certified Specialist - VMware Cloud on AWS 2020-code-5V0-9120',
        '5v0-9322': 'VMware Certified Specialist - Cloud Management and Automation 2022-code-5V0-9322',
    },
}

# Sanitize filenames by replacing invalid characters like colons
def sanitize_filename(filename):
    return filename.replace(":", "-").replace("/", "-")

# Define the base directory containing the provider folders
base_directory = 'backend/providers'

def rename_files_for_provider(provider, directory, mappings):
    provider_path = os.path.join(directory, provider)
    if not os.path.exists(provider_path):
        print(f"Directory {provider_path} does not exist!")
        return
    
    for filename in os.listdir(provider_path):
        # Split filename into exam_code and the __topic-X.json part
        parts = filename.split('__')
        
        if len(parts) != 2:
            continue  # Ignore files that don't have the expected format
        
        exam_code = parts[0]
        topic_part = parts[1]  # The part with __topic-X.json
        
        # Check if the exam code is in the mapping
        if exam_code in mappings:
            new_name = f"{sanitize_filename(mappings[exam_code])}__{topic_part}"
            old_path = os.path.join(provider_path, filename)
            new_path = os.path.join(provider_path, new_name)
            
            # Rename the file
            try:
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {new_name}")
            except FileNotFoundError:
                print(f"File not found: {old_path}")

# Run the renaming function for each provider
for provider, provider_mappings in mappings.items():
    rename_files_for_provider(provider, base_directory, provider_mappings)
