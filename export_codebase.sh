#!/bin/bash

OUTPUT_FILE="full_codebase_context.md"

# Clear existing file
echo "# Full Codebase Context" > "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Generating $OUTPUT_FILE..."

# Define files/directories to include
# We exclude node_modules, dist, .git, .gemini, images, and lock files
find . \
  -type f \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.json" -o -name "*.css" -o -name "*.md" -o -name "*.html" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/.git/*" \
  -not -path "*/.gemini/*" \
  -not -name "package-lock.json" \
  -not -name "$OUTPUT_FILE" \
  | sort | while read -r file; do
  
  echo "Processing $file..."
  
  # Add file header
  echo "" >> "$OUTPUT_FILE"
  echo "## File: $file" >> "$OUTPUT_FILE"
  echo "\`\`\`${file##*.}" >> "$OUTPUT_FILE"
  
  # Add file content
  cat "$file" >> "$OUTPUT_FILE"
  
  # Add file footer
  echo "" >> "$OUTPUT_FILE"
  echo "\`\`\`" >> "$OUTPUT_FILE"
  
done

echo "Done! You can now upload '$OUTPUT_FILE' to Claude."
