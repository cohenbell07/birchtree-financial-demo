# Blog System Setup Guide

This document explains the blog system added to Birchtree Financial.

## Overview

The blog system includes:
- **File-based MDX posts** in `/content/blog/*.mdx`
- **Dynamic routes** at `/blog` and `/blog/[slug]`
- **AI-powered post generation** via `/admin/generate-post`
- **Tag filtering** and SEO optimization
- **Full integration** with existing design system

## Blog Structure

### File Location
Blog posts are stored as MDX files in:
```
content/blog/
  ├── example-post.mdx
  ├── your-post.mdx
  └── ...
```

### Post Format

Each MDX file must include frontmatter:

```mdx
---
title: "Your Post Title"
description: "A brief description for SEO and previews"
publishedAt: "2024-01-15"
tags: ["Tag1", "Tag2", "Tag3"]
slug: "your-post-slug"
---

# Your Post Content

Write your post content here using Markdown syntax.

## Headings

Use standard Markdown headings.

### Subheadings

- Bullet points
- Lists
- **Bold text**

[Link to tools](/tools/risk-profiler)
```

## Features

### 1. Blog Index (`/blog`)
- Lists all published posts
- Tag filtering
- Responsive grid layout
- Matches site design system

### 2. Individual Posts (`/blog/[slug]`)
- Dynamic routing based on slug
- SEO metadata generation
- Markdown rendering with custom styling
- Internal link support

### 3. AI Post Generator (`/admin/generate-post`)
- Protected admin route
- Generates complete blog posts using OpenAI
- Auto-generates frontmatter and slug
- Saves directly to `/content/blog/`
- Requires `OPENAI_API_KEY` (gracefully degrades if not set)

## Usage

### Creating Posts Manually

1. Create a new `.mdx` file in `/content/blog/`
2. Add frontmatter with required fields
3. Write content in Markdown
4. Post will automatically appear on `/blog`

### Generating Posts with AI

1. Navigate to `/admin/generate-post`
2. Enter a topic (e.g., "RRSP deadlines for 2024")
3. Enter admin secret if `ADMIN_DASHBOARD_SECRET` is set
4. Click "Generate Blog Post"
5. Post is automatically saved and can be viewed at `/blog/[slug]`

### Required Environment Variables

```bash
# Optional: For AI post generation
OPENAI_API_KEY=your_openai_key

# Optional: For protecting admin routes
ADMIN_DASHBOARD_SECRET=your_secret
```

## Integration

### Navigation
- Blog link added to main navigation
- Accessible from `/blog`

### Resources Page
- Blog section added to Resources page
- Link to `/blog` with description

### Design Consistency
- All blog pages use existing design system
- Matches card styles, colors, spacing
- Mobile responsive
- Premium glass effects and shadows

## Markdown Features

Posts support:
- Headings (H1, H2, H3)
- Bold and italic text
- Lists (ordered and unordered)
- Links (internal and external)
- Code blocks
- Tables (via remark-gfm)

## Internal Linking

Link to tools and pages:
```markdown
[Risk Profiler](/tools/risk-profiler)
[Retirement Calculator](/tools/retirement-calculator)
[Contact Us](/contact)
```

## SEO

Each post automatically generates:
- Title: `{Post Title} | Birchtree Financial Blog`
- Description: From frontmatter
- Open Graph tags
- Article metadata

## Non-Breaking Design

- Blog works even with no posts (shows friendly message)
- AI generator shows helpful message if OpenAI not configured
- All routes gracefully handle missing content
- No impact on existing pages or functionality

## Future Enhancements

The blog system is designed to be extended with:
- Author profiles
- Related posts
- Search functionality
- RSS feed
- Newsletter integration
- Comment system (if needed)

## Troubleshooting

### Posts not appearing
- Check file is in `/content/blog/` directory
- Verify frontmatter is correctly formatted
- Ensure slug is unique
- Check file extension is `.mdx`

### AI generation fails
- Verify `OPENAI_API_KEY` is set
- Check API key is valid
- Review console for error messages
- System will show friendly error message

### Markdown not rendering
- Ensure `react-markdown` and `remark-gfm` are installed
- Check content follows Markdown syntax
- Verify no syntax errors in MDX file

