# InkAI Studio - Project Structure Analysis

## Table of Contents
- [Overview](#overview)
- [Dual Architecture](#dual-architecture)
- [Directory Structure](#directory-structure)
- [Component Categories](#component-categories)
- [Import Analysis](#import-analysis)
- [Dependencies Map](#dependencies-map)

## Overview

InkAI Studio is a sophisticated AI-powered tattoo design platform featuring a hybrid architecture combining React Router (Vite) and Next.js App Router patterns. The project implements advanced features including real-time collaboration, artist marketplace, AI model integration, and comprehensive analytics.

## Dual Architecture

The project uses a unique dual-architecture approach:
- **React Router + Vite** (`src/` directory) - Main studio functionality
- **Next.js App Router** (`app/` directory) - Additional pages and features

## Directory Structure

```
📁 InkAI Studio/
├── 📁 app/ - Next.js App Router Pages 🟢
│   ├── 📁 (auth)/ - Authentication Routes 🟡
│   │   ├── 📄 login/page.tsx - User login interface 🟡
│   │   └── 📄 register/page.tsx - User registration interface 🟡
│   ├── 📄 analytics/page.tsx - Business analytics dashboard 🟡
│   ├── 📁 artists/ - Artist Directory 🟡
│   │   ├── 📄 [id]/page.tsx - Individual artist profile 🟡
│   │   └── 📄 page.tsx - Artist marketplace listing 🟡
│   ├── 📄 create-design/page.tsx - AI design generation interface 🟢
│   ├── 📄 gallery/page.tsx - Design gallery with filters 🟡
│   ├── 📄 layout.tsx - Root layout and providers 🟢
│   ├── 📄 page.tsx - Homepage with hero section 🟢
│   ├── 📄 pricing/page.tsx - Subscription and pricing 🟡
│   └── 📄 studio/page.tsx - Studio overview dashboard 🟡
├── 📁 components/ - Reusable UI Components 🟢
│   ├── 📁 analytics/ - Analytics Widgets 🟡
│   │   ├── 📄 ai-performance-chart.tsx - AI model metrics visualization 🔴
│   │   ├── 📄 analytics-dashboard.tsx - Main analytics container 🟡
│   │   ├── 📄 conversion-funnel.tsx - User conversion tracking 🔴
│   │   ├── 📄 date-range-selector.tsx - Time period filter 🔴
│   │   ├── 📄 export-options.tsx - Report export functionality 🔴
│   │   ├── 📄 metrics-overview.tsx - Key metrics summary 🔴
│   │   ├── 📄 revenue-chart.tsx - Revenue visualization 🔴
│   │   └── 📄 user-analytics-chart.tsx - User behavior metrics 🔴
│   ├── 📁 artists/ - Artist Management Components 🟡
│   │   ├── 📄 artist-availability-calendar.tsx - Booking calendar 🔴
│   │   ├── 📄 artist-bio-section.tsx - Artist biography display 🔴
│   │   ├── 📄 artist-contact-info.tsx - Contact information widget 🔴
│   │   ├── 📄 artist-hero-section.tsx - Artist profile header 🔴
│   │   ├── 📄 artist-portfolio-grid.tsx - Portfolio showcase 🔴
│   │   ├── 📄 artist-profile.tsx - Complete artist profile 🟡
│   │   ├── 📄 artist-reviews-section.tsx - Client reviews display 🔴
│   │   ├── 📄 artist-skills-visualization.tsx - Skills chart 🔴
│   │   └── 📄 portfolio-modal.tsx - Portfolio item viewer 🔴
│   ├── 📁 gallery/ - Design Gallery Components 🟡
│   │   ├── 📄 gallery-card.tsx - Individual design card 🔴
│   │   ├── 📄 gallery-filters.tsx - Filter controls 🔴
│   │   ├── 📄 gallery-grid.tsx - Grid layout container 🟡
│   │   └── 📄 gallery-modal.tsx - Design detail viewer 🔴
│   ├── 📁 pricing/ - Subscription Components 🔴
│   │   ├── 📄 dynamic-pricing-calculator.tsx - Price calculation 🔴
│   │   ├── 📄 payment-history.tsx - Transaction history 🔴
│   │   └── 📄 subscription-tiers.tsx - Plan comparison 🔴
│   ├── 📁 providers/ - Context Providers 🟢
│   │   ├── 📄 auth-provider.tsx - Authentication state 🟢
│   │   └── 📄 query-provider.tsx - React Query setup 🟡
│   ├── 📁 studio/ - Studio Interface Components 🟢
│   │   ├── 📄 ai-integration-panel.tsx - AI model controls 🟡
│   │   ├── 📄 design-canvas.tsx - Main design workspace 🟢
│   │   ├── 📄 model-management-dashboard.tsx - AI model admin 🔴
│   │   ├── 📄 prompt-engineering.tsx - Prompt optimization 🔴
│   │   └── 📄 tool-palette.tsx - Design tools sidebar 🟡
│   └── 📁 ui/ - Base UI Components 🟢
│       ├── 📄 navigation.tsx - Main navigation bar 🟢
│       ├── 📄 button.tsx - Button component 🟢
│       ├── 📄 card.tsx - Card containers 🟢
│       └── [40+ additional UI components] - Shadcn/ui library 🟢
├── 📁 src/ - React Router Application 🟢
│   ├── 📁 components/ - React Router Components 🟡
│   │   ├── 📁 studio/ - Studio-specific components 🟡
│   │   └── 📁 ui/ - Additional UI components 🟡
│   ├── 📁 hooks/ - Custom React Hooks 🟡
│   ├── 📁 integrations/ - External Service Integrations 🟢
│   │   └── 📁 supabase/ - Supabase client and types 🟢
│   ├── 📁 lib/ - Utility Libraries 🟡
│   ├── 📁 pages/ - React Router Pages 🟡
│   └── 📄 main.tsx - React Router entry point 🟢
├── 📁 stores/ - Zustand State Management 🟢
│   ├── 📄 ai-model-store.ts - AI model state and actions 🟡
│   ├── 📄 analytics-store.ts - Analytics data management 🟡
│   ├── 📄 artist-store.ts - Artist profile and portfolio 🟡
│   ├── 📄 canvas-store.ts - Design canvas state 🟡
│   ├── 📄 design-store.ts - Design creation workflow 🟡
│   ├── 📄 gallery-store.ts - Gallery filtering and display 🟡
│   └── 📄 pricing-store.ts - Subscription and pricing 🔴
├── 📁 services/ - External API Services 🟡
│   ├── 📄 ai-model-service.ts - AI generation API client 🟡
│   └── 📄 analytics-service.ts - Analytics API client 🟡
├── 📁 types/ - TypeScript Definitions 🟢
│   ├── 📄 ai-models.ts - AI model interfaces 🟡
│   ├── 📄 analytics.ts - Analytics data types 🟡
│   ├── 📄 artist.ts - Artist system types 🟡
│   └── 📄 pricing.ts - Pricing and subscription types 🔴
├── 📁 hooks/ - Shared Custom Hooks 🟡
│   ├── 📄 use-collaboration.ts - Real-time collaboration 🔴
│   └── 📄 use-debounce.ts - Input debouncing utility 🟡
├── 📁 supabase/ - Database Configuration 🟢
│   ├── 📄 config.toml - Supabase project settings 🟢
│   └── 📁 migrations/ - Database schema migrations 🟢
│       └── 📄 20241213000001_create_artist_system.sql - Artist system tables 🟡
├── 📁 public/ - Static Assets 🟡
│   └── 📁 lovable-uploads/ - User uploaded images 🔴
├── 📄 package.json - Dependencies and scripts 🟢
├── 📄 vite.config.ts - Vite build configuration 🟢
├── 📄 tailwind.config.ts - Tailwind CSS setup 🟢
├── 📄 tsconfig.json - TypeScript configuration 🟢
└── 📄 README.md - Project documentation 🟡
```

## Component Categories

### 🟢 Critical Components (10+ imports)
- **Navigation** - Main site navigation
- **Layout** - Root application wrapper
- **Design Canvas** - Core design workspace
- **UI Components** - Shadcn/ui base components
- **State Stores** - Zustand data management

### 🟡 Important Components (3-9 imports)
- **Authentication** - Login/register flows
- **Gallery System** - Design browsing and filtering
- **Artist Profile** - Artist marketplace features
- **Analytics Dashboard** - Business metrics
- **AI Integration** - Model management and generation

### 🔴 Supporting Components (0-2 imports)
- **Analytics Widgets** - Specific chart components
- **Artist Details** - Individual profile sections
- **Pricing Components** - Subscription management
- **Utility Hooks** - Helper functions

## Import Analysis

### Most Imported Dependencies
1. **React & Motion** (90+ imports) - Core UI and animations
2. **Lucide React** (60+ imports) - Icon system
3. **UI Components** (40+ imports) - Shadcn/ui library
4. **Zustand Stores** (25+ imports) - State management
5. **Next.js Router** (15+ imports) - App routing
6. **Supabase Client** (12+ imports) - Backend integration

### Component Relationships
- **Pages** → **Layout Components** → **UI Components**
- **Pages** → **Feature Components** → **Stores** → **Services**
- **Services** → **Types** → **Supabase Integration**

## Dependencies Map

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool for React Router
- **Next.js** - App Router pages
- **Tailwind CSS** - Styling system
- **Framer Motion** - Animations

### State Management
- **Zustand** - Global state management
- **React Query** - Server state caching

### Backend Integration
- **Supabase** - Authentication, database, real-time
- **Socket.IO** - Real-time collaboration

### UI Libraries
- **Shadcn/ui** - Component library
- **Lucide React** - Icon system
- **Recharts** - Data visualization

### AI & External Services
- **Custom AI Service** - Design generation
- **Analytics Service** - Business metrics

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintainer:** InkAI Studio Team