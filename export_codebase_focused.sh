#!/bin/bash

OUTPUT_FILE="codebase_for_review.md"

# Clear existing file
echo "# Portfolio Codebase - For AI Review" > "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## Project Overview" >> "$OUTPUT_FILE"
echo "React/TypeScript portfolio for an independent architecture consultant." >> "$OUTPUT_FILE"
echo "Recent changes: Repositioned from AI product to consulting-focused site." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Generating $OUTPUT_FILE (excluding backups and node_modules)..."

# Find files excluding backups, node_modules, dist, etc.
find . \
  -type f \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.json" -o -name "*.css" -o -name "*.md" -o -name "*.html" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/.git/*" \
  -not -path "*/.gemini/*" \
  -not -path "*/src_backup_*/*" \
  -not -path "*/.reverts/*" \
  -not -name "package-lock.json" \
  -not -name "full_codebase_context.md" \
  -not -name "$OUTPUT_FILE" \
  | grep -E "^\./src/|^\./server/|^\./package\.json|^\./README\.md|^\./SETUP\.md|^\./tailwind\.config\.js|^\./tsconfig|^\./vite\.config|^\./index\.html|^\./postcss\.config" \
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

FILE_SIZE=$(wc -l < "$OUTPUT_FILE" | xargs)
FILE_BYTES=$(wc -c < "$OUTPUT_FILE" | xargs)

echo ""
echo "✅ Done! Generated '$OUTPUT_FILE'"
echo "   Lines: $FILE_SIZE"
echo "   Size: $(numfmt --to=iec-i --suffix=B $FILE_BYTES 2>/dev/null || echo "${FILE_BYTES} bytes")"
echo ""
echo "📋 Next steps:"
echo "   1. Upload this file to Claude Desktop (drag & drop) or ChatGPT (paste sections)"
echo "   2. Or use: 'cat $OUTPUT_FILE | pbcopy' to copy to clipboard"
echo "   3. Ask for feedback on: code structure, best practices, UX improvements, etc."
