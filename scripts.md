# InkAI Studio - Development Scripts Guide

## Table of Contents
- [Overview](#overview)
- [Development Scripts](#development-scripts)
- [Build Scripts](#build-scripts)
- [Testing Scripts](#testing-scripts)
- [Database Scripts](#database-scripts)
- [Deployment Scripts](#deployment-scripts)
- [Utility Scripts](#utility-scripts)
- [Troubleshooting](#troubleshooting)

## Overview

This guide provides comprehensive documentation for all development scripts used in InkAI Studio. Each script is designed to streamline specific aspects of the development workflow, from local development to production deployment.

## Development Scripts

### `npm run dev`
**Purpose:** Start the development server with hot module replacement

**Command:**
```bash
npm run dev
# or
yarn dev
```

**Prerequisites:**
- Node.js 18.0 or higher
- All dependencies installed (`npm install`)
- Environment variables configured (`.env.local`)

**Expected Outcome:**
- Vite development server starts on `http://localhost:5173`
- Hot module replacement enabled for instant updates
- TypeScript compilation in watch mode
- Tailwind CSS compilation with JIT mode

**Performance Considerations:**
- Initial startup: 2-3 seconds
- Hot reload speed: <100ms for most changes
- Memory usage: ~200-300MB

**Common Errors & Solutions:**
```bash
# Port already in use
Error: Port 5173 is already in use
Solution: Use alternative port with --port flag
npm run dev -- --port 3000

# TypeScript errors
Error: Type checking failed
Solution: Fix TypeScript errors or run with --no-typescript-check
npm run dev -- --no-typescript-check

# Missing environment variables
Error: Missing required environment variables
Solution: Copy .env.example to .env.local and configure
```

### `npm run dev:debug`
**Purpose:** Start development server with detailed debugging information

**Command:**
```bash
npm run dev:debug
```

**Features:**
- Verbose logging enabled
- Source maps with detailed information
- Performance profiling
- Bundle analysis output

**Expected Output:**
```
✓ Vite dev server running at http://localhost:5173
✓ TypeScript compilation successful
✓ Tailwind CSS compiled (234 utilities)
✓ Hot reload ready
```

## Build Scripts

### `npm run build`
**Purpose:** Create optimized production build

**Command:**
```bash
npm run build
```

**Build Process:**
1. **Type Checking** - Validates all TypeScript files
2. **Asset Optimization** - Minifies JavaScript, CSS, and images
3. **Bundle Splitting** - Creates optimized chunks for better caching
4. **Tree Shaking** - Removes unused code
5. **Static Analysis** - Generates build reports

**Prerequisites:**
- Clean working directory
- All TypeScript errors resolved
- Valid environment configuration

**Expected Outcome:**
- `dist/` folder created with optimized assets
- Build size typically: 800KB-1.2MB (gzipped)
- Build time: 30-60 seconds

**Performance Metrics:**
```
Build Summary:
├── JavaScript: 850KB (300KB gzipped)
├── CSS: 120KB (25KB gzipped)
├── Images: 200KB (optimized)
└── Fonts: 45KB (cached)

Total Build Size: 1.2MB
Gzipped: 370KB
```

**Common Build Errors:**
```bash
# TypeScript compilation errors
Error: TS2345: Argument of type 'string' is not assignable
Solution: Fix TypeScript type errors

# Missing dependencies
Error: Module not found: Can't resolve 'module-name'
Solution: Install missing dependency with npm install

# Environment variable issues
Error: Environment variable not defined
Solution: Ensure all required variables are set
```

### `npm run build:analyze`
**Purpose:** Build with bundle analysis and performance insights

**Command:**
```bash
npm run build:analyze
```

**Features:**
- Bundle size analysis
- Dependency tree visualization
- Performance recommendations
- Dead code detection

**Generated Reports:**
- `dist/stats.html` - Interactive bundle analyzer
- `dist/lighthouse-report.html` - Performance audit
- `dist/bundle-report.json` - Raw bundle data

### `npm run preview`
**Purpose:** Preview production build locally

**Command:**
```bash
npm run preview
```

**Prerequisites:**
- Successful production build (`npm run build`)
- Port 4173 available

**Expected Outcome:**
- Local server starts on `http://localhost:4173`
- Serves optimized production assets
- Simulates production environment

## Testing Scripts

### `npm run test`
**Purpose:** Run unit and integration tests

**Command:**
```bash
npm run test
```

**Test Categories:**
- **Unit Tests** - Component and utility function testing
- **Integration Tests** - Feature workflow testing
- **Snapshot Tests** - UI regression testing

**Expected Output:**
```
Test Suites: 15 passed, 15 total
Tests: 87 passed, 87 total
Snapshots: 12 passed, 12 total
Time: 8.456s
Coverage: 85.2% statements, 78.9% branches
```

**Coverage Thresholds:**
- Statements: >80%
- Branches: >75%
- Functions: >80%
- Lines: >80%

### `npm run test:watch`
**Purpose:** Run tests in watch mode for development

**Command:**
```bash
npm run test:watch
```

**Features:**
- Automatic re-running on file changes
- Interactive test filtering
- Coverage reporting
- Failed test focusing

### `npm run test:coverage`
**Purpose:** Generate detailed coverage reports

**Command:**
```bash
npm run test:coverage
```

**Generated Reports:**
- `coverage/lcov-report/index.html` - Interactive coverage report
- `coverage/coverage-summary.json` - Coverage data
- Console output with coverage percentages

## Database Scripts

### `npm run db:migrate`
**Purpose:** Apply database migrations

**Command:**
```bash
npm run db:migrate
```

**Prerequisites:**
- Supabase CLI installed
- Database connection configured
- Migration files in `supabase/migrations/`

**Process:**
1. Connects to Supabase database
2. Checks migration status
3. Applies pending migrations
4. Updates migration history

**Expected Output:**
```
Applying migration: 20241213000001_create_artist_system.sql
✓ Migration applied successfully
Database schema updated
```

### `npm run db:reset`
**Purpose:** Reset database to initial state

**Command:**
```bash
npm run db:reset
```

**⚠️ Warning:** This will delete all data in the database

**Process:**
1. Drops all tables and data
2. Reapplies all migrations
3. Seeds with initial data (if available)

### `npm run db:seed`
**Purpose:** Populate database with sample data

**Command:**
```bash
npm run db:seed
```

**Sample Data Includes:**
- Test user accounts
- Sample artist profiles
- Portfolio items
- Design examples

### `npm run db:types`
**Purpose:** Generate TypeScript types from database schema

**Command:**
```bash
npm run db:types
```

**Process:**
1. Analyzes database schema
2. Generates TypeScript interfaces
3. Updates `src/integrations/supabase/types.ts`

**Expected Outcome:**
- Updated type definitions
- Better TypeScript intellisense
- Type safety for database operations

## Deployment Scripts

### `npm run deploy:staging`
**Purpose:** Deploy to staging environment

**Command:**
```bash
npm run deploy:staging
```

**Process:**
1. Runs production build
2. Uploads assets to staging CDN
3. Updates staging environment
4. Runs smoke tests

**Prerequisites:**
- Staging environment configured
- Deployment credentials set
- Build passing all tests

### `npm run deploy:production`
**Purpose:** Deploy to production environment

**Command:**
```bash
npm run deploy:production
```

**Process:**
1. Creates production build
2. Runs full test suite
3. Deploys to production
4. Performs health checks
5. Sends deployment notifications

**Safety Checks:**
- All tests must pass
- No TypeScript errors
- Environment variables validated
- Database migrations applied

## Utility Scripts

### `npm run lint`
**Purpose:** Check code quality and formatting

**Command:**
```bash
npm run lint
```

**Checks:**
- ESLint rules compliance
- TypeScript type checking
- Code formatting (Prettier)
- Import/export validation

**Fix Mode:**
```bash
npm run lint:fix
```

### `npm run type-check`
**Purpose:** Validate TypeScript types without building

**Command:**
```bash
npm run type-check
```

**Benefits:**
- Fast type validation
- No file output
- CI/CD integration friendly
- Pre-commit hook compatible

### `npm run clean`
**Purpose:** Clean build artifacts and cache

**Command:**
```bash
npm run clean
```

**Cleans:**
- `dist/` build output
- `node_modules/.cache/` build cache
- TypeScript cache files
- Test coverage reports

**When to Use:**
- Build artifacts are corrupted
- Switching between branches
- Debugging build issues
- Preparing for clean builds

## Troubleshooting

### Common Script Issues

#### Node Version Conflicts
```bash
Error: The engine "node" is incompatible with this module
Solution: Use Node.js version 18 or higher
```

#### Permission Issues
```bash
Error: EACCES: permission denied
Solution: Check file permissions or use npm with --unsafe-perm
```

#### Port Conflicts
```bash
Error: Port 5173 is already in use
Solution: Kill existing process or use different port
lsof -ti:5173 | xargs kill -9
```

#### Memory Issues
```bash
Error: JavaScript heap out of memory
Solution: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Performance Optimization

#### Faster Development Builds
```bash
# Disable type checking for faster rebuilds
npm run dev -- --no-typescript-check

# Skip unused imports
npm run dev -- --skip-unused-imports
```

#### Optimized Production Builds
```bash
# Enable aggressive optimization
npm run build -- --optimize

# Use modern browser targets only
npm run build -- --target=es2022
```

### Script Customization

#### Custom Development Server
```json
{
  "scripts": {
    "dev:custom": "vite --port 3000 --host 0.0.0.0 --open"
  }
}
```

#### Environment-Specific Builds
```json
{
  "scripts": {
    "build:staging": "NODE_ENV=staging npm run build",
    "build:production": "NODE_ENV=production npm run build"
  }
}
```

### Monitoring and Debugging

#### Script Performance Monitoring
```bash
# Time script execution
time npm run build

# Monitor memory usage
npm run build -- --profile

# Verbose output
npm run build -- --verbose
```

#### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Node.js debugging
node --inspect npm run test
```

---

**Best Practices:**
- Always run tests before deployment
- Use specific script versions in CI/CD
- Monitor script performance regularly
- Keep scripts simple and focused
- Document custom script modifications

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintainer:** InkAI Studio Team