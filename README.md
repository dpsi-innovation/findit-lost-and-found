# CampusFound — School Lost & Found Management System

> **Designed for Phone-Free School Environments & Future LMS Integration**  
> A lightweight, modern, and professional web platform enabling students, teachers, and security staff to catalog, protect, and reunite lost property on campus.

---

## 🏫 Key Solutions for the "No Mobile Phones" Challenge

In schools where students are prohibited from carrying mobile devices during class hours, standard smartphone-first apps fail. **CampusFound** solves this with three practical pillars:

1. **Shared Terminal / Kiosk Mode with Live Webcam Capture**:
   - Deployed on shared computers in the library, reception, or lab terminals.
   - Anyone finding an item can take a live photo using the terminal's built-in webcam in 5 seconds.
   - If a webcam is unavailable or in use, a curated library of school preset visuals (blazers, calculators, bottles, keys, etc.) is available with 1 click.
2. **Student Roll Number / Pass Verification (No Password Fatigue)**:
   - Students don't need complex passwords to log an item or file a claim.
   - Entering their Student ID / Roll Number (e.g., `10-B-24`) generates a **Digital Claim Pass** with a unique token code (`VERIFY-XXXX`) that they can show to the duty supervisor at recess or after school.
3. **Anti-Theft Hidden Verification Prompts**:
   - To stop dishonest claims for high-value items (scientific calculators, smartwatches, wallets), finders or staff can set a secret verification question (e.g., *"What is written on the inner pocket tag?"*).
   - Only claimants providing matching answers have their claims approved.

---

## 🎓 LMS Integration Ready (Canvas, Moodle, Google Classroom)

CampusFound is architected for zero-friction integration into school Learning Management Systems:

- **LTI 1.3 & OAuth 2.0 Compliant**: Runs as an authenticated tool inside student course portals.
- **Single Sign-On (SSO)**: Automatically inherits the student's name, email, and roll number when accessed through Canvas, Moodle, or Google Workspace.
- **Embedded Widget View**: Provides a borderless `/embed` mode with `allow="camera"` policy for campus Chromebooks and desktop labs.

```html
<iframe
  src="https://lostfound.school.edu/embed?theme=light&auth=lti_v1p3"
  width="100%"
  height="700"
  frameborder="0"
  allow="camera; microphone"
  title="Campus Lost & Found Hub"
></iframe>
```

---

## 🚀 Features & Interface Views

- **🎓 Student Portal**: Crisp, institutional light-themed directory with instant search, category filters, and claim buttons.
- **🖥️ Terminal Kiosk**: High-touch, 3-step reporting workflow with auto-reset session timer for public school PCs.
- **🛡️ Staff & Custody Desk**: Complete queue for custodians to inspect verification answers, approve/reject claims, and manage physical storage locker bins (`Bin #1A` to `Bin #7`).
- **🗺️ Campus Zones Directory**: Visual breakdown of campus collection desks across Academic Wing, Science Labs, Cafeteria, Sports Turf, and Security Gates.
- **💾 Local Storage Persistence**: Newly reported items and claims persist across browser reloads.

---

## 🛠️ Development & Deployment

### Quick Start
```bash
# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev

# Build production bundle
npm run build
```

### Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS (Clean slate/blue institutional palette)
- **Icons**: Lucide React
