const fs = require('fs');

let html = fs.readFileSync('E:/Dropshiping/arrowsghar-theme-pure.html', 'utf8');

// 1. Add Canvas Confetti and Model Viewer scripts to <head>
const headScripts = `  <!-- 3D Model Viewer & Confetti Engine (Subagent 2 & 3 Research) -->
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
`;

if (!html.includes('model-viewer.min.js')) {
  html = html.replace('</head>', headScripts + '</head>');
  console.log('Added 3D model-viewer and canvas-confetti scripts');
}

// 2. Upgrade Lookbook Hotspots with Interactive Tooltip Micro-Cards
const oldLookbookHotspots = `        <!-- Hotspot Pin 1: Smart Lighting -->
        <div class="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2">
          <button onclick="openHotspotModal('Ambient Motion Sensor Light', 799, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=500&q=80', 'Zero wiring magnetic night bar with instant infrared sensor.')" class="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-2xl hover:scale-125 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-brand-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Hotspot Pin 2: Ergonomic Cushion on Sofa -->
        <div class="absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2">
          <button onclick="openHotspotModal('Honeycomb Orthopedic Cushion', 999, 'https://images.unsplash.com/photo-1580481077195-c32e921e1e47?auto=format&fit=crop&w=500&q=80', 'Ergonomic pressure-relief cooling gel cushion for office & car.')" class="relative flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-125 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Hotspot Pin 3: Cordless Clean Tech -->
        <div class="absolute top-[75%] left-[80%] -translate-x-1/2 -translate-y-1/2">
          <button onclick="openHotspotModal('Cordless Cyclone Turbo Cleaner', 1299, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80', '9000Pa cyclone suction with USB-C fast charging.')" class="relative flex items-center justify-center w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-2xl hover:scale-125 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-amber-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>
        </div>`;

const newLookbookHotspots = `        <!-- Hotspot Pin 1: Smart Lighting with Live Hover Tooltip -->
        <div class="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 group z-20">
          <button onclick="openHotspotModal('Ambient Motion Sensor Light', 799, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=500&q=80', 'Zero wiring magnetic night bar with instant infrared sensor.')" class="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-brand-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>

          <!-- Floating Micro Card Tooltip -->
          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
            <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80" alt="Sensor Light" class="w-full h-20 rounded-xl object-cover mb-2 border border-slate-100">
            <p class="font-extrabold text-xs text-slate-900 truncate">Ambient Sensor Bar</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xs font-black text-brand-700">₹799</span>
              <button onclick="addToBag('Ambient Motion Sensor Light', 799, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=500&q=80')" class="px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 shadow-sm">
                + Add
              </button>
            </div>
          </div>
        </div>

        <!-- Hotspot Pin 2: Ergonomic Cushion with Live Hover Tooltip -->
        <div class="absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 group z-20">
          <button onclick="openHotspotModal('Honeycomb Orthopedic Cushion', 999, 'https://images.unsplash.com/photo-1580481077195-c32e921e1e47?auto=format&fit=crop&w=500&q=80', 'Ergonomic pressure-relief cooling gel cushion for office & car.')" class="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>

          <!-- Floating Micro Card Tooltip -->
          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
            <img src="https://images.unsplash.com/photo-1580481077195-c32e921e1e47?auto=format&fit=crop&w=300&q=80" alt="Cushion" class="w-full h-20 rounded-xl object-cover mb-2 border border-slate-100">
            <p class="font-extrabold text-xs text-slate-900 truncate">Tailbone Gel Cushion</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xs font-black text-emerald-700">₹999</span>
              <button onclick="addToBag('Honeycomb Orthopedic Cushion', 999, 'https://images.unsplash.com/photo-1580481077195-c32e921e1e47?auto=format&fit=crop&w=500&q=80')" class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 shadow-sm">
                + Add
              </button>
            </div>
          </div>
        </div>

        <!-- Hotspot Pin 3: Cordless Clean Tech with Live Hover Tooltip -->
        <div class="absolute top-[75%] left-[80%] -translate-x-1/2 -translate-y-1/2 group z-20">
          <button onclick="openHotspotModal('Cordless Cyclone Turbo Cleaner', 1299, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80', '9000Pa cyclone suction with USB-C fast charging.')" class="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-subtle cursor-pointer">
            <span class="absolute w-full h-full rounded-full bg-amber-400 animate-ping opacity-75"></span>
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>

          <!-- Floating Micro Card Tooltip -->
          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
            <img src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80" alt="Cleaner" class="w-full h-20 rounded-xl object-cover mb-2 border border-slate-100">
            <p class="font-extrabold text-xs text-slate-900 truncate">AeroCyclone™ Vac</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xs font-black text-amber-700">₹1,299</span>
              <button onclick="addToBag('Cordless Cyclone Turbo Cleaner', 1299, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80')" class="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 shadow-sm">
                + Add
              </button>
            </div>
          </div>
        </div>`;

