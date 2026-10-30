const fs = require('fs');

// 1. Read full pure HTML
const fullHtml = fs.readFileSync('E:/Dropshiping/arrowsghar-theme-pure.html', 'utf8');

// 2. Extract content inside <body>...</body>
const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.error('Could not extract body from arrowsghar-theme-pure.html');
  process.exit(1);
}
const innerSectionHtml = bodyMatch[1].trim();

// 3. Write clean layout/theme.liquid
const themeLiquid = `<!doctype html>
<html lang="{{ request.locale.iso_code }}" class="scroll-smooth">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page_title }} | ArrowsGhar™ Flagship Ultra</title>

    <!-- Google Fonts: Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS & Lucide Icons -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- 3D Model Viewer & Confetti Engine -->
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
              brand: {
                50: '#f5f7ff',
                100: '#ebf0fe',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#1e1b4b',
              }
            },
            animation: {
              'marquee': 'marquee 25s linear infinite',
              'float': 'float 3.5s ease-in-out infinite',
              'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
              marquee: {
                '0%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-50%)' },
              },
              float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-8px)' },
              },
              pulseSubtle: {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.88, transform: 'scale(1.05)' },
              }
            }
          }
        }
      }
    </script>

    <style>
      body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
      input, select, textarea { font-size: 16px !important; }
      .hero-slide { transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .glass-card {
        background: rgba(17, 24, 39, 0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .glass-nav {
        background: rgba(10, 15, 29, 0.9);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
    </style>

    {{ content_for_header }}
  </head>

  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-brand-600 selection:text-white">
    {{ content_for_layout }}
  </body>
</html>
`;

fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/layout/theme.liquid', themeLiquid, 'utf8');
console.log('Clean layout/theme.liquid written successfully');

// 4. Write clean sections/pure-theme-hub.liquid without nested html/head/body
const schema = `{% schema %}
{
  "name": "Pure Theme Master Hub",
  "tag": "section",
  "class": "pure-theme-hub-section",
  "settings": [
    {
      "type": "text",
      "id": "brand_title",
      "label": "Brand Title",
      "default": "ArrowsGhar™"
    },
    {
      "type": "text",
      "id": "whatsapp_support",
      "label": "WhatsApp VIP Number",
      "default": "+919876543210"
    }
  ],
  "presets": [
    {
      "name": "Pure Theme Master Hub"
    }
  ]
}
{% endschema %}
`;

const liquidSection = schema + '\n' + innerSectionHtml;
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/pure-theme-hub.liquid', liquidSection, 'utf8');
console.log('Clean sections/pure-theme-hub.liquid written. Size:', liquidSection.length);

// 5. Verify templates/index.json
const indexJson = {
  "sections": {
    "main": {
      "type": "pure-theme-hub"
    }
  },
  "order": [
    "main"
  ]
};
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/templates/index.json', JSON.stringify(indexJson, null, 2), 'utf8');

// 6. Empty header-group and footer-group
const emptyGroup = { "sections": {}, "order": [] };
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/header-group.json', JSON.stringify(emptyGroup, null, 2), 'utf8');
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/footer-group.json', JSON.stringify(emptyGroup, null, 2), 'utf8');

console.log('Architecture cleanly synchronized and verified!');
