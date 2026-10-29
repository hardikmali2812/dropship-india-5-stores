const fs = require('fs');
let html = fs.readFileSync('E:/Dropshiping/arrowsghar-theme-pure.html', 'utf8');

const schema = `
{% schema %}
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

const liquid = schema + '\n' + html;
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/pure-theme-hub.liquid', liquid, 'utf8');
console.log('Successfully written pure-theme-hub.liquid:', liquid.length);
