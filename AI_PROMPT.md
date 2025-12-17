# LikeAdmin PHP - Project AI Prompt

This document provides a comprehensive overview of the LikeAdmin PHP project context, architecture, and development conventions. It is intended to assist AI editors and developers in understanding the codebase.

## 1. Project Overview
LikeAdmin PHP is a rapid development framework featuring a separated front-end and back-end architecture.
- **Backend**: ThinkPHP 8.0
- **Admin Panel**: Vue 3 + Element Plus
- **Mobile Client**: UniApp (supports WeChat Mini Program, H5, App)
- **PC Client**: Nuxt 3 (SSR)

## 2. Technology Stack

### Server (Backend)
- **Framework**: ThinkPHP 8.0 (`topthink/framework`)
- **Language**: PHP >= 8.0
- **Database**: MySQL
- **Cache**: Redis
- **Key Dependencies**:
  - `topthink/think-orm`: ORM
  - `topthink/think-multi-app`: Multi-app support
  - `w7corp/easywechat`: WeChat SDK

### Admin (Management Panel)
- **Framework**: Vue 3.5 + Vite
- **UI Library**: Element Plus 2.9
- **CSS**: Tailwind CSS + SCSS
- **State Management**: Pinia
- **Router**: Vue Router
- **HTTP Client**: Axios

### Uniapp (Mobile Client)
- **Framework**: UniApp (Vue 3 based)
- **UI Library**: vk-uview-ui
- **CSS**: Tailwind CSS + SCSS
- **Platforms**: WeChat Mini Program, H5, Android/iOS App

### PC (Web Client)
- **Framework**: Nuxt 3.6
- **UI Library**: Element Plus
- **CSS**: Tailwind CSS

## 3. Directory Structure

### Root Directory
- `server/`: PHP Backend code
- `admin/`: Vue 3 Admin Panel source code
- `uniapp/`: Mobile client source code
- `pc/`: Nuxt 3 PC client source code
- `docker/`: Docker deployment configurations

### Server Structure (`server/`)
- `app/`: Application logic
  - `adminapi/`: Admin panel APIs (Controllers, Logic, Services)
  - `api/`: Client-facing APIs (Mobile/PC)
  - `common/`: Shared logic (Models, Enums, Utils)
- `config/`: Configuration files
- `public/`: Web root (entry point `index.php`)
- `.env`: Environment variables (Database, Redis, Debug)

### Admin Structure (`admin/src/`)
- `api/`: API request definitions
- `views/`: Page components
- `components/`: Global reusable components
- `layout/`: Main layout structure
- `router/`: Route definitions
- `stores/`: Pinia state management
- `utils/`: Utility functions

### Uniapp Structure (`uniapp/src/`)
- `pages/`: Page views
- `api/`: API request definitions
- `components/`: Reusable components
- `uni_modules/`: Plugins (e.g., vk-uview-ui)
- `manifest.json`: App configuration
- `pages.json`: Page routing and window configuration

## 4. Development Conventions

### Server (ThinkPHP)
- **Architecture**: Controller -> Logic -> Service -> Model
  - **Controller**: Handles HTTP requests, parameter validation.
  - **Logic**: Business logic implementation.
  - **Service**: Reusable services (e.g., Upload, SMS).
  - **Model**: Database interactions.
- **Routing**: Defined in `app/adminapi/config/route.php` and `app/api/config/route.php`.
- **Response Format**: Standard JSON structure (`code`, `msg`, `data`, `show`).
- **Authentication**: Token-based authentication (AdminToken, UserToken).

### Admin (Vue 3)
- **Component Style**: Composition API (`<script setup lang="ts">`).
- **Naming**: PascalCase for components, kebab-case for files.
- **API Calls**: Defined in `src/api/` and imported in components.

### Uniapp
- **Multi-platform**: Use conditional compilation (`#ifdef`, `#endif`) for platform-specific logic.
- **Styling**: SCSS, atomic classes (Tailwind-like) available.

