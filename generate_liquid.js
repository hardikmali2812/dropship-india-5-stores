const fs = require('fs');
let html = fs.readFileSync('E:/Dropshiping/arrowsghar-universal-storefront.html', 'utf8');

const assets = [
  'vacuum_main_unit.jpg',
  'air_blower_keyboard.jpg',
  'compact_door_storage.jpg',
  'massager-main.jpg',
  'massager-in-use.jpg',
  'massager-waterproof.jpg',
  'hair-treatment.jpg',
  'light_motion_night.jpg',
  'sensor_wardrobe.jpg',
  'sensor_staircase.jpg',
  'aurelia-jewelry.jpg',
  'ortho_work.jpg',
  'ortho_car.jpg',
  'ortho_egg_test.jpg'
];

for (const a of assets) {
  const target = 'assets/' + a;
  const replacement = "{{ '" + a + "' | asset_url }}";
  html = html.split(target).join(replacement);
}

const schema = `
{% schema %}
{
  "name": "Universal Flagship Hub",
  "tag": "section",
  "class": "universal-flagship-section",
  "settings": [
    {
      "type": "text",
      "id": "brand_name",
      "label": "Brand Name",
      "default": "ArrowsGhar™"
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement Text",
      "default": "LIMITED DROP: UP TO 55% OFF SITEWIDE • FREE EXPRESS SHIPPING TODAY"
    },
    {
      "type": "text",
      "id": "whatsapp_number",
      "label": "WhatsApp VIP Number",
      "default": "+919876543210"
    }
  ],
  "presets": [
    {
      "name": "Universal Flagship Hub"
    }
  ]
}
{% endschema %}
`;

const liquidContent = schema + '\n' + html;
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/universal-flagship.liquid', liquidContent, 'utf8');
console.log('Successfully written universal-flagship.liquid (bytes: ' + liquidContent.length + ')');