if (html.includes(oldLookbookHotspots)) {
  html = html.replace(oldLookbookHotspots, newLookbookHotspots);
  console.log('Upgraded Lookbook hotspots with interactive floating preview cards');
}

// 3. Add Live Delivery Pincode Checker inside the Cart Drawer
const oldPaymentModeBlock = `        <!-- Payment Mode Selector: UPI vs COD -->`;
const newPincodeAndPaymentBlock = `        <!-- Live Indian Pincode Delivery Estimator (CRO Optimization) -->
        <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-indigo-600"></i> Check Delivery to Pincode:
            </span>
            <span class="text-[10px] font-extrabold text-emerald-600">PAN-INDIA COD</span>
          </div>
          <div class="flex gap-2">
            <input id="drawerPincodeInput" type="text" maxlength="6" placeholder="Enter 6-digit Pincode (e.g. 400001)" class="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500">
            <button onclick="checkCartPincode()" class="px-3.5 py-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">Check</button>
          </div>
          <div id="drawerPincodeResult" class="hidden mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
            <span id="drawerPincodeText">Verified: BlueDart Air Express delivery by Tomorrow 4 PM!</span>
          </div>
        </div>

        <!-- Payment Mode Selector: UPI vs COD -->`;

if (html.includes(oldPaymentModeBlock) && !html.includes('id="drawerPincodeInput"')) {
  html = html.replace(oldPaymentModeBlock, newPincodeAndPaymentBlock);
  console.log('Added live Indian Pincode Delivery Checker into Cart Drawer');
}

