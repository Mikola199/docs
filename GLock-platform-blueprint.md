# GLock Platform Blueprint

## 1. Product Vision

**GLock Platform** is a hybrid ecosystem that combines:
- app publishing and discovery,
- social interaction,
- game mechanics for engagement.

The platform enables developers to distribute applications and users to discover, interact with, and evaluate them through a socially driven and gamified experience.

## 2. Mission and Value Proposition

### Mission
Build a unified space where users can publish, discover, interact with, and gamify digital applications and content.

### Unique Value
GLock merges three product layers into one coherent platform:
1. **Marketplace layer** — application catalog, discovery, and ranking.
2. **Social layer** — comments, likes, direct messaging, and profile presence.
3. **Gamification layer** — XP, levels, achievements, and leaderboards.

## 3. User Segments

- **General users**: discover apps, leave feedback, and participate socially.
- **Developers**: publish and maintain applications, monitor performance.
- **Gamers/engaged users**: pursue achievements and climb leaderboards.
- **Admins/moderators**: maintain quality, trust, and policy enforcement.

## 4. Core Domain Entities

1. **User**
   - account credentials and identity
   - profile metadata
   - platform activity footprint

2. **Developer** (role extension of User)
   - publisher status
   - owned applications
   - analytics access

3. **Application**
   - title, description, category, media, versioning
   - publish state and moderation state
   - engagement and quality metrics

4. **Interaction**
   - comments
   - likes/reactions
   - private messages

5. **Game Layer**
   - XP transactions
   - level progression
   - achievements
   - leaderboards (global and scoped)

## 5. MVP Scope (Priority Order)

1. Authentication
2. User profiles
3. Application publishing
4. Comments and likes
5. Basic admin panel

### MVP Success Criteria
- Users can register, authenticate, and manage profile identity.
- Developers can create and update app listings.
- Users can discover apps and interact through comments/likes.
- Admin can review and moderate core content.

## 6. Functional Requirements

### 6.1 Authentication System
- Register/login/logout
- Email verification (recommended for trust)
- Password reset flow
- Role model: `user`, `developer`, `admin`
- Token-based auth (JWT with refresh token) or secure session-based auth

### 6.2 User Profiles
- Public profile page (avatar, bio, badges, level)
- Private profile settings (email/preferences)
- Activity summary (published apps, comments, likes)

### 6.3 Application Publishing System
- Create/edit app listing
- Upload metadata and assets
- Version history and changelog
- App status lifecycle: `draft -> submitted -> published -> archived`

### 6.4 Social Interaction Layer
- Comment threads on app pages
- Like system for apps and comments
- Direct messages between users (post-MVP if needed)
- Abuse reporting hooks for moderation

### 6.5 Gamification System
- XP awarded for actions (publish app, comment, receive likes)
- Level thresholds
- Achievement unlock logic
- Leaderboards (weekly/all-time)

### 6.6 Admin Panel (Basic)
- Manage users and roles
- Moderate apps/comments
- Review reports and take actions
- Basic analytics overview

## 7. Suggested Technical Architecture

### Frontend
- **React** (recommended) or Vue
- SPA with modular feature domains:
  - auth
  - profile
  - app catalog
  - interactions
  - gamification
  - admin

### Backend
- **Node.js** (Express/NestJS) or **Django**
- Layered structure:
  - API layer
  - domain/services layer
  - repository/data access layer

### Database
- **PostgreSQL** as primary source of truth
- Use relational constraints for consistency (FKs, unique indexes)

### API Style
- **REST first** for MVP simplicity
- Optional GraphQL gateway in phase 2 for richer clients and mobile optimization

### API-First and Scalability
- Contract-driven API design (OpenAPI)
- Versioned endpoints (`/api/v1`)
- Service boundaries prepared for future extraction

## 8. High-Level Data Model (Conceptual)

### Tables/Collections
- `users`
- `profiles`
- `roles`
- `applications`
- `application_versions`
- `comments`
- `likes`
- `messages`
- `xp_events`
- `levels`
- `achievements`
- `user_achievements`
- `leaderboard_snapshots`
- `reports`

### Key Relationships
- One user has one profile
- One developer (user role) has many applications
- One application has many comments and likes
- One user has many XP events and many unlocked achievements

## 9. Example MVP API Surface (REST)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### Profiles
- `GET /api/v1/profiles/:userId`
- `PATCH /api/v1/profiles/me`

### Applications
- `GET /api/v1/apps`
- `GET /api/v1/apps/:appId`
- `POST /api/v1/apps`
- `PATCH /api/v1/apps/:appId`

### Interactions
- `POST /api/v1/apps/:appId/comments`
- `POST /api/v1/apps/:appId/likes`
- `POST /api/v1/comments/:commentId/likes`

### Gamification
- `GET /api/v1/gamification/me`
- `GET /api/v1/leaderboards/global`

### Admin
- `GET /api/v1/admin/reports`
- `PATCH /api/v1/admin/apps/:appId/moderation`
- `PATCH /api/v1/admin/users/:userId/role`

## 10. Ranking and Recommendation Foundations

### Ranking Inputs
- installs/opens (if tracked)
- likes and comment sentiment
- recency and update cadence
- retention and engagement signals

### Recommendation Seed Logic (MVP)
- category similarity
- collaborative interactions (users who liked X also liked Y)
- trending + personalized blend

## 11. Gamification Rules (Initial)

### XP Rules (example)
- Complete profile: +20 XP (one-time)
- Publish app: +50 XP
- Receive like on app/comment: +5 XP
- Write constructive comment: +10 XP (with anti-spam limits)

### Levels
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 250 XP
- Level 4: 450 XP
- Continue via configurable progression curve

### Achievements (example)
- First Publish
- Community Contributor (10 comments)
- Rising Developer (100 likes received)

## 12. Moderation and Trust

- Report workflow for apps/comments/users
- Rate limits and anti-spam checks
- Content policy enforcement tools for admins
- Audit log for sensitive admin actions

## 13. Non-Functional Requirements

- **Performance**: low-latency app feed and profile load
- **Security**: hashed passwords, secure token strategy, RBAC
- **Reliability**: transactional integrity for XP and interactions
- **Observability**: logs, metrics, trace-ready endpoints
- **Scalability**: modular services and background jobs for heavy tasks

## 14. Suggested Delivery Roadmap

### Phase 1 (MVP)
- Auth, profiles, app publishing, comments/likes, admin basics

### Phase 2
- Recommendation improvements
- Leaderboards and richer achievements
- Direct messaging and notifications

### Phase 3
- Mobile apps
- Real-time features
- Streaming and monetization tools

## 15. Delivery Notes

- Start with a single deployable backend + frontend for speed.
- Keep strict domain boundaries in code to simplify future service extraction.
- Treat gamification events as append-only records to support analytics and anti-fraud audits.
