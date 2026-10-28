const fs = require('fs');
const path = require('path');

const htmlPath = 'E:/Dropshiping/arrowsghar-storefront.html';
const themeDir = 'E:/Dropshiping/arrowsghar-theme';
const sectionPath = path.join(themeDir, 'sections/landing-arrowsghar-hub.liquid');
const indexPath = path.join(themeDir, 'templates/index.json');

let html = fs.readFileSync(htmlPath, 'utf8');

// Convert image paths to Shopify asset_url
html = html.replace(/src=["'](?:\.\/)?(?:arrowsghar-theme\/assets\/|assets\/images\/|assets\/|images\/)([^"']+)["']/g, (match, filename) => {
  return `src="{{ '${filename}' | asset_url }}"`;
});
html = html.replace(/onerror=["']this\.src=['"](?:\.\/)?(?:arrowsghar-theme\/assets\/|assets\/images\/|assets\/|images\/)([^'"]+)['"]["']/g, (match, filename) => {
  return `onerror="this.src='{{ '${filename}' | asset_url }}'"`;
});

const sectionContent = `
{% schema %}
{
  "name": "ArrowsGhar Master Storefront",
  "settings": []
}
{% endschema %}

<!-- TailWind & Lucide CDN for Standalone Dropship Section -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

<div class="arrowsghar-storefront-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif;">
${html}
</div>
`;

fs.writeFileSync(sectionPath, sectionContent, 'utf8');
console.log('Created section:', sectionPath);

// Set index.json to render landing-arrowsghar-hub as the main home section
const indexJson = {
  sections: {
    main: {
      type: "landing-arrowsghar-hub"
    }
  },
  order: ["main"]
};
fs.writeFileSync(indexPath, JSON.stringify(indexJson, null, 2), 'utf8');
console.log('Updated index.json to point to landing-arrowsghar-hub');

console.log('=== Theme Integration Complete! ===');
