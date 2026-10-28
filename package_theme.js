const fs = require('fs');
const path = require('path');

const themeDir = 'E:/Dropshiping/arrowsghar-theme';
const assetsDir = path.join(themeDir, 'assets');
const sectionsDir = path.join(themeDir, 'sections');
const templatesDir = path.join(themeDir, 'templates');

// Ensure directories exist
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(sectionsDir, { recursive: true });
fs.mkdirSync(templatesDir, { recursive: true });

// Copy image assets
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  const files = fs.readdirSync(src);
  for (const f of files) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, dest);
    } else {
      fs.copyFileSync(s, d);
      console.log('Copied asset:', f);
    }
  }
}

copyDir('E:/Dropshiping/product-1-car-vacuum/assets/images', assetsDir);
copyDir('E:/Dropshiping/product-2-scalp-massager/assets', assetsDir);
copyDir('E:/Dropshiping/product-3-motion-sensor-light/images', assetsDir);
copyDir('E:/Dropshiping/product-5-orthopedic-cushion/assets/images', assetsDir);

// Package each product HTML as a Shopify Liquid section and template
const products = [
  { name: 'aerocyclone', title: 'AeroCyclone Auto Pro', path: 'E:/Dropshiping/product-1-car-vacuum/index.html' },
  { name: 'folliglow', title: 'FolliGlow Trichology', path: 'E:/Dropshiping/product-2-scalp-massager/index.html' },
  { name: 'lumiglow', title: 'LumiGlow Smart Living', path: 'E:/Dropshiping/product-3-motion-sensor-light/index.html' },
  { name: 'aurelia', title: 'Aurelia Luxe Jewels', path: 'E:/Dropshiping/product-4-anti-tarnish-jewelry/index.html' },
  { name: 'ergospine', title: 'ErgoSpine Orthopedics', path: 'E:/Dropshiping/product-5-orthopedic-cushion/index.html' },
  { name: 'master-hub', title: 'Dropship India Intelligence Hub', path: 'E:/Dropshiping/index.html' }
];

for (const p of products) {
  let html = fs.readFileSync(p.path, 'utf8');

  // Convert image paths to Shopify asset_url filter
  // e.g. src="./assets/images/foo.jpg" -> src="{{ 'foo.jpg' | asset_url }}"
  html = html.replace(/src=["'](?:\.\/)?(?:assets\/images\/|assets\/|images\/)([^"']+)["']/g, (match, filename) => {
    return `src="{{ '${filename}' | asset_url }}"`;
  });
  html = html.replace(/onerror=["']this\.src=['"](?:\.\/)?(?:assets\/images\/|assets\/|images\/)([^'"]+)['"]["']/g, (match, filename) => {
    return `onerror="this.src='{{ '${filename}' | asset_url }}'"`;
  });

  // Extract body content or keep full layout with Tailwind
  const sectionContent = `
{% schema %}
{
  "name": "${p.title}",
  "settings": []
}
{% endschema %}

<!-- TailWind & Lucide CDN for Standalone Dropship Section -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

<div class="shopify-dropship-landing" style="font-family: 'Plus Jakarta Sans', sans-serif;">
${html}
</div>
`;

  fs.writeFileSync(path.join(sectionsDir, `landing-${p.name}.liquid`), sectionContent, 'utf8');
  console.log('Created section:', `landing-${p.name}.liquid`);

  // Create page template JSON
  const templateJson = {
    sections: {
      main: {
        type: `landing-${p.name}`
      }
    },
    order: ["main"]
  };
  fs.writeFileSync(path.join(templatesDir, `page.${p.name}.json`), JSON.stringify(templateJson, null, 2), 'utf8');
  console.log('Created template:', `page.${p.name}.json`);
}

console.log('=== Shopify Theme Packaging Complete! ===');
