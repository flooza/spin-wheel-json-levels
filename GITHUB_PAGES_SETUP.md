# GitHub Pages Deployment Guide

Your spin the wheel app is now ready for GitHub Pages! The configuration has been set up with static export enabled.

## Quick Deploy Steps

### 1. Build the App

```bash
npm run build
```

This creates an `out` directory with all static files.

### 2. Deploy to GitHub Pages

#### Option A: Using gh-pages package (Recommended)

Install gh-pages:
```bash
npm install -D gh-pages
```

Add to your `package.json` scripts:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d out"
}
```

Then deploy:
```bash
npm run deploy
```

#### Option B: Manual Git Deployment

```bash
git add out -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

### 3. Configure GitHub Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **gh-pages** branch
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## Using the Spin Wheel App

### Sample Data (Already Loaded)

**Level 1**: 8 colorful prizes with emojis
**Level 2**: 6 themed rewards

### Loading Custom JSON Data

1. Select **Level 1** or **Level 2**
2. Paste your JSON in the textarea
3. Click **"Load Data"**
4. Click **"SPIN THE WHEEL"** to play!

### JSON Format Example

```json
[
  { "label": "🎁 Grand Prize", "color": "#FF6B6B" },
  { "label": "💰 Cash Bonus", "color": "#4ECDC4" },
  { "label": "🎉 Free Spin", "color": "#45B7D1" },
  { "label": "⭐ Jackpot", "color": "#FFA07A" }
]
```

**Requirements:**
- Must be a JSON array
- Each item needs `label` (string) and `color` (hex code)
- Minimum 2 segments recommended

## Features

✅ **2 Independent Levels** - Switch between levels with different data
✅ **Beautiful Animations** - Smooth spinning with easing
✅ **Material Design** - Dark theme with elegant UI
✅ **JSON Data Input** - Load custom data dynamically
✅ **Responsive Design** - Works on desktop and mobile
✅ **GitHub Pages Ready** - Static export configured

## Troubleshooting

**Build Issues?**
- Make sure all dependencies are installed: `npm install`
- Clear cache: `rm -rf .next out`

**Site not loading on GitHub Pages?**
- Check that gh-pages branch exists
- Verify Pages settings point to gh-pages branch
- Wait a few minutes for deployment to complete

**Need to update data?**
- Just paste new JSON in the input and click "Load Data"
- Data persists per level until you reload the page

Enjoy your spin the wheel app! 🎡✨