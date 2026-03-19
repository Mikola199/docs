# GLock Platform Blueprint (v2)

## 1) Product Definition

**Project:** GLock Platform
**Type:** Hybrid Social + App Distribution + Gamified Ecosystem
**Mission:** Create one platform where people can publish, discover, discuss, and level up around digital applications/content.

### Core value
GLock unifies:
1. **Marketplace** (publish + discover apps)
2. **Social network** (comments, likes, messaging)
3. **Game layer** (XP, levels, achievements, рейтинги)

---

## 2) Personas and Jobs-to-be-Done

### A. General User
- Find useful or entertaining apps quickly.
- Read trusted feedback before installing/using.
- Build identity through profile, activity, and reputation.

### B. Developer (role on User)
- Publish and maintain app listings.
- Receive feedback and community validation.
- Track adoption and engagement analytics.

### C. Admin / Moderator
- Keep content quality high and abuse low.
- Resolve reports quickly.
- Enforce policy with transparent auditability.

---

## 3) Scope: MVP vs Post-MVP

## MVP (required)
1. Authentication
2. Profiles
3. App publishing
4. Comments + likes
5. Basic admin panel

## Post-MVP (next)
- Personalized recommendations
- Full gamification expansion (advanced achievements, seasons)
- Realtime events/notifications
- Mobile apps
- Monetization tools

---

## 4) Domain Model

### Entities
- **User**
- **Role** (`user`, `developer`, `admin`)
- **Profile**
- **Application**
- **ApplicationVersion**
- **Comment**
- **Like**
- **Message**
- **XPEvent**
- **LevelDefinition**
- **Achievement**
- **UserAchievement**
- **LeaderboardSnapshot**
- **Report**
- **ModerationAction**

### Key relationships
- `User 1—1 Profile`
- `User 1—N Application` (when role includes developer)
- `Application 1—N ApplicationVersion`
- `Application 1—N Comment`
- `User N—N Application` via likes
- `User 1—N XPEvent`
- `User N—N Achievement` via user_achievements

---

## 5) Functional Requirements

## 5.1 Authentication
- Email/password sign-up and sign-in
- Password reset flow
- Session/token refresh
- Optional social auth (post-MVP)
- Security controls: hashed passwords, refresh token rotation, rate limiting

## 5.2 Profile System
- Public profile: avatar, bio, level, badges, stats
- Private settings: email, privacy, notifications
- Activity feed (recent comments/likes/published apps)

## 5.3 App Publishing
- Create/edit app listing
- Upload app metadata and media
- Add versions/changelog
- Publish states: `draft -> submitted -> approved -> published -> archived`

## 5.4 Social Layer
- Comment on app pages
- Like app listings and comments
- (Optional in MVP) 1:1 messaging behind feature flag
- Report abuse on comments/apps/users

## 5.5 Gamification
- Award XP for eligible actions
- Compute level from XP thresholds
- Unlock achievements by event rules
- Show leaderboard (global weekly/all-time in MVP-lite)

## 5.6 Admin Panel (basic)
- User management (view, role update, suspend)
- Moderation queue for reports
- App approval/rejection workflow
- Basic dashboard (new users, published apps, report volume)

---

## 6) Non-Functional Requirements

- **Security:** RBAC, audit logs, abuse prevention
- **Performance:** p95 API < 300 ms for key read endpoints under MVP load
- **Availability:** target 99.5% monthly for MVP
- **Scalability:** API-first modular services, background worker support
- **Observability:** centralized logs + metrics + alerting

---

## 7) Suggested Architecture

## Frontend
- **React** (recommended) or Vue
- Feature-based modules:
  - auth
  - profile
  - catalog
  - app-details
  - social
  - gamification
  - admin

## Backend
- **Node.js (NestJS/Express)** or **Django**
- Recommended modular boundaries:
  - identity service
  - catalog service
  - interaction service
  - gamification service
  - moderation/admin service

## Database
- **PostgreSQL** primary store
- Use explicit FK constraints + partial indexes

## API
- MVP: **REST** (`/api/v1/...`)
- Optional: GraphQL gateway for complex feed/mobile composition

## Async processing
Use a queue for:
- XP recalculation events
- leaderboard snapshot generation
- heavy notification fan-out
- moderation enrichment checks

---

## 8) Minimal API Contract (MVP)

## Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

## Profiles
- `GET /api/v1/profiles/:userId`
- `PATCH /api/v1/profiles/me`

## Applications
- `GET /api/v1/apps`
- `GET /api/v1/apps/:appId`
- `POST /api/v1/apps`
- `PATCH /api/v1/apps/:appId`
- `POST /api/v1/apps/:appId/submit`

## Interactions
- `POST /api/v1/apps/:appId/comments`
- `POST /api/v1/apps/:appId/likes`
- `POST /api/v1/comments/:commentId/likes`
- `POST /api/v1/reports`

## Gamification
- `GET /api/v1/gamification/me`
- `GET /api/v1/leaderboards/global`

## Admin
- `GET /api/v1/admin/reports`
- `PATCH /api/v1/admin/reports/:reportId`
- `PATCH /api/v1/admin/apps/:appId/moderation`
- `PATCH /api/v1/admin/users/:userId/role`

---

## 9) Initial Ranking + Recommendation Logic

### Ranking score (MVP heuristic)
`score = (likes * 2) + (comments * 3) + (recent_update_bonus) + (quality_signal)`

Where:
- `recent_update_bonus` decays over time
- `quality_signal` can include report penalties and engagement quality

### Recommendation seed
1. category affinity
2. interaction similarity (“users who liked X also liked Y”)
3. trending blend (time-window weighted)

---

## 10) Gamification Rules (MVP defaults)

### XP events
- Complete profile: +20 XP (one-time)
- Publish app: +50 XP
- Receive like on app/comment: +5 XP
- Write valid comment: +10 XP (daily cap)

### Levels
- L1 = 0
- L2 = 100
- L3 = 250
- L4 = 450
- L5 = 700

### Achievements (starter set)
- **First Publish** (first approved app)
- **Contributor** (10 comments)
- **Rising Dev** (100 total likes received)
- **Community Favorite** (one app reaches threshold score)

---

## 11) Moderation & Trust Controls

- Report reason taxonomy (spam, abuse, malware, copyright)
- App approval checklist before publish
- Comment anti-spam (rate limits + duplicate detection)
- Strike policy for repeat offenders
- Immutable audit record for admin actions

---

## 12) MVP Delivery Plan (12-week reference)

### Phase 1 (Weeks 1–3): Foundation
- Auth + RBAC
- Base profile model
- Core app catalog schema

### Phase 2 (Weeks 4–6): Publishing + Social
- App create/edit/submit flow
- Comments and likes
- Basic moderation/reporting pipeline

### Phase 3 (Weeks 7–9): Gamification + Admin
- XP events + level computation
- Starter achievements
- Admin dashboard and review queue

### Phase 4 (Weeks 10–12): Hardening + Launch
- Performance pass
- Security checks
- Analytics instrumentation
- MVP launch readiness checklist

---

## 13) MVP Success Metrics

- Activation: `% users completing profile in 24h`
- Supply: `# published apps / week`
- Social health: `comments per active app`
- Quality: `report resolution median time`
- Retention: `D7 user retention`
- Engagement: `XP events per DAU`

---

## 14) Implementation Notes

- Keep gamification event-sourced (`xp_events` append-only).
- Separate read models for feed/ranking if query cost grows.
- Put recommendations behind feature flags for iterative rollout.
- Define anti-abuse constraints early to avoid social debt.
