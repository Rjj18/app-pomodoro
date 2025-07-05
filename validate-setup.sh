#!/bin/bash

# Simple validation script for the Copilot Issue Solver workflow
# This script checks if all required files are in place and properly configured

echo "🔍 Validating Copilot Issue Solver Setup..."
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "script.js" ] || [ ! -f "style.css" ]; then
    echo "❌ Error: Not in the app-pomodoro project root directory"
    echo "   Expected files: index.html, script.js, style.css"
    exit 1
fi

echo "✅ Project files found (index.html, script.js, style.css)"

# Check if .github/workflows directory exists
if [ ! -d ".github/workflows" ]; then
    echo "❌ Error: .github/workflows directory not found"
    exit 1
fi

echo "✅ .github/workflows directory exists"

# Check for workflow files
WORKFLOW_FILES=(
    ".github/workflows/copilot-solver.yml"
    ".github/workflows/test-solver.yml"
    ".github/workflows/COPILOT_WORKFLOW.md"
)

for file in "${WORKFLOW_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found: $file"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

# Validate YAML syntax (if yamllint is available)
if command -v yamllint &> /dev/null; then
    echo ""
    echo "🔍 Validating YAML syntax..."
    
    for yml_file in .github/workflows/*.yml; do
        if yamllint "$yml_file" &> /dev/null; then
            echo "✅ YAML syntax valid: $yml_file"
        else
            echo "❌ YAML syntax error in: $yml_file"
            yamllint "$yml_file"
            exit 1
        fi
    done
else
    echo "⚠️  yamllint not available, skipping YAML validation"
fi

# Test basic project structure
echo ""
echo "🔍 Validating project structure..."

# Check HTML structure
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ Valid HTML5 doctype found"
else
    echo "❌ HTML5 doctype missing"
fi

if grep -q 'id="timer"' index.html; then
    echo "✅ Timer element found in HTML"
else
    echo "❌ Timer element missing in HTML"
fi

# Check JavaScript structure  
if grep -q "function startTimer" script.js; then
    echo "✅ startTimer function found"
else
    echo "❌ startTimer function missing"
fi

if grep -q "addEventListener" script.js; then
    echo "✅ Event listeners found"
else
    echo "❌ Event listeners missing"
fi

# Check CSS structure
if grep -q "hacker-theme" style.css; then
    echo "✅ Theme system found in CSS"
else
    echo "❌ Theme system missing in CSS"
fi

echo ""
echo "=============================================="
echo "🎉 Setup validation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push these workflow files"
echo "2. Test using Actions > 'Test Copilot Solver'"
echo "3. Create an issue with 'copilot-solve' label"
echo "4. Watch the automated workflow in action!"
echo ""
echo "📖 Read COPILOT_WORKFLOW.md for detailed usage instructions"