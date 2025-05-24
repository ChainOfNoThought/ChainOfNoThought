#!/bin/bash
# Build validation script for GitHub Pages Jekyll site
# Run this before pushing to catch common issues early

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Jekyll Site Build Validation ===${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "_config.yml" ]; then
    echo -e "${RED}Error: _config.yml not found. Are you in the right directory?${NC}"
    exit 1
fi

# Check Ruby and Bundler
echo -e "${YELLOW}Checking Ruby environment...${NC}"
ruby --version
bundle --version

# Install/update dependencies
echo -e "${YELLOW}Installing/updating dependencies...${NC}"
bundle install --quiet

# Clean previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
bundle exec jekyll clean

# Build the site
echo -e "${YELLOW}Building site...${NC}"
JEKYLL_ENV=production bundle exec jekyll build

# Check if build succeeded
if [ -d "_site" ]; then
    echo -e "${GREEN}✓ Site built successfully${NC}"
else
    echo -e "${RED}✗ Build failed - _site directory not created${NC}"
    exit 1
fi

# Check site size
echo -e "${YELLOW}Checking site size...${NC}"
SITE_SIZE=$(du -sb _site 2>/dev/null | cut -f1)
SITE_SIZE_MB=$((SITE_SIZE / 1024 / 1024))
MAX_SIZE_MB=950

if [ $SITE_SIZE_MB -gt $MAX_SIZE_MB ]; then
    echo -e "${RED}✗ WARNING: Site size exceeds 950MB (current: ${SITE_SIZE_MB}MB)${NC}"
    echo -e "${RED}  GitHub Pages has a 1GB limit${NC}"
    echo ""
    echo "Largest files:"
    find _site -type f -size +5M -exec ls -lh {} \; | sort -k5 -rh | head -10
else
    echo -e "${GREEN}✓ Site size OK: ${SITE_SIZE_MB}MB (under 950MB)${NC}"
fi

# Check for large files
echo -e "${YELLOW}Checking for large files...${NC}"
LARGE_FILES=$(find _site -type f -size +25M 2>/dev/null)
if [ ! -z "$LARGE_FILES" ]; then
    echo -e "${YELLOW}⚠ Warning: Files over 25MB found:${NC}"
    echo "$LARGE_FILES"
else
    echo -e "${GREEN}✓ No files over 25MB${NC}"
fi

# Basic HTML validation (if htmlproofer is available)
if command -v htmlproofer &> /dev/null; then
    echo -e "${YELLOW}Running HTML validation...${NC}"
    bundle exec htmlproofer ./_site \
        --disable-external \
        --allow-hash-href \
        --assume-extension \
        --typhoeus-config '{"timeout":5}' || echo -e "${YELLOW}⚠ HTML validation found some issues (non-critical)${NC}"
else
    echo -e "${BLUE}ℹ Skipping HTML validation (htmlproofer not installed)${NC}"
fi

# Check front matter in content files
echo -e "${YELLOW}Checking content files...${NC}"
ERROR_COUNT=0

# Check posts
for file in _posts/*.md; do
    if [ -f "$file" ]; then
        if ! grep -q "^---" "$file"; then
            echo -e "${RED}✗ Missing front matter in: $file${NC}"
            ((ERROR_COUNT++))
        fi
    fi
done

# Check creative writing
for file in _creative_writing/*.md; do
    if [ -f "$file" ]; then
        if ! grep -q "^---" "$file"; then
            echo -e "${RED}✗ Missing front matter in: $file${NC}"
            ((ERROR_COUNT++))
        fi
    fi
done

if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "${GREEN}✓ All content files have front matter${NC}"
fi

# Summary
echo ""
echo -e "${BLUE}=== Build Validation Summary ===${NC}"
echo -e "Site size: ${SITE_SIZE_MB}MB"
echo -e "Posts: $(find _posts -name "*.md" 2>/dev/null | wc -l)"
echo -e "Creative writing: $(find _creative_writing -name "*.md" 2>/dev/null | wc -l)"
echo -e "Images: $(find assets/images -type f 2>/dev/null | wc -l)"

# Test local server
echo ""
echo -e "${BLUE}To test your site locally, run:${NC}"
echo "bundle exec jekyll serve"
echo "Then visit: http://localhost:4000/ChainOfNoThought"

echo ""
echo -e "${GREEN}✓ Validation complete!${NC}" 