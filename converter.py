import re
import json
import os
import sys
from ast import literal_eval

def clean_url_strings(content):
    # Fix malformed URL strings like ""https"://example.com" to "https://example.com"
    def fix_url(match):
        url = match.group(0)
        # Remove extra quotes and fix the https part
        url = url.replace('""https":', '"https:')
        return url
    
    # Find and fix malformed URL patterns
    pattern = r'""https"://[^"]+?"'
    content = re.sub(pattern, fix_url, content)
    return content

def convert_js_object_to_python(content):
    # Add quotes around property names
    def quote_properties(match):
        prop = match.group(1)
        # Don't add quotes if they already exist
        if prop[0] not in ['"', "'"]:
            return f'"{prop}":'
        return match.group(0)
    
    # Convert JavaScript booleans to Python booleans
    content = content.replace('true', 'True').replace('false', 'False')
    
    # Add quotes around property names
    content = re.sub(r'(\w+):', quote_properties, content)
    
    # Clean up URL strings
    content = clean_url_strings(content)
    return content

def clean_js_to_python(content):
    try:
        # Extract just the array part
        match = re.search(r'categoriesData\s*=\s*(\[[\s\S]*\]);', content)
        if not match:
            raise ValueError("Could not find categoriesData array in the input file")
        
        array_content = match.group(1)
        
        # Convert JavaScript object notation to Python dict notation
        array_content = convert_js_object_to_python(array_content)
        
        # Clean up trailing commas
        array_content = re.sub(r',(\s*[\]}])', r'\1', array_content)
        
        # Save intermediate state for debugging
        with open('debug_clean.txt', 'w', encoding='utf-8') as f:
            f.write(array_content)
        
        try:
            # Parse the content as Python literal
            categories_data = literal_eval(array_content)
        except SyntaxError as se:
            print(f"Syntax error while parsing: {str(se)}")
            print("Problematic content around the error:")
            lines = array_content.splitlines()
            line_num = se.lineno - 1
            context_start = max(0, line_num - 2)
            context_end = min(len(lines), line_num + 3)
            for i in range(context_start, context_end):
                prefix = "-> " if i == line_num else "   "
                print(f"{prefix}{i+1}: {lines[i]}")
            raise
        
        # Clean up the categories data structure
        cleaned_content = []
        
        # Process each category
        for category in categories_data:
            cleaned_providers = []
            for provider in category['providers']:
                # Create new provider dict with only required fields
                cleaned_provider = {
                    'name': provider['name'],
                    'description': provider['description'],
                    'image': provider['image'],
                    'isPopular': provider['isPopular']
                }
                cleaned_providers.append(cleaned_provider)
            
            # Create new category dict
            cleaned_category = {
                'name': category['name'],
                'providers': cleaned_providers
            }
            cleaned_content.append(cleaned_category)
        
        return cleaned_content
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        print("\nDebug information:")
        print(f"Content type: {type(content)}")
        print("First 200 characters of content:")
        print(content[:200])
        sys.exit(1)

def save_as_python_file(categories, output_file='categories.py'):
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('categories = ')
            # Use custom formatting for better readability
            json_str = json.dumps(categories, indent=4)
            # Replace double quotes with single quotes for Python style
            formatted_str = json_str.replace('"', "'")
            # Ensure Python booleans are correctly formatted
            formatted_str = formatted_str.replace("'True'", "True").replace("'False'", "False")
            f.write(formatted_str)
            
            print(f"\nSample of generated content:")
            print("First category and provider:")
            if categories and categories[0]['providers']:
                print(json.dumps(categories[0]['providers'][0], indent=2))
    except Exception as e:
        print(f"Error saving file: {str(e)}")
        sys.exit(1)

def main():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define input and output file paths
    input_file = os.path.join(current_dir, 'categoriesData.txt')
    output_file = os.path.join(current_dir, 'categories.py')
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file 'categoriesData.txt' not found in {current_dir}")
        sys.exit(1)
    
    try:
        # Read the input file
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Remove BOM if present
            content = content.strip('\ufeff')
        
        # Convert the data
        cleaned_categories = clean_js_to_python(content)
        
        # Save to Python file
        save_as_python_file(cleaned_categories, output_file)
        
        print(f"\nConversion completed successfully!")
        print(f"Input file: {input_file}")
        print(f"Output file: {output_file}")
        
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()