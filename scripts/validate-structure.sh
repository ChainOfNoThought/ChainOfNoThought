#!/bin/bash

# ChainOfNoThought Structure Validation Script
# Validates that all files are properly organized and wired after reorganization

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 ChainOfNoThought Structure Validation${NC}"
echo "=================================================="

# Track validation results
ERRORS=0
WARNINGS=0

# Function to log errors
log_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    ((ERRORS++))
}

# Function to log warnings
log_warning() {
    echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
    ((WARNINGS++))
}

# Function to log success
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to log info
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo
log_info "Checking core Jekyll structure..."

# Check essential Jekyll files
REQUIRED_FILES=(
    "_config.yml"
    "index.md"
    "Gemfile"
    ".gitignore"
    "404.html"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found required file: $file"
    else
        log_error "Missing required file: $file"
    fi
done

echo
log_info "Checking layout structure..."

# Check layouts
LAYOUT_FILES=(
    "_layouts/default.html"
    "_layouts/post.html"
)

for file in "${LAYOUT_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found layout: $file"
        
        # Check for proper liquid templating
        if grep -q "{{ content }}" "$file"; then
            log_success "  Layout contains content placeholder"
        else
            log_warning "  Layout missing {{ content }} placeholder"
        fi
    else
        log_error "Missing layout: $file"
    fi
done

echo
log_info "Checking includes structure..."

# Check includes
INCLUDE_FILES=(
    "_includes/head.html"
    "_includes/header.html"
    "_includes/footer.html"
    "_includes/components/quote-styles.css"
    "_includes/scripts/random-quote.js"
)

for file in "${INCLUDE_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found include: $file"
    else
        log_error "Missing include: $file"
    fi
done

echo
log_info "Checking assets structure..."

# Check assets
ASSET_FILES=(
    "assets/css/style.scss"
    "assets/js/settings.js"
)

for file in "${ASSET_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found asset: $file"
    else
        log_error "Missing asset: $file"
    fi
done

# Check asset directories
ASSET_DIRS=(
    "assets/css"
    "assets/js"
    "assets/images"
)

for dir in "${ASSET_DIRS[@]}"; do
    if [[ -d "$dir" ]]; then
        log_success "Found asset directory: $dir"
    else
        log_error "Missing asset directory: $dir"
    fi
done

echo
log_info "Checking content collections..."

# Check collections
COLLECTION_DIRS=(
    "_thoughts"
    "_stories"
    "_data"
)

for dir in "${COLLECTION_DIRS[@]}"; do
    if [[ -d "$dir" ]]; then
        log_success "Found collection: $dir"
        
        # Count files in collection
        file_count=$(find "$dir" -name "*.md" | wc -l)
        log_info "  Contains $file_count markdown files"
    else
        log_error "Missing collection: $dir"
    fi
done

echo
log_info "Checking documentation structure..."

# Check documentation
DOC_STRUCTURE=(
    "docs/README.md"
    "docs/guides/maintenance_guide.md"
    "docs/guides/IMAGE_GUIDE.md"
    "docs/reference/implementation_plan.md"
)

for file in "${DOC_STRUCTURE[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found documentation: $file"
    else
        log_error "Missing documentation: $file"
    fi
done

echo
log_info "Checking page files..."

# Check main pages
PAGE_FILES=(
    "about.md"
    "thoughts.md"
    "stories.md"
    "prosterity.md"
)

for file in "${PAGE_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "Found page: $file"
        
        # Check for front matter
        if head -n 1 "$file" | grep -q "^---$"; then
            log_success "  Page has front matter"
        else
            log_warning "  Page missing front matter"
        fi
    else
        log_error "Missing page: $file"
    fi
done

echo
log_info "Checking configuration..."

# Check _config.yml for essential settings
if [[ -f "_config.yml" ]]; then
    # Check for collections
    if grep -q "collections:" "_config.yml"; then
        log_success "Configuration defines collections"
    else
        log_error "Configuration missing collections"
    fi
    
    # Check for baseurl
    if grep -q "baseurl:" "_config.yml"; then
        log_success "Configuration defines baseurl"
    else
        log_warning "Configuration missing baseurl"
    fi
    
    # Check for exclude list
    if grep -q "exclude:" "_config.yml"; then
        log_success "Configuration has exclude list"
        
        # Check if docs are excluded
        if grep -A 10 "exclude:" "_config.yml" | grep -q "docs/"; then
            log_success "  Documentation directory excluded from build"
        else
            log_warning "  Documentation directory not excluded from build"
        fi
    else
        log_warning "Configuration missing exclude list"
    fi
fi

echo
log_info "Checking file references..."

# Check if default.html references settings.js
if [[ -f "_layouts/default.html" ]]; then
    if grep -q "settings.js" "_layouts/default.html"; then
        log_success "Default layout references settings.js"
    else
        log_warning "Default layout doesn't reference settings.js"
    fi
fi

# Check if footer references moved includes
if [[ -f "_includes/footer.html" ]]; then
    if grep -q "components/quote-styles.css" "_includes/footer.html"; then
        log_success "Footer references reorganized quote styles"
    else
        log_warning "Footer may not reference reorganized quote styles"
    fi
    
    if grep -q "scripts/random-quote.js" "_includes/footer.html"; then
        log_success "Footer references reorganized quote script"
    else
        log_warning "Footer may not reference reorganized quote script"
    fi
fi

echo
log_info "Checking for redundant files..."

# Check for files that might be duplicates or no longer needed
POTENTIAL_REDUNDANT=(
    "maintenance_guide.md"  # Should be in docs/guides/
    "implementation_plan.md"  # Should be in docs/reference/
    "_includes/quote-styles.css"  # Should be in components/
    "_includes/random-quote.js"   # Should be in scripts/
)

for file in "${POTENTIAL_REDUNDANT[@]}"; do
    if [[ -f "$file" ]]; then
        log_warning "Potentially redundant file found: $file"
    fi
done

echo
echo "=================================================="
log_info "Validation Summary"
echo "=================================================="

if [[ $ERRORS -eq 0 ]]; then
    log_success "No errors found! ✨"
else
    log_error "Found $ERRORS error(s)"
fi

if [[ $WARNINGS -eq 0 ]]; then
    log_success "No warnings"
else
    log_warning "Found $WARNINGS warning(s)"
fi

echo
if [[ $ERRORS -eq 0 ]]; then
    log_success "Repository structure validation passed! 🎉"
    echo -e "${GREEN}The ChainOfNoThought repository is properly organized.${NC}"
    exit 0
else
    log_error "Repository structure validation failed!"
    echo -e "${RED}Please fix the errors above before proceeding.${NC}"
    exit 1
fi 