# Mockit - Smart Device Mockup Generator

Mockit is a powerful web-based tool designed to create stunning device mockups for your screenshots and designs. Easily frame your images inside realistic device shells like iPhone, Pixel, and web browsers, and export them for presentations, portfolios, or social media.

## Features

- **Multi-Device Support**:
  - **iPhone**: Various models and color options.
  - **Pixel**: Google Pixel device frames.
  - **Browser**: Clean browser windows (Chrome/Safari style) with customizable address bars.
- **Deep Customization**:
  - **Backgrounds**: solid colors, gradients, and transparency.
  - **Shadows**: Adjustable shadow intensity for depth.
  - **Canvas Control**: Zoom, scale, and custom dimensions.
- **Easy Export**:
  - Export as **PNG** (lossless) or **JPEG**.
  - Adjustable quality settings.
  - **Clipboard Support**: Copy directly to clipboard with a button or shortcut (`Cmd+Shift+C`).
  - **Paste Support**: Paste images directly onto the canvas (`Cmd+V`).
- **Modern UI**: Built with a sleek, dark-mode first interface using Tailwind CSS and Framer Motion.

## Tech Stack

This project is built using modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Image Processing**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mockit.git
   cd mockit
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Upload/Paste**: Drag and drop an image or paste it (`Cmd+V`) onto the canvas.
2. **Customize**: Use the left sidebar to change the device type, color, and background.
3. **Adjust**: Use the right sidebar to tweak canvas size and export settings.
4. **Export**: Click "Export" to save your mockup or use `Cmd+Shift+C` to copy it.

## License

[MIT](LICENSE)
