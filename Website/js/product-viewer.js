import { allProducts, serviceGroups } from './catalog.js';

let THREE;

function artwork(title, subtitle, background = '#172b43', accent = '#62e6ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(800, 120, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#101a2d';
  ctx.fillRect(0, 0, 1024, 44);
  ctx.fillStyle = '#eff7ff';
  ctx.font = '500 22px monospace';
  ctx.fillText('RIGHT ADS     /     MADE TO BE SEEN', 44, 29);
  ctx.font = '800 114px Arial, sans-serif';
  ctx.letterSpacing = '-8px';
  ctx.fillText(title, 56, 305);
  ctx.fillStyle = accent;
  ctx.font = '700 65px Arial, sans-serif';
  ctx.fillText(subtitle, 58, 385);
  ctx.fillStyle = '#c7d7eb';
  ctx.font = '500 20px monospace';
  ctx.fillText('DESIGN  /  PRINT  /  INSTALL', 60, 570);
  return new THREE.CanvasTexture(canvas);
}

function metal(materialColor = 0x525e52, roughness = 0.3, metalness = 0.82) {
  return new THREE.MeshStandardMaterial({ color: materialColor, roughness, metalness });
}

function box(parent, size, material, position = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function cylinderBetween(parent, start, end, radius, material, radialSegments = 16) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(b, a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), radialSegments), material);
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function makePanel(parent, width, height, texture, glow = false) {
  box(parent, [width + .13, height + .13, .12], metal(0x414c43, .25), [0, 0, 0]);
  const faceMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: .42,
    metalness: .08,
    emissive: glow ? new THREE.Color(0x62e6ff) : new THREE.Color(0x000000),
    emissiveMap: glow ? texture : null,
    emissiveIntensity: glow ? .4 : 0,
    side: THREE.DoubleSide
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(width, height), faceMaterial);
  face.position.z = .066;
  face.castShadow = true;
  parent.add(face);
}

function buildBlacklight(group) {
  const texture = artwork('MAKE IT', 'MATTER.', '#102842', '#62e6ff');
  makePanel(group, 2.18, 1.36, texture, true);
  const steel = metal(0x697466, .2, .9);
  cylinderBetween(group, [-.72, -.7, -.02], [-.85, -1.75, -.18], .045, steel);
  cylinderBetween(group, [.72, -.7, -.02], [.85, -1.75, -.18], .045, steel);
  cylinderBetween(group, [-.88, -1.72, -.18], [.88, -1.72, -.18], .04, steel);
  const glow = new THREE.PointLight(0x62e6ff, 8, 5);
  glow.position.set(0, .15, .45);
  group.add(glow);
}

function buildHoarding(group) {
  const texture = artwork('GO BIG', 'GET SEEN.', '#e8ca7a', '#e46747');
  makePanel(group, 2.65, 1.35, texture);
  const steel = metal(0x69756a, .24, .88);
  cylinderBetween(group, [-.9, -.7, -.08], [-1.1, -2.1, -.22], .07, steel);
  cylinderBetween(group, [0, -.7, -.08], [0, -2.1, -.22], .07, steel);
  cylinderBetween(group, [.9, -.7, -.08], [1.1, -2.1, -.22], .07, steel);
  cylinderBetween(group, [-1.13, -2.08, -.22], [1.13, -2.08, -.22], .055, steel);
  cylinderBetween(group, [-1.1, -.8, -.05], [1.1, -.8, -.05], .04, steel);
  const ground = new THREE.Mesh(new THREE.BoxGeometry(2.5, .06, .42), metal(0x333a34));
  ground.position.set(0, -2.12, -.1);
  group.add(ground);
}

function buildKeychain(group) {
  const brass = new THREE.MeshStandardMaterial({ color: 0xb8a46a, metalness: .84, roughness: .22 });
  const bodyMaterial = new THREE.MeshStandardMaterial({ map: artwork('RIGHT', 'ADS', '#263c31', '#d4f77c'), metalness: .2, roughness: .28 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.45, .9, .18), bodyMaterial);
  body.position.set(-.1, -.12, 0);
  body.rotation.z = -.12;
  body.castShadow = true;
  group.add(body);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.43, .075, 18, 60), brass);
  ring.position.set(.98, .55, -.01);
  ring.rotation.x = Math.PI / 2;
  ring.castShadow = true;
  group.add(ring);
  cylinderBetween(group, [.72, .26, 0], [.88, .4, 0], .1, brass, 20);
  const eye = new THREE.Mesh(new THREE.TorusGeometry(.17, .045, 12, 36), brass);
  eye.position.set(.58, .19, .11);
  eye.rotation.z = -.12;
  group.add(eye);
}

