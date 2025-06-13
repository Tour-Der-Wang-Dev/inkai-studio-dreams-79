# InkAI Studio - System Architecture Documentation

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagrams](#architecture-diagrams)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [Integration Points](#integration-points)
- [Security Architecture](#security-architecture)

## System Overview

InkAI Studio is a comprehensive AI-powered tattoo design platform built with a modern, scalable architecture. The system combines advanced AI generation capabilities with a marketplace for professional tattoo artists, real-time collaboration features, and detailed analytics.

### Key Architectural Decisions
- **Hybrid Frontend**: React Router + Next.js for optimal performance and SEO
- **Supabase Backend**: Full-stack platform for auth, database, and real-time features
- **Microservices**: External AI and analytics services for specialized processing
- **Real-time First**: WebSocket-based collaboration and live updates

## Architecture Diagrams

### Overall System Architecture

<lov-mermaid>
graph TB
    %% Client Layer
    subgraph "Client Applications"
        WEB[Web Application]
        MOBILE[Mobile Web]
    end

    %% Frontend Layer
    subgraph "Frontend Architecture"
        REACT[React Router<br/>Vite Build]
        NEXT[Next.js<br/>App Router]
        UI[Shadcn/ui<br/>Components]
    end

    %% State Management
    subgraph "State Management"
        ZUSTAND[Zustand Stores]
        QUERY[React Query<br/>Cache]
    end

    %% Backend Services
    subgraph "Backend Services"
        SUPABASE[Supabase<br/>Platform]
        AI_SERVICE[AI Model<br/>Service]
        ANALYTICS[Analytics<br/>Service]
    end

    %% External Integrations
    subgraph "External Services"
        AI_MODELS[AI Models<br/>APIs]
        STORAGE[File Storage]
        NOTIFICATIONS[Email/SMS]
    end

    %% Data Layer
    subgraph "Data Layer"
        POSTGRES[(PostgreSQL<br/>Database)]
        REALTIME[Real-time<br/>Engine]
        AUTH[Authentication<br/>System]
    end

    %% Connections
    WEB --> REACT
    WEB --> NEXT
    MOBILE --> REACT
    MOBILE --> NEXT

    REACT --> UI
    NEXT --> UI
    UI --> ZUSTAND
    UI --> QUERY

    ZUSTAND --> SUPABASE
    QUERY --> SUPABASE
    QUERY --> AI_SERVICE
    QUERY --> ANALYTICS

    SUPABASE --> POSTGRES
    SUPABASE --> REALTIME
    SUPABASE --> AUTH
    SUPABASE --> STORAGE

    AI_SERVICE --> AI_MODELS
    ANALYTICS --> NOTIFICATIONS
</lov-mermaid>

### User Authentication Flow

<lov-mermaid>
sequenceDiagram
    participant U as User
    participant C as Client App
    participant S as Supabase Auth
    participant D as Database
    participant P as Protected Resource

    U->>C: Login Request
    C->>S: Authenticate Credentials
    S->>D: Validate User
    D-->>S: User Data
    S-->>C: JWT Token + Session
    C->>C: Store Session
    C-->>U: Login Success

    Note over U,P: Accessing Protected Resources
    U->>C: Request Protected Data
    C->>P: Request with JWT
    P->>S: Verify Token
    S-->>P: Token Valid
    P->>D: Query with RLS
    D-->>P: Filtered Data
    P-->>C: Protected Data
    C-->>U: Display Data
</lov-mermaid>

### AI Generation Pipeline

<lov-mermaid>
graph LR
    subgraph "User Input"
        PROMPT[Prompt Text]
        STYLE[Style Selection]
        REF[Reference Images]
    end

    subgraph "Processing Pipeline"
        OPTIMIZE[Prompt<br/>Optimization]
        QUEUE[Generation<br/>Queue]
        MODEL[AI Model<br/>Selection]
        GENERATE[Image<br/>Generation]
    end

    subgraph "Post-Processing"
        ENHANCE[Image<br/>Enhancement]
        METADATA[Metadata<br/>Extraction]
        STORE[Cloud<br/>Storage]
    end

    subgraph "Delivery"
        NOTIFY[Real-time<br/>Notification]
        DISPLAY[Result<br/>Display]
        FEEDBACK[User<br/>Feedback]
    end

    PROMPT --> OPTIMIZE
    STYLE --> MODEL
    REF --> GENERATE

    OPTIMIZE --> QUEUE
    QUEUE --> MODEL
    MODEL --> GENERATE

    GENERATE --> ENHANCE
    ENHANCE --> METADATA
    METADATA --> STORE

    STORE --> NOTIFY
    NOTIFY --> DISPLAY
    DISPLAY --> FEEDBACK
    FEEDBACK --> OPTIMIZE
</lov-mermaid>

### Real-time Collaboration System

<lov-mermaid>
graph TB
    subgraph "Client A"
        CA_UI[User Interface]
        CA_STATE[Local State]
        CA_SOCKET[WebSocket Client]
    end

    subgraph "Client B"
        CB_UI[User Interface]
        CB_STATE[Local State]
        CB_SOCKET[WebSocket Client]
    end

    subgraph "Real-time Infrastructure"
        SUPABASE_RT[Supabase Realtime]
        BROADCAST[Broadcast Channel]
        PRESENCE[Presence System]
    end

    subgraph "Persistence Layer"
        DB[(Database)]
        CHANGES[Change Log]
    end

    CA_UI --> CA_STATE
    CA_STATE --> CA_SOCKET
    CA_SOCKET --> SUPABASE_RT

    CB_UI --> CB_STATE
    CB_STATE --> CB_SOCKET
    CB_SOCKET --> SUPABASE_RT

    SUPABASE_RT --> BROADCAST
    SUPABASE_RT --> PRESENCE
    SUPABASE_RT --> DB

    BROADCAST --> CA_SOCKET
    BROADCAST --> CB_SOCKET

    DB --> CHANGES
    CHANGES --> SUPABASE_RT
</lov-mermaid>

## Component Architecture

### Frontend Components

#### Core Studio Components
- **DesignCanvas** - Main workspace for tattoo design creation
  - Handles canvas state management
  - Integrates with AI generation pipeline
  - Supports real-time collaboration
  - Manages tool palette interactions

- **AIIntegrationPanel** - AI model selection and configuration
  - Model performance monitoring
  - Prompt engineering interface
  - Generation queue management
  - Results handling and feedback

- **ToolPalette** - Design tools and utilities
  - Drawing tools and brushes
  - Layer management
  - Transform controls
  - Style presets

#### Artist Marketplace Components
- **ArtistProfile** - Comprehensive artist showcase
  - Portfolio grid with before/after comparisons
  - Skills visualization with proficiency levels
  - Client reviews and ratings
  - Booking calendar integration

- **BookingSystem** - Appointment scheduling
  - Availability calendar
  - Session type selection
  - Price calculation
  - Real-time chat integration

#### Analytics Dashboard
- **MetricsOverview** - Key performance indicators
  - Revenue tracking
  - User engagement metrics
  - AI generation statistics
  - Artist performance data

- **RevenueChart** - Financial analytics
  - Time-series revenue data
  - Subscription tier analysis
  - Payment processing metrics
  - Forecasting capabilities

### Backend Architecture

#### Supabase Integration
- **Authentication System**
  - JWT-based sessions
  - Social login providers
  - Multi-factor authentication
  - Session management

- **Database Layer**
  - PostgreSQL with Row Level Security
  - Real-time subscriptions
  - Automated backups
  - Performance optimization

- **Storage System**
  - Secure file uploads
  - Image optimization
  - CDN integration
  - Access control

## Data Flow

### Design Creation Workflow
1. **User Input** - User provides prompt and selects style
2. **Prompt Optimization** - AI enhances prompt for better results
3. **Model Selection** - System chooses optimal AI model
4. **Queue Management** - Request enters generation queue
5. **AI Processing** - External AI service generates design
6. **Post-processing** - Image enhancement and metadata extraction
7. **Storage** - Secure upload to cloud storage
8. **Notification** - Real-time update to user interface
9. **Feedback Loop** - User rating improves future generations

### Artist Booking Flow
1. **Artist Discovery** - Browse artist profiles and portfolios
2. **Availability Check** - View real-time calendar
3. **Session Selection** - Choose consultation, design, or tattoo
4. **Booking Request** - Submit preferences and special requests
5. **Artist Confirmation** - Real-time notification to artist
6. **Payment Processing** - Secure transaction handling
7. **Chat Activation** - Enable direct communication
8. **Session Management** - Track booking lifecycle

## Database Schema

### Core Tables

<lov-mermaid>
erDiagram
    users ||--o{ artist_profiles : "has"
    users ||--o{ designs : "creates"
    users ||--o{ booking_requests : "makes"
    
    artist_profiles ||--o{ artist_portfolios : "contains"
    artist_profiles ||--o{ artist_skills : "has"
    artist_profiles ||--o{ artist_reviews : "receives"
    artist_profiles ||--o{ booking_slots : "offers"
    
    booking_requests ||--o{ artist_chat_rooms : "initiates"
    artist_chat_rooms ||--o{ artist_chat_messages : "contains"
    
    designs ||--o{ generation_requests : "triggers"
    designs ||--o{ design_collaborations : "enables"

    users {
        uuid id PK
        string email
        string full_name
        string avatar_url
        timestamp created_at
    }

    artist_profiles {
        uuid id PK
        uuid user_id FK
        text bio
        string[] specializations
        decimal hourly_rate
        boolean is_verified
        string[] portfolio_images
        jsonb social_links
        jsonb availability_settings
    }

    designs {
        uuid id PK
        uuid user_id FK
        string title
        text description
        string image_url
        string style
        jsonb metadata
        boolean is_public
    }

    booking_requests {
        uuid id PK
        uuid client_id FK
        uuid artist_id FK
        string session_type
        timestamp[] preferred_dates
        text special_requests
        string status
        decimal total_price
    }
</lov-mermaid>

### Advanced Tables
- **artist_portfolios** - Portfolio items with process steps
- **artist_skills** - Skills with proficiency levels and certifications
- **artist_reviews** - Client feedback with ratings and images
- **booking_slots** - Available time slots with pricing
- **artist_chat_rooms** - Real-time communication channels
- **artist_chat_messages** - Chat history with file attachments

## Integration Points

### External AI Services
- **Model APIs** - Integration with multiple AI providers
- **Queue Management** - Distributed processing system
- **Result Processing** - Image enhancement and optimization
- **Performance Monitoring** - Real-time metrics and alerting

### Analytics Platform
- **Event Tracking** - User behavior analytics
- **Business Metrics** - Revenue and engagement data
- **Performance Monitoring** - System health and optimization
- **Custom Reports** - Automated report generation

### Payment Processing
- **Stripe Integration** - Secure payment handling
- **Subscription Management** - Recurring billing
- **Invoice Generation** - Automated billing
- **Refund Processing** - Customer service tools

## Security Architecture

### Authentication & Authorization
- **JWT Tokens** - Secure session management
- **Row Level Security** - Database-level access control
- **Role-based Access** - Granular permission system
- **API Security** - Rate limiting and validation

### Data Protection
- **Encryption at Rest** - Database and file encryption
- **Encryption in Transit** - HTTPS and WSS protocols
- **Data Anonymization** - Privacy-compliant analytics
- **Backup Security** - Encrypted backup storage

### Input Validation
- **Client-side Validation** - User experience optimization
- **Server-side Validation** - Security and data integrity
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - Content sanitization

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintainer:** InkAI Studio Team