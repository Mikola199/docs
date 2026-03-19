# GLock Platform — Product & Technical Blueprint (v3)

## 1. Executive Summary

GLock Platform is a unified ecosystem that combines:
- app distribution,
- social interaction,
- gamified progression.

The MVP focus is to validate a core loop:
1. Developer publishes an app.
2. User discovers and interacts with it.
3. Engagement generates reputation and progression signals.
4. Admin moderation keeps trust and quality high.

## 2. Product Goal, Outcome, and Constraints

### Goal
Deliver an MVP that enables app publishing + social engagement with a gamification baseline.

### Target outcomes (first 90 days after MVP launch)
- 100+ published apps.
- 1,000+ registered users.
- >= 25% of weekly active users leave at least one comment or like.
- Median report-resolution time below 24 hours.

### Constraints
- API-first architecture for future mobile clients.
- PostgreSQL as primary database.
- Modular backend to support feature growth without full rewrite.

## 3. Personas and Primary Jobs

### 3.1 General User
- Discover relevant apps quickly.
- Evaluate quality via comments/likes/ranking.
- Build profile reputation via activity and level progression.

### 3.2 Developer (role on User)
- Publish and update app listings.
- Track engagement and quality feedback.
- Improve ranking through updates and community response.

### 3.3 Admin/Moderator
- Enforce policy and remove abusive/low-quality content.
- Resolve reports with auditability.
- Maintain platform trust and safety metrics.

## 4. Scope Definition

### 4.1 In MVP
1. Authentication and RBAC (`user`, `developer`, `admin`).
2. Profiles (public + private settings).
3. App publishing workflow.
4. Comments and likes.
5. Admin moderation panel (basic).
6. XP + levels + starter achievements.

### 4.2 Post-MVP
- Realtime notifications and chat.
- Personalized recommendations.
- Seasonal/competitive leaderboards.
- Mobile apps.
- Monetization features.

## 5. Domain Model

### 5.1 Core entities
- `users`
- `profiles`
- `roles`
- `user_roles`
- `applications`
- `application_versions`
- `comments`
- `likes`
- `reports`
- `moderation_actions`
- `xp_events`
- `level_definitions`
- `achievements`
- `user_achievements`
- `leaderboard_snapshots`

### 5.2 Relationship map
- User 1:1 Profile
- User N:N Role (via `user_roles`)
- User 1:N Application
- Application 1:N ApplicationVersion
- Application 1:N Comment
- User 1:N Comment
- User 1:N Like
- User 1:N XPEvent
- User N:N Achievement (via `user_achievements`)
- Report 1:N ModerationAction

## 6. Functional Requirements

### 6.1 Authentication
- Email/password sign-up and login.
- Refresh-token session model.
- Password reset via email link.
- Rate limiting for login/register endpoints.
- Account lock strategy for repeated failed attempts.

### 6.2 Profiles
- Public profile: avatar, bio, level, badges, activity counts.
- Private settings: email, password, notification preferences.
- Profile completion flag (used by gamification XP).

### 6.3 App Publishing
- Create draft app listing.
- Edit listing metadata (title, description, categories, media).
- Submit for moderation.
- Admin approve/reject with reason.
- Publish and archive lifecycle.

### 6.4 Social Interactions
- App comment threads.
- Likes on apps and comments.
- Basic anti-spam limits per user/IP.
- Report actions on comments/apps/users.

### 6.5 Gamification
- XP event creation for allowed actions.
- Level computation from threshold table.
- Achievement unlock checks from event rules.
- Global leaderboard snapshot (daily cron).

### 6.6 Admin Panel
- Queue of pending app submissions.
- Queue of abuse reports.
- Role updates (promote to developer, moderation actions).
- Basic operational dashboard (new users, published apps, open reports).

## 7. Non-Functional Requirements

- **Security:** OWASP baseline, password hashing (Argon2/Bcrypt), RBAC checks on all protected endpoints.
- **Performance:** p95 < 300ms for primary read endpoints (`GET /apps`, `GET /apps/:id`, `GET /profiles/:id`).
- **Availability:** 99.5% monthly target for MVP.
- **Observability:** structured logs, error tracking, API latency metrics, report-volume metrics.
- **Scalability:** stateless API nodes + queue workers for async workloads.

## 8. Architecture (Chosen MVP Stack)

### 8.1 Frontend
- React + TypeScript.
- Feature modules: Auth, Profile, Catalog, App Detail, Social, Admin.

### 8.2 Backend
- Node.js + NestJS.
- Modules:
  - `identity`
  - `profiles`
  - `catalog`
  - `interactions`
  - `gamification`
  - `moderation`
  - `admin`

### 8.3 Database
- PostgreSQL with migrations.
- Redis (optional in MVP, recommended) for rate limits/cache.

### 8.4 API style
- REST first, namespaced as `/api/v1`.
- OpenAPI spec maintained from day 1.

### 8.5 Async jobs
- XP aggregation.
- Leaderboard materialization.
- Moderation enrichment checks.
- Notification fan-out (post-MVP if enabled).

## 9. API Contract (MVP Minimum)

### 9.1 Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

### 9.2 Profiles
- `GET /api/v1/profiles/:userId`
- `PATCH /api/v1/profiles/me`

### 9.3 Applications
- `GET /api/v1/apps`
- `GET /api/v1/apps/:appId`
- `POST /api/v1/apps`
- `PATCH /api/v1/apps/:appId`
- `POST /api/v1/apps/:appId/submit`

### 9.4 Interactions
- `POST /api/v1/apps/:appId/comments`
- `POST /api/v1/apps/:appId/likes`
- `POST /api/v1/comments/:commentId/likes`
- `POST /api/v1/reports`

### 9.5 Gamification
- `GET /api/v1/gamification/me`
- `GET /api/v1/leaderboards/global`

### 9.6 Admin
- `GET /api/v1/admin/submissions`
- `PATCH /api/v1/admin/apps/:appId/moderation`
- `GET /api/v1/admin/reports`
- `PATCH /api/v1/admin/reports/:reportId`
- `PATCH /api/v1/admin/users/:userId/role`

## 10. Ranking and Recommendation (MVP Heuristic)

### 10.1 Ranking score
`score = (likes * 2) + (comments * 3) + recency_bonus - report_penalty`

Where:
- `recency_bonus` decays over 14 days after latest update.
- `report_penalty` applies only to validated abuse reports.

### 10.2 Recommendation seed rules
1. Category affinity.
2. Co-engagement similarity.
3. Trending blend with quality threshold.

## 11. Gamification Defaults

### 11.1 XP events
- Complete profile: +20 XP (one-time).
- Publish app approved by admin: +50 XP.
- Receive like: +5 XP.
- Post non-spam comment: +10 XP (daily cap).

### 11.2 Level thresholds
- L1: 0 XP
- L2: 100 XP
- L3: 250 XP
- L4: 450 XP
- L5: 700 XP

### 11.3 Starter achievements
- **First Publish**: first approved app.
- **Contributor**: 10 comments.
- **Rising Developer**: 100 likes received.
- **Community Favorite**: app reaches ranking threshold.

## 12. MVP Delivery Plan (12 Weeks)

### Phase 1 (Weeks 1-3): Foundation
- Auth, RBAC, migrations, profile skeleton.

### Phase 2 (Weeks 4-6): Publishing + Social
- App CRUD + submit flow.
- Comments/likes + report creation.

### Phase 3 (Weeks 7-9): Moderation + Gamification
- Admin queues and moderation actions.
- XP events, levels, achievement unlock.

### Phase 4 (Weeks 10-12): Hardening + Release
- Performance tuning.
- Security checklist.
- Telemetry dashboards and launch review.

## 13. Acceptance Criteria (MVP Exit)

- A new user can register, complete profile, and interact with apps.
- A developer can submit an app and receive moderation outcome.
- Comments and likes are visible and persisted correctly.
- XP updates are generated for supported actions.
- Admin can resolve reports and approve/reject apps.
- Audit trail exists for moderation actions.

## 14. Risks and Mitigations

- **Spam/abuse surge** -> strict rate limits + moderation queue SLAs.
- **Ranking manipulation** -> penalty for confirmed abuse + anomaly detection backlog item.
- **Feature scope creep** -> freeze MVP scope by phase gates.
- **Gamification inflation** -> XP caps and periodic rebalance.

## 15. Implementation Notes

- Keep `xp_events` append-only (event-sourced ledger style).
- Avoid hard-coding level thresholds; keep in `level_definitions`.
- Feature-flag recommendation modules for safe rollout.
- Keep API responses versioned and backward-compatible within `/v1`.