function buildAuto(group) {
  const body = new THREE.MeshStandardMaterial({ color: 0xe7c348, roughness: .4, metalness: .12 });
  const dark = metal(0x25312d, .42, .5);
  box(group, [1.45, .55, .78], body, [0, -.55, 0]);
  box(group, [.72, .55, .75], body, [.3, -.04, 0]);
  box(group, [.58, .38, .025], new THREE.MeshStandardMaterial({ color: 0x76b7b3, roughness: .12, metalness: .25 }), [.34, .04, .39]);
  box(group, [.44, .27, .02], new THREE.MeshStandardMaterial({ color: 0x222c27 }), [-.37, -.31, .402]);
  for (const x of [-.48, .48]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.26, .26, .13, 32), dark);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, -.88, .38);
    wheel.castShadow = true;
    group.add(wheel);
  }
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(.98, .24), new THREE.MeshBasicMaterial({ map: artwork('RIGHT ADS', 'ON THE MOVE', '#20362b', '#f2cb4e') }));
  sign.position.set(0, -.55, .394);
  group.add(sign);
}

function buildFlex(group) {
  const texture = artwork('MAKE IT', 'VISIBLE.', '#17334d', '#ffc857');
  makePanel(group, 2.35, 1.32, texture);
  const tube = metal(0x89938a, .24, .82);
  cylinderBetween(group, [-1.2, .73, .01], [1.2, .73, .01], .035, tube);
  cylinderBetween(group, [-1.2, -.73, .01], [1.2, -.73, .01], .035, tube);
}

function buildFluteBoard(group) {
  const texture = artwork('GOOD', 'IDEAS.', '#eee8d5', '#eb744b');
  makePanel(group, 2.05, 1.42, texture);
  const edge = metal(0xe0d4b2, .62, .08);
  for (let i = 0; i < 9; i++) {
    const rib = box(group, [.024, 1.42, .06], edge, [-1.02 + i * .255, 0, -.105]);
    rib.castShadow = false;
  }
}

function buildOneWay(group) {
  const frame = metal(0x55615a, .22, .75);
  const glass = new THREE.MeshStandardMaterial({ color: 0x5eaaa0, transparent: true, opacity: .56, roughness: .17, metalness: .15, side: THREE.DoubleSide });
  box(group, [2.2, 1.5, .055], glass);
  for (const x of [-1.12, 1.12]) box(group, [.07, 1.62, .1], frame, [x, 0, .02]);
  for (const y of [-.78, .78]) box(group, [2.28, .07, .1], frame, [0, y, .02]);
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(1.46, .62), new THREE.MeshBasicMaterial({ map: artwork('SEE OUT.', 'STAND OUT.', '#17433e', '#bfff50'), transparent: true }));
  sticker.position.set(0, .05, .04);
  group.add(sticker);
}

function buildWallSticker(group) {
  const wall = metal(0xb6b7a8, .76, .04);
  box(group, [2.65, 1.75, .12], wall);
  const mural = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshBasicMaterial({ map: artwork('MAKE', 'SPACE.', '#2b4638', '#df7756') }));
  mural.position.z = .067;
  group.add(mural);
  const dots = [ [-.8, -.42, 0.08], [.9, .52, 0.075], [.75, -.58, .06] ];
  dots.forEach(([x, y, radius], index) => {
    const sticker = new THREE.Mesh(new THREE.CircleGeometry(radius, 40), new THREE.MeshStandardMaterial({ color: index === 1 ? 0xffc857 : 0xf4f7ff, roughness: .35 }));
    sticker.position.set(x, y, .08);
    group.add(sticker);
  });
}

function buildIdCard(group) {
  const texture = artwork('RIGHT ADS', 'YOUR ID.', '#172b43', '#62e6ff');
  makePanel(group, .9, 1.25, texture);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.34, .035, 12, 48), metal(0x91a09a, .22, .84));
  ring.position.set(0, .87, 0);
  group.add(ring);
  cylinderBetween(group, [0, .62, .01], [0, .7, .01], .065, metal(0x91a09a));
}

function buildFile(group) {
  const cover = new THREE.MeshStandardMaterial({ color: 0x537b69, roughness: .48, metalness: .06 });
  box(group, [1.12, 1.48, .2], cover);
  box(group, [.18, 1.5, .23], metal(0xd0bb77, .48, .2), [-.48, 0, .02]);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(.78, .9), new THREE.MeshBasicMaterial({ map: artwork('RIGHT', 'ADS.', '#e5e1cc', '#e47a54') }));
  panel.position.set(.1, .04, .108);
  group.add(panel);
  const label = new THREE.Mesh(new THREE.BoxGeometry(.42, .12, .02), new THREE.MeshStandardMaterial({ color: 0xe9dfbc }));
  label.position.set(.2, -.54, .12);
  group.add(label);
}

function buildBookLabel(group) {
  const book = new THREE.MeshStandardMaterial({ color: 0xe0bd65, roughness: .56 });
  box(group, [1.05, 1.42, .25], book);
  box(group, [1.02, 1.37, .08], metal(0xe5dfc9, .65, .05), [0, 0, .14]);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(.7, .48), new THREE.MeshBasicMaterial({ map: artwork('MY BOOK', 'RIGHT ADS', '#1b3450', '#ffc857') }));
  panel.position.z = .185;
  group.add(panel);
}

function buildOffset(group) {
  const paper = new THREE.MeshStandardMaterial({ color: 0xece8db, roughness: .82 });
  for (let i = 0; i < 10; i++) box(group, [1.7, .035, 1.05], paper, [0, -.7 + i * .034, 0]);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.05), new THREE.MeshBasicMaterial({ map: artwork('PRINT', 'IN COLOUR.', '#214b3b', '#ed754d') }));
  top.rotation.x = -Math.PI / 2;
  top.position.y = -.33;
  group.add(top);
}

function buildBrochure(group) {
  const left = new THREE.Mesh(new THREE.BoxGeometry(.95, 1.42, .07), new THREE.MeshStandardMaterial({ map: artwork('RIGHT', 'ADS', '#17334d', '#62e6ff'), roughness: .46 }));
  left.position.set(-.48, 0, 0);
  left.rotation.y = -.14;
  group.add(left);
  const right = new THREE.Mesh(new THREE.BoxGeometry(.95, 1.42, .05), new THREE.MeshStandardMaterial({ map: artwork('PRINT', 'STUDIO', '#f0e8d2', '#e66e4d'), roughness: .5 }));
  right.position.set(.48, 0, -.02);
  right.rotation.y = .14;
  group.add(right);
}

function buildPamphlet(group) {
  makePanel(group, 1.5, 1.9, artwork('A BIG', 'IDEA.', '#cf674c', '#f1d278'));
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(.7, 1.9), new THREE.MeshBasicMaterial({ color: 0xf1ead8, side: THREE.DoubleSide }));
  sheet.position.set(.38, 0, .08);
  sheet.rotation.y = -.07;
  group.add(sheet);
}

function buildCalendar(group) {
  const page = new THREE.MeshStandardMaterial({ map: artwork('RIGHT ADS', '2026', '#ece5d3', '#e87b53'), roughness: .56 });
  box(group, [1.25, 1.05, .055], page, [0, .32, 0]);
  const stand = metal(0x53685b, .32, .58);
  cylinderBetween(group, [-.56, -.28, -.03], [-.72, -1.05, -.32], .035, stand);
  cylinderBetween(group, [.56, -.28, -.03], [.72, -1.05, -.32], .035, stand);
  cylinderBetween(group, [-.72, -1.05, -.32], [.72, -1.05, -.32], .035, stand);
  const rings = metal(0xb4a16c, .24, .86);
  for (let i = 0; i < 6; i++) cylinderBetween(group, [-.48 + i * .19, .88, .03], [-.48 + i * .19, .7, .03], .025, rings, 12);
}

function buildBillBook(group) {
  const cover = new THREE.MeshStandardMaterial({ map: artwork('RIGHT ADS', 'BILL BOOK', '#344d3d', '#e4c46b'), roughness: .5 });
  box(group, [1.4, 1.12, .1], cover);
  const pages = new THREE.MeshStandardMaterial({ color: 0xe8e4d7, roughness: .78 });
  for (let i = 0; i < 8; i++) box(group, [1.36, 1.08, .018], pages, [0, 0, -.07 - i * .02]);
  box(group, [.05, 1.13, .12], metal(0xd8bd69, .58, .1), [-.65, 0, .01]);
}

const modelBuilders = {
  blacklight: buildBlacklight, hoarding: buildHoarding, auto: buildAuto,
  flex: buildFlex, flute: buildFluteBoard, oneway: buildOneWay, wall: buildWallSticker,
  id: buildIdCard, file: buildFile, label: buildBookLabel, offset: buildOffset,
  brochure: buildBrochure, pamphlet: buildPamphlet, calendar: buildCalendar,
  keychain: buildKeychain, billbook: buildBillBook
};

export async function mountProductViewer(root) {
  if (!root) return;
  const loading = root.querySelector('.viewer-loading');
  const fallback = root.querySelector('.viewer-fallback');
  const infoName = document.querySelector('#product-name');
  const infoDesc = document.querySelector('#product-desc');
  const infoNumber = document.querySelector('#product-number');
  const picker = document.querySelector('#product-select');
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0c1629');
    scene.fog = new THREE.Fog('#0c1629', 6, 13);
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, .1, 5.8);
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    root.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xdaf3ff, 0x19243b, 2.1));
    const key = new THREE.DirectionalLight(0xffe2ad, 3.3);
    key.position.set(-3, 5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.PointLight(0x62e6ff, 16, 9);
    rim.position.set(3, 1.4, -1.8);
    scene.add(rim);
    const amberFill = new THREE.PointLight(0xffb94d, 9, 8);
    amberFill.position.set(-3, -1, 3);
    scene.add(amberFill);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshStandardMaterial({ color: 0x111a2d, roughness: .82, metalness: .1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.19;
    ground.receiveShadow = true;
    scene.add(ground);
    const grid = new THREE.GridHelper(20, 32, 0x28617a, 0x1a3049);
    grid.position.y = -2.17;
    scene.add(grid);

    const product = new THREE.Group();
    scene.add(product);
    let activeProduct = picker.value || 'blacklight';
    let targetX = -.08;
    let targetY = -.24;
    let rotationX = targetX;
    let rotationY = targetY;
    let scale = 1;
    let targetScale = 1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function updateProductLabels(language) {
      const selected = allProducts.find(item => item.id === activeProduct);
      if (!selected) return;
      const selectedIndex = allProducts.findIndex(item => item.id === activeProduct);
      infoName.textContent = selected.name[language];
      infoDesc.textContent = selected.desc[language];
      infoNumber.textContent = String(selectedIndex + 1).padStart(2, '0');
      picker.value = activeProduct;
    }

    function populatePicker(language) {
      const selected = activeProduct;
      picker.replaceChildren();
      serviceGroups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.name[language];
        group.products.forEach(item => {
          const option = document.createElement('option');
          option.value = item.id;
          option.textContent = item.name[language];
          optgroup.append(option);
        });
        picker.append(optgroup);
      });
      picker.value = selected;
    }

    function selectProduct(kind) {
      const selected = allProducts.find(item => item.id === kind);
      if (!selected) return;
      activeProduct = kind;
      while (product.children.length) {
        const item = product.children[0];
        product.remove(item);
        item.traverse?.(node => {
          node.geometry?.dispose?.();
          if (Array.isArray(node.material)) node.material.forEach(material => { material.map?.dispose?.(); material.dispose?.(); });
          else { node.material?.map?.dispose?.(); node.material?.dispose?.(); }
        });
      }
      modelBuilders[selected.model]?.(product);
      const fitScale = ['keychain', 'id', 'label'].includes(selected.model) ? .9 : 1;
      product.scale.setScalar(fitScale);
      updateProductLabels(document.documentElement.lang || 'en');
    }
    populatePicker(document.documentElement.lang || 'en');
    picker.addEventListener('change', () => selectProduct(picker.value));
    document.addEventListener('rightads:language-change', event => {
      const language = event.detail?.language || 'en';
      populatePicker(language);
      updateProductLabels(language);
    });
    selectProduct(activeProduct);

    const resize = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(root);
    resize();

    renderer.domElement.addEventListener('pointerdown', event => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    });
    renderer.domElement.addEventListener('pointermove', event => {
      if (!dragging) return;
      targetY += (event.clientX - lastX) * .008;
      targetX += (event.clientY - lastY) * .006;
      targetX = Math.max(-.65, Math.min(.65, targetX));
      lastX = event.clientX;
      lastY = event.clientY;
    });
    const release = () => { dragging = false; };
    renderer.domElement.addEventListener('pointerup', release);
    renderer.domElement.addEventListener('pointercancel', release);
    renderer.domElement.addEventListener('wheel', event => {
      event.preventDefault();
      targetScale = Math.max(.72, Math.min(1.48, targetScale - event.deltaY * .001));
    }, { passive: false });
    renderer.domElement.addEventListener('dblclick', () => { targetX = -.08; targetY = -.24; targetScale = 1; });

    let frame = 0;
    function animate() {
      frame = requestAnimationFrame(animate);
      if (!dragging) targetY += .0013;
      rotationX += (targetX - rotationX) * .08;
      rotationY += (targetY - rotationY) * .08;
      scale += (targetScale - scale) * .08;
      product.rotation.x = rotationX;
      product.rotation.y = rotationY;
      const activeModel = allProducts.find(item => item.id === activeProduct)?.model;
      const fitScale = ['keychain', 'id', 'label'].includes(activeModel) ? .9 : 1;
      product.scale.setScalar(scale * fitScale);
      renderer.render(scene, camera);
    }
    animate();
    loading?.classList.add('hidden');
    fallback?.classList.add('hidden');
    return () => { cancelAnimationFrame(frame); renderer.dispose(); };
  } catch (error) {
    console.warn('3D preview unavailable; showing the product fallback.', error);
    loading?.classList.add('hidden');
  }
}