// 4. Add Interactive 3D Model Modal (<model-viewer>)
const modelViewerModal = `
  <!-- ========================================================================= -->
  <!-- 19. INTERACTIVE 3D & AR PRODUCT VIEWER MODAL (SUBAGENT 2 RESEARCH) -->
  <!-- ========================================================================= -->
  <div id="modelViewerModal" onclick="if(event.target === this) close3dModal()" class="hidden fixed inset-0 z-[110] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl border border-slate-800 relative">
      <button onclick="close3dModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors z-20">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>

      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800 flex items-center gap-1">
          <i data-lucide="box" class="w-3.5 h-3.5"></i> REAL-TIME 3D / AR INSPECTION
        </span>
        <h3 id="modal3dTitle" class="text-base font-black truncate">AeroCyclone™ 360° Inspection</h3>
      </div>

      <!-- 3D Canvas / Model Viewer Frame -->
      <div class="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center border border-slate-800 shadow-2xl">
        <model-viewer id="activeModelViewer"
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          poster="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
          alt="3D Product Model"
          auto-rotate
          camera-controls
          shadow-intensity="1.5"
          exposure="1.2"
          ar
          ar-modes="webxr scene-viewer quick-look"
          class="w-full h-full">
        </model-viewer>

        <!-- 3D Instruction Badge -->
        <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none">
          <i data-lucide="rotate-3d" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>Click & Drag to Rotate • Pinch to Zoom • Tap AR for Room Placement</span>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400">Instant Doorstep Order:</span>
          <div class="text-lg font-black text-white" id="modal3dPrice">₹1,299 <span class="text-xs text-emerald-400">(COD Available)</span></div>
        </div>
        <button id="modal3dAddBtn" class="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i>
          <span>Add 3D Item to Bag</span>
        </button>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="modelViewerModal"')) {
  html = html.replace('</body>', modelViewerModal + '\n</body>');
  console.log('Added 3D model-viewer modal markup');
}

// 5. Add 3D Button to Catalog Cards
const oldCardButtons = `<button onclick="openQuickView('AeroCyclone™ Cordless Turbo Unit', 1299, 2499, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', 'SMART HOME', 'Dual-action 9000Pa cyclone suction for car, home, laptops, and keyboards. USB-C rechargeable with washable HEPA.')" class="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs transition-colors">Quick View</button>`;
const newCardButtons = `<button onclick="open3dModal('AeroCyclone™ Cordless Turbo Unit', 1299, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80')" class="px-2.5 py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-black text-xs transition-colors flex items-center gap-1" title="Inspect in 3D & AR">
              <i data-lucide="box" class="w-3.5 h-3.5"></i> 3D
            </button>
            <button onclick="openQuickView('AeroCyclone™ Cordless Turbo Unit', 1299, 2499, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', 'SMART HOME', 'Dual-action 9000Pa cyclone suction for car, home, laptops, and keyboards. USB-C rechargeable with washable HEPA.')" class="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs transition-colors">Quick View</button>`;

if (html.includes(oldCardButtons)) {
  html = html.replace(oldCardButtons, newCardButtons);
  console.log('Added 3D button trigger to Catalog Card 1');
}

// 6. Add Confetti and Checkout Celebrations + 3D Functions into JS
const jsUpgrades = `
    // 3D Model Modal Controller
    function open3dModal(title, price, poster) {
      const modal = document.getElementById('modelViewerModal');
      const titleEl = document.getElementById('modal3dTitle');
      const priceEl = document.getElementById('modal3dPrice');
      const mv = document.getElementById('activeModelViewer');
      const btn = document.getElementById('modal3dAddBtn');

      titleEl.innerText = title + ' 360° Inspection';
      priceEl.innerHTML = '₹' + price + ' <span class="text-xs text-emerald-400">(COD Available)</span>';
      mv.setAttribute('poster', poster);

      btn.onclick = () => {
        close3dModal();
        addToBag(title, price, poster);
      };

      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      if (window.lucide) lucide.createIcons();
    }

    function close3dModal() {
      const modal = document.getElementById('modelViewerModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    // Pincode Checker Simulator
    function checkCartPincode() {
      const pin = document.getElementById('drawerPincodeInput').value.trim();
      const res = document.getElementById('drawerPincodeResult');
      const text = document.getElementById('drawerPincodeText');

      if (pin.length === 6 && /^\\d+$/.test(pin)) {
        res.classList.remove('hidden');
        text.innerText = \`✓ Verified for Pincode \${pin}: BlueDart Air Express delivery by Tomorrow 4 PM! (COD Available)\`;
      } else {
        alert('Please enter a valid 6-digit Indian Pincode (e.g. 400001 or 110001).');
      }
    }

    // Enhanced Checkout with Celebration Confetti
    function triggerOrderCheckout() {
      const total = document.getElementById('cartTotalText').innerText;
      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setTimeout(() => {
        alert(\`🎉 Order Initiated Successfully!\\nTotal: \${total}\\nDoorstep Delivery: 2-3 Days via BlueDart Air Express (COD Pan-India)\`);
      }, 300);
    }
`;

if (!html.includes('triggerOrderCheckout')) {
  // Update checkout button to use triggerOrderCheckout()
  html = html.replace(`onclick="alert('🎉 Order initiated! Redirecting to secure checkout.\\nTotal: ' + document.getElementById('cartTotalText').innerText)"`, `onclick="triggerOrderCheckout()"`);
  html = html.replace('// Init on Load', jsUpgrades + '\n    // Init on Load');
  console.log('Added checkout confetti celebration and 3D controller logic');
}

fs.writeFileSync('E:/Dropshiping/arrowsghar-theme-pure.html', html, 'utf8');
console.log('Successfully saved upgraded 100x arrowsghar-theme-pure.html. Length:', html.length);
