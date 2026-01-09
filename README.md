# 🌱 EcoScan – Sustainable Shopping Assistant

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### 🚀 [Live Demo](https://sustainable-shopping-assistant-kppg8woi9.vercel.app) | 📦 [GitHub Repository](https://github.com/selvaganapathycoder/Sustainable-Shopping-Assistant)

**A modern, mobile-first web application that helps users make sustainable shopping choices by scanning products and tracking their environmental impact.**

</div>

---

## 📖 Overview

EcoScan is a comprehensive sustainability tracking application that empowers consumers to make environmentally conscious purchasing decisions. By scanning product barcodes, users can instantly access sustainability scores, eco-friendly alternatives, and track their positive environmental impact over time.

### 🎯 Problem Statement
Modern consumers want to make sustainable choices but find eco-labels confusing and alternatives hard to discover. EcoScan simplifies this decision-making process in seconds.

### 💡 Solution
An intuitive mobile-first application that provides:
- **Instant product sustainability analysis** via barcode scanning
- **Comprehensive scoring system** based on packaging, carbon footprint, ethics, and recyclability
- **Personalized progress tracking** with gamification elements
- **Historical data** of all scanned products
- **Eco-friendly alternatives** recommendations

---

## ✨ Key Features

### 🔍 Barcode Scanner
- Real-time barcode scanning using device camera
- Powered by `html5-qrcode` library
- Instant product lookup from mock database
- Fallback manual entry option

### 📊 Sustainability Scoring
Comprehensive 0-100 score calculated from four pillars:
```
Score = (Packaging + Carbon Footprint + Ethics + Recyclability) / 4
```
- **90-100 (Grade A)**: ✅ Highly Recommended
- **60-89 (Grade B/C)**: ⚠️ Moderate Impact
- **0-59 (Grade D/E)**: ❌ Consider Alternatives

### 📈 Progress Dashboard
- Track total scans and CO₂ savings
- Earn achievement badges (Eco Warrior, Carbon Saver, etc.)
- Visual progress charts
- Sustainability streak tracking

### 📜 Scan History
- Complete history of all scanned products
- Filter and search capabilities
- Quick re-access to product details
- Persistent storage using LocalStorage

### 👤 User Profile
- Personalized sustainability goals
- Achievement showcase
- Statistics overview
- Settings and preferences

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - Latest React with modern hooks
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.3.1** - Lightning-fast build tool

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Framer Motion 12.24.10** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Recharts 3.6.0** - Responsive chart components

### State Management
- **React Context API** - Global state management
- **LocalStorage** - Persistent data caching

### Routing & Navigation
- **React Router DOM 7.12.0** - Client-side routing

### Barcode Scanning
- **html5-qrcode 2.3.8** - Camera-based barcode scanning

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Modern web browser with camera access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/selvaganapathycoder/Sustainable-Shopping-Assistant.git
cd Sustainable-Shopping-Assistant
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       └── Navbar.tsx
├── pages/               # Page components
│   ├── Home.tsx
│   ├── BarcodeScanner.tsx
│   ├── ProductDetail.tsx
│   ├── History.tsx
│   ├── Progress.tsx
│   ├── Profile.tsx
│   └── Onboarding.tsx
├── context/             # State management
│   ├── AppContext.tsx
│   ├── AppContextCore.ts
│   └── useAppContext.ts
├── data/                # Mock data
│   └── mockProducts.ts
├── utils/               # Utility functions
│   ├── logger.ts
│   └── sustainability.ts
├── types/               # TypeScript types
│   └── index.ts
├── assets/              # Static assets
│   ├── logo.svg
│   └── title.svg
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## 🎨 Design Highlights

### Color Palette
- **Primary Green**: `#16a34a` - Eco-friendly brand color
- **Accent Green**: `#22c55e` - Interactive elements
- **Background**: `#f8f9fa` - Clean, modern base
- **Text**: `#1f2937` - High contrast readability

### UI/UX Features
- **Mobile-First Design** - Optimized for smartphones
- **Smooth Animations** - Framer Motion micro-interactions
- **Responsive Layout** - Works on all screen sizes
- **Intuitive Navigation** - Bottom tab bar for easy access
- **Accessibility** - WCAG compliant color contrasts

---

## 🎮 Demo Features

### Pre-configured Test Barcodes
Try scanning these barcodes in the demo:
- `8901030123456` - Eco-Friendly Water Bottle (Grade A)
- `8901030789012` - Bamboo Toothbrush (Grade A)
- `8901030345678` - Reusable Shopping Bag (Grade B)

### Mock Product Database
The application includes a comprehensive mock database with:
- Product names and descriptions
- Sustainability scores and grades
- CO₂ impact calculations
- Eco-friendly alternatives
- Detailed sustainability breakdowns

---

## 📊 Performance Metrics

### Build Output
- **Bundle Size**: 1.1 MB (345 KB gzipped)
- **Build Time**: ~1 minute
- **Lighthouse Score**: 95+ Performance

### Optimization Techniques
- Code splitting with React.lazy()
- Image optimization
- CSS purging with Tailwind
- Tree shaking with Vite
- LocalStorage caching

---

## 🌐 Deployment

### Live Application
🔗 **[https://sustainable-shopping-assistant-kppg8woi9.vercel.app](https://sustainable-shopping-assistant-kppg8woi9.vercel.app)**

### Deployment Platform
- **Vercel** - Automatic deployments from GitHub
- **CI/CD** - Every push to `main` triggers deployment
- **Preview Deployments** - Pull requests get preview URLs

---

## 🔮 Future Enhancements

- [ ] **Real Product API Integration** - Connect to actual product databases
- [ ] **User Authentication** - Firebase/Auth0 integration
- [ ] **Social Features** - Share achievements with friends
- [ ] **Advanced Analytics** - Detailed sustainability insights
- [ ] **Offline Mode** - PWA with service workers
- [ ] **Multi-language Support** - i18n implementation
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Export Reports** - PDF sustainability reports

---

## 👨‍💻 Developer

**Selvaganapathy**
- GitHub: [@selvaganapathycoder](https://github.com/selvaganapathycoder)
- Portfolio: [View Live Demo](https://sustainable-shopping-assistant-kppg8woi9.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Barcode scanning by [html5-qrcode](https://github.com/mebjas/html5-qrcode)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ for a sustainable future 🌍**

</div>
