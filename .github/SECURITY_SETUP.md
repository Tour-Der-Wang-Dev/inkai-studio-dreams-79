# GitHub Repository Security and Automation Setup Guide

## 1. GitHub Secrets Configuration

### Required Secrets

Navigate to `Settings > Secrets and variables > Actions` in your GitHub repository and add the following secrets:

#### Deployment Secrets
```
SUPABASE_URL                    # Supabase project URL
SUPABASE_ANON_KEY              # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY      # Supabase service role key (for deployments)
```

#### CI/CD Secrets
```
NPM_TOKEN                      # NPM authentication token
VERCEL_TOKEN                   # Vercel deployment token
VERCEL_ORG_ID                  # Vercel organization ID
VERCEL_PROJECT_ID              # Vercel project ID
```

#### Notification Secrets
```
SLACK_WEBHOOK_URL              # Slack notifications webhook
DISCORD_WEBHOOK_URL            # Discord notifications webhook
EMAIL_SERVICE_API_KEY          # Email service API key
```

#### Security Scanning
```
SONAR_TOKEN                    # SonarCloud token for code analysis
SNYK_TOKEN                     # Snyk token for vulnerability scanning
```

#### Optional Service Secrets
```
SENTRY_DSN                     # Error monitoring
ANALYTICS_API_KEY              # Analytics service key
CDN_API_KEY                    # CDN configuration key
```

### Secret Naming Convention
- Use UPPERCASE with underscores
- Prefix with service name when applicable
- End with appropriate suffix (_KEY, _TOKEN, _URL, _ID)

## 2. Branch Protection Rules Setup

### Main Branch Protection
Navigate to `Settings > Branches` and configure:

#### Protection Rules for `main` branch:
1. **Require a pull request before merging**
   - [x] Require approvals: 1
   - [x] Dismiss stale reviews when new commits are pushed
   - [x] Require review from code owners
   - [x] Restrict approvals to members of this repository

2. **Require status checks to pass before merging**
   - [x] Require branches to be up to date before merging
   - Required status checks:
     - `CI/CD Pipeline`
     - `Code Quality Check`
     - `Security Scan`
     - `Test Coverage`

3. **Require linear history**
   - [x] Require linear history

4. **Additional restrictions**
   - [x] Restrict pushes that create files larger than 100MB
   - [x] Restrict force pushes
   - [x] Restrict deletions
   - [x] Do not allow bypassing the above settings

### Development Branch Protection
Configure similar rules for `develop` or `staging` branches with relaxed requirements for faster iteration.

## 3. Webhook Configuration

### Setting Up Webhooks
Navigate to `Settings > Webhooks` and add webhooks for:

#### Slack Integration
```
Payload URL: https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
Content type: application/json
Events:
  - Pull requests
  - Pushes
  - Deployments
  - Issues
  - Issue comments
  - Pull request reviews
```

#### Discord Integration
```
Payload URL: https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK
Content type: application/json
Events:
  - Pull requests
  - Pushes
  - Deployments
  - Releases
```

#### Custom Monitoring Webhook
```
Payload URL: https://your-monitoring-service.com/webhook
Content type: application/json
Secret: YOUR_WEBHOOK_SECRET
Events:
  - Workflow runs
  - Check runs
  - Deployment status
```

### Webhook Security
- Use webhook secrets for payload verification
- Implement proper payload validation
- Set up retry policies (3 attempts with exponential backoff)
- Configure 30-second timeout

## 4. Pull Request Testing Checklist

### Pre-merge Testing Process

1. **Create Test Branch**
```bash
git checkout -b test/pr-workflow-validation
# Make sample changes
echo "console.log('Testing PR workflow');" >> test-file.js
git add test-file.js
git commit -m "test: validate PR workflow"
git push origin test/pr-workflow-validation
```

2. **Submit Pull Request**
- Title: `test: Validate PR workflow and automation`
- Description: Include PR template checklist
- Assign reviewers
- Add appropriate labels

3. **Verify Automated Checks**
- [ ] CI/CD pipeline triggers
- [ ] Code quality checks pass
- [ ] Security scans complete
- [ ] Test coverage meets requirements
- [ ] Build succeeds
- [ ] Deployment preview created

4. **Code Review Process**
- [ ] Reviewer assigned automatically
- [ ] Review comments work
- [ ] Approval blocks merge until given
- [ ] Status checks prevent merge if failing

5. **Merge and Deployment**
- [ ] Merge only allowed with approvals
- [ ] Deployment triggers automatically
- [ ] Notifications sent to team channels
- [ ] Branch auto-deleted after merge

## 5. Pipeline Performance Monitoring

### Key Metrics to Track

#### Build Performance
```
- Total build duration (target: <5 minutes)
- Test execution time (target: <2 minutes)
- Security scan duration (target: <3 minutes)
- Deployment time (target: <2 minutes)
```

#### Success Rates
```
- Build success rate (target: >95%)
- Test pass rate (target: >98%)
- Deployment success rate (target: >99%)
- Security scan pass rate (target: >90%)
```

#### Team Productivity
```
- Pull requests per week
- Average time to merge
- Code review response time
- Deployment frequency (target: daily)
```

### Monitoring Setup

#### GitHub Actions Monitoring
1. Enable email notifications for workflow failures
2. Set up Slack alerts for build failures
3. Monitor workflow duration trends
4. Track resource usage and costs

#### Performance Alerts
Configure alerts for:
- Build time > 10 minutes
- Test failures > 5%
- Security vulnerabilities detected
- Deployment failures
- Coverage drop > 5%

### Baseline Metrics Documentation
Document initial metrics in `METRICS_BASELINE.md`:
- Current build times
- Test execution benchmarks
- Resource usage patterns
- Team velocity metrics

## Team Notification Checklist

### Communication Plan
- [ ] Notify team of new branch protection rules
- [ ] Share webhook configuration details
- [ ] Provide PR template and guidelines
- [ ] Document emergency override procedures
- [ ] Schedule team training on new workflows

### Documentation Updates
- [ ] Update CONTRIBUTING.md
- [ ] Create or update PR templates
- [ ] Document secret management procedures
- [ ] Add troubleshooting guides
- [ ] Update team onboarding documentation

## Troubleshooting

### Common Issues
1. **Status checks not appearing**: Verify workflow file syntax and permissions
2. **Webhooks failing**: Check payload format and authentication
3. **Secrets not accessible**: Verify secret names and scoping
4. **Branch protection bypassed**: Check admin permissions and rules

### Support Contacts
- DevOps Team: devops@company.com
- Security Team: security@company.com
- Platform Admin: admin@company.com

---

**Last Updated**: 2025-06-13
**Next Review**: 2025-07-13