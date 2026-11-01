# nathanhealea.com

Personal website built with Astro. Content lives in markdown files with frontmatter.

The `main` branch holds the previous Hugo site, which is still live. The Astro rebuild happens on `v10` until cutover.

## Work Item Workflow

- base_branch: v10
- test_command: npm test
- verify_commands:
  - npm run typecheck
  - npm run build
  - npm test
  - npm run test:e2e
