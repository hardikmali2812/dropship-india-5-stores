const fs = require('fs');
const path = require('path');

// 1. settings_schema.json
let ss = fs.readFileSync('E:/Dropshiping/arrowsghar-theme/config/settings_schema.json', 'utf8');
// remove trailing comma before ]
ss = ss.replace(/,\s*\]/g, '\n    ]');
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/config/settings_schema.json', ss, 'utf8');

// 2. en.default.schema.json
let es = fs.readFileSync('E:/Dropshiping/arrowsghar-theme/locales/en.default.schema.json', 'utf8');
// remove trailing comma before }
es = es.replace(/,\s*\}/g, '\n  }');
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/locales/en.default.schema.json', es, 'utf8');

// 3. header-group.json
let hg = fs.readFileSync('E:/Dropshiping/arrowsghar-theme/sections/header-group.json', 'utf8');
hg = hg.replace(/,\s*\}/g, '\n}');
fs.writeFileSync('E:/Dropshiping/arrowsghar-theme/sections/header-group.json', hg, 'utf8');

// Now validate all JSON in theme
let errors = 0;
function checkDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      checkDir(full);
    } else if (f.endsWith('.json')) {
      try {
        let content = fs.readFileSync(full, 'utf8');
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');
        JSON.parse(content);
        console.log('OK:', f);
      } catch (err) {
        console.error('ERROR in', full, err.message);
        errors++;
      }
    }
  }
}

checkDir('E:/Dropshiping/arrowsghar-theme');
console.log('Total JSON errors:', errors);
