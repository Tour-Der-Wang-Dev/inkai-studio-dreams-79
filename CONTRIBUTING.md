# Contributing to InkAI Studio

Thank you for your interest in contributing to InkAI Studio! This document provides guidelines and information for contributors.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Access to development environment

### Local Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/inkai-studio.git`
3. Install dependencies: `npm install`
4. Copy environment variables: `cp .env.example .env.local`
5. Start development server: `npm run dev`

## Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Message Format
Follow conventional commits specification:
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(auth): add social login functionality`
- `fix(canvas): resolve drawing tool selection bug`
- `docs(api): update authentication endpoints`

## Code Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define proper interfaces and types
- Use meaningful variable and function names
- Prefer explicit return types for functions

### React Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Follow component composition patterns
- Use memo/useMemo for performance optimization

### Styling Guidelines
- Use Tailwind CSS semantic tokens
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theming

### File Organization
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   └── feature/         # Feature-specific components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API and external services
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Pull Request Process

### Before Submitting
1. [ ] Run tests: `npm test`
2. [ ] Run linting: `npm run lint`
3. [ ] Run type checking: `npm run type-check`
4. [ ] Update documentation if needed
5. [ ] Add tests for new functionality
6. [ ] Ensure CI/CD pipeline passes

### PR Requirements
- Clear, descriptive title
- Detailed description of changes
- Link to related issues
- Screenshots for UI changes
- Breaking change documentation
- Reviewer assignment

### Review Process
1. Automated checks must pass
2. At least one code review approval required
3. Address all reviewer feedback
4. Update based on suggestions
5. Final approval and merge

## Testing Guidelines

### Unit Testing
- Write tests for all new functions/components
- Use Jest and React Testing Library
- Test both happy paths and edge cases
- Maintain minimum 80% code coverage

### Integration Testing
- Test component interactions
- Verify API integrations
- Test user workflows end-to-end

### Testing Commands
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
npm run test:e2e        # Run end-to-end tests
```

## Documentation

### Code Documentation
- Use JSDoc for function documentation
- Comment complex logic and algorithms
- Update README for significant changes
- Maintain API documentation

### User Documentation
- Update user guides for new features
- Create tutorials for complex workflows
- Maintain troubleshooting guides
- Document configuration options

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different perspectives and experiences

### Communication Channels
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General questions and ideas
- Slack: Real-time team communication
- Email: Security issues and private matters

### Getting Help
- Check existing issues and documentation first
- Use appropriate communication channels
- Provide detailed information about your problem
- Be patient and respectful with community members

## Security

### Reporting Security Issues
- **DO NOT** open public issues for security vulnerabilities
- Email security@inkaistudio.com with details
- Include steps to reproduce if applicable
- Allow time for investigation and fix

### Security Best Practices
- Never commit secrets or API keys
- Use environment variables for configuration
- Follow OWASP security guidelines
- Keep dependencies updated

## Release Process

### Version Management
- Follow semantic versioning (SemVer)
- Update CHANGELOG.md for each release
- Tag releases with version numbers
- Create release notes for major updates

### Deployment
- All changes must pass CI/CD pipeline
- Staging deployment for testing
- Production deployment with monitoring
- Rollback procedures documented

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- Annual contributor appreciation posts
- Special recognition for outstanding contributions

---

Thank you for contributing to InkAI Studio! Your efforts help make this project better for everyone.

**Questions?** Contact the maintainers or open a discussion on GitHub.