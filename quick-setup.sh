#!/bin/bash
# Quick setup script for ChainOfNoThought Jekyll site
# This helps configure the site after cloning

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== ChainOfNoThought Quick Setup ===${NC}"
echo ""

# Get GitHub username
echo -e "${YELLOW}Enter your GitHub username:${NC}"
read -r GITHUB_USERNAME

# Update README.md with actual username
echo -e "${YELLOW}Updating README with your username...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\[YOUR-USERNAME\]/$GITHUB_USERNAME/g" README.md
else
    # Linux/Windows Git Bash
    sed -i "s/\[YOUR-USERNAME\]/$GITHUB_USERNAME/g" README.md
fi

# Get author name
echo -e "${YELLOW}Enter your name (for posts):${NC}"
read -r AUTHOR_NAME

# Update _config.yml with author name
echo -e "${YELLOW}Updating config with your name...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/Your Name/$AUTHOR_NAME/g" _config.yml
else
    # Linux/Windows Git Bash
    sed -i "s/Your Name/$AUTHOR_NAME/g" _config.yml
fi

# Optional: Get email
echo -e "${YELLOW}Enter your email (optional, press Enter to skip):${NC}"
read -r AUTHOR_EMAIL

if [ ! -z "$AUTHOR_EMAIL" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/your-email@example.com/$AUTHOR_EMAIL/g" _config.yml
    else
        sed -i "s/your-email@example.com/$AUTHOR_EMAIL/g" _config.yml
    fi
fi

# Install dependencies
echo -e "${YELLOW}Installing Ruby dependencies...${NC}"
bundle install

# Create .nojekyll for faster builds (optional)
touch .nojekyll

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review and customize _config.yml if needed"
echo "2. Update about.md with your information"
echo "3. Remove sample content when ready"
echo "4. Run ./validate-build.sh to test the build"
echo "5. Commit and push to deploy!"
echo ""
echo -e "${BLUE}Your site will be available at:${NC}"
echo "https://$GITHUB_USERNAME.github.io/ChainOfNoThought"
echo ""
echo -e "${YELLOW}To test locally:${NC}"
echo "bundle exec jekyll serve" 