# 🌌 PixelAI Discovery Engine

**PixelAI** is a high-performance, identity-aware Image Discovery platform that combines a **Glassmorphism-based UI** with a scalable, event-driven frontend architecture — inspired by high-concurrency C++ microservices.

---

## 🚀 Live Demo

🔗 **[View Live on Vercel](https://pixel-ai-discovery-engine.vercel.app)**

---

## 🛠️ Technical Architecture

### 🛡️ Identity & Access Management (IAM)

- **Google OAuth 2.0 Federation**  
  Secure OIDC (OpenID Connect) flow implemented using `@react-oauth/google`.

- **JWT Orchestration**  
  Client-side decoding of identity tokens using `jwt-decode` to extract user claims (`email`, `name`, `picture`).

- **Session Persistence**  
  Stateless session handling via browser `localStorage` to maintain user state across refresh cycles.

---

### ⚡ Performance & Discovery

- **Infinite Scroll (Pinterest-style)**  
  Custom scroll listener with threshold detection (`window.innerHeight + scrollTop`) for efficient paginated API fetching.

- **Responsive Masonry Layout**  
  Built using CSS Grid + Flexbox to dynamically adapt to varying image aspect ratios.

- **Optimized State Management**  
  Functional state updates:
  ```js
  setImages(prev => [...prev, ...newResults])
  ```