## 5. Configuration & Environment

### Server
- Copy `.example.env` to `.env`
- Configure `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Configure `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`

### Frontends (Admin/Uniapp/PC)
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables
- Key Variable: `VITE_APP_BASE_URL` (API Base URL)

## 6. Deployment Guide (Brief)

### Nginx Configuration
- Point root to `server/public`
- Enable URL Rewrite (Hide `index.php`)
- Proxy PHP requests to PHP-FPM (e.g., `127.0.0.1:9000`)

### Build Commands
- **Admin**: `npm run build` (Output: `server/public/admin`)
- **Uniapp (H5)**: `npm run build:h5`
- **PC**: `npm run build`

## 7. Coding Standards & Best Practices

### Backend (ThinkPHP)
- **Controller Inheritance**: All Admin API controllers MUST inherit from `app\adminapi\controller\BaseAdminController`.
- **Logic Layer**: Business logic should reside in `Logic` classes (e.g., `ConfigLogic`), NOT in controllers.
- **Service Usage**: Use `ConfigService::get('group', 'name')` for settings and `FileService::getFileUrl($path)` for file URLs.
- **Model Traits**: Use `SoftDelete` for safe deletion if required.
- **Naming**: 
  - Controllers: `PascalCase` (e.g., `UserController`)
  - Tables: `snake_case` (e.g., `ls_user`)
  - API Response: Always use `success($msg, $data)` or `fail($msg)` methods from `BaseLikeAdminController`.
- **Middleware**: Defined in `app/adminapi/config/route.php`. Includes `InitMiddleware`, `LoginMiddleware` (Auth), and `AuthMiddleware` (Permissions).
- **Validation**: Use `app\adminapi\validate\BaseValidate` subclasses. Define scenes (e.g., `sceneDetail`) and custom check methods.
- **Enums**: Heavy use of Enums (e.g., `NoticeEnum`, `UserEnum`) located in `app/common/enum`. Always use Enums instead of magic numbers.

### Frontend (Vue 3 Admin)
- **Request Wrapper**: Use `request.get/post` from `@/utils/request`.
  - Example: `request.get({ url: '/path', params: {} })`
- **Global Components**:
  - `<material-picker>`: For selecting images/files.
  - `<editor>`: For rich text editing.
  - `<dict-value>`: For displaying dictionary values.
  - `<daterange-picker>`: For date range selection.
  - `<upload>`: For file uploads (uses `<el-upload>`).
- **State Management**: Use Pinia stores located in `@/stores`.
- **Routing**: Define routes in `@/router`.
- **Icons**: Use SVG icons in `src/assets/icons` or Element Plus icons.

### Mobile (UniApp)
- **Request Wrapper**: Use `request` from `@/utils/request`.
  - Example: `request.get({ url: '/path' }, { isAuth: true })`
- **UI Framework**: Use `vk-uview-ui` components (e.g., `<u-button>`, `<u-toast>`).
- **Platform Check**: Use `#ifdef MP-WEIXIN` for WeChat-specific logic.
- **Config**: Global config in `src/config/index.ts` (baseUrl, etc.).

## 8. Common Logic Patterns

### Config Retrieval
- **Backend**: `ConfigService::get('website', 'name')`
- **Frontend**: API `/config/getConfig` returns global config.
- **Admin**: `useAppStore().config`
- **UniApp**: `appConfig` from `@/config`

### Image/File Handling
- **Backend**: `FileService::getFileUrl($path)` automatically appends the domain.
- **Admin**: Use `<upload type="image" />` for uploading and `<material-picker v-model="form.image" />` for selection.
- **UniApp**: Use `uni.uploadFile` or uView's `<u-upload>`.

### Authentication
- **Admin**: `useUserStore().token` stores the JWT token.
- **UniApp**: `getToken()` from `@/utils/auth`.

## 9. Useful Links
- **Official Docs**: https://doc.likeadmin.cn/
- **PHP Docs**: https://doc.likeadmin.cn/php/
