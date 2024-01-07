import * as THREE from 'three'

// Data and visualization
import { CompositionShader} from './shaders/CompositionShader.js'
import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, OVERLAY_LAYER } from "./config/renderConfig.js";

// Rendering
import { MapControls } from 'three/addons/controls/OrbitControls.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { Galaxy } from './objects/galaxy.js';
import { NUM_STARS } from './config/galaxyConfig.js';
import { Star } from './objects/star.js';



let canvas, renderer, camera, scene, orbit, baseComposer, bloomComposer, overlayComposer

let raycaster = new THREE.Raycaster();
raycaster.params.Sprite = { threshold: 0.1 }; // Ajuste a sensibilidade do raycaster
let mouse = new THREE.Vector2();

function onMouseMove(event) {
    // Calcular a posição do mouse em coordenadas normalizadas (-1 a +1) para ambos os eixos
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Atualizar o raycaster com a posição do mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcular objetos que intersectam o raio do raycaster
    let intersects = raycaster.intersectObjects(scene.children, true);
    console.log(`Intersected objects count: ${intersects.length}`);

    for (let i = 0; i < intersects.length; i++) {
        console.log(`Intersected object ${i}: `, intersects[i].object);
        if (intersects[i].object.isStar) {
            console.log('Uma estrela foi intersectada!');  // Log adicional
            alert('Estrela encontrada!');
            break;
        }
    }
}

window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('dblclick', onDoubleClick, false);

function onDoubleClick(event) {
    // Converter a posição do mouse para coordenadas normalizadas de -1 a +1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Atualizar o raycaster com a posição do mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcular a posição no espaço 3D onde o raio intersecta um plano imaginário
    // Você pode ajustar a posição e orientação deste plano conforme necessário
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, targetPoint);

    // Adicionar uma nova estrela nessa posição
    addStar(targetPoint);
}

function addStar(position) {
    let star = new Star(position);
    star.toThreeObject(scene);
    console.log(`Nova estrela criada na posição: x=${position.x}, y=${position.y}, z=${position.z}`);
}


function initThree() {

    // grab canvas
    canvas = document.querySelector('#canvas');

    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

    // camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000000 );
    camera.position.set(0, 500, 500);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // map orbit
    orbit = new MapControls(camera, canvas)
    orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbit.dampingFactor = 0.05;
    orbit.screenSpacePanning = false;
    orbit.minDistance = 1;
    orbit.maxDistance = 16384;
    orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360)

    initRenderPipeline()

    for (let i = 0; i < NUM_STARS; i++) {
        let x = 5;
        let y = 20;
        let z = 2;
    
        let star = new Star(new THREE.Vector3(x, y, z));
        star.toThreeObject(scene);
        console.log(`Star ${i} created at position: x=${x}, y=${y}, z=${z}`); // Log de diagnóstico

    }

}

function initRenderPipeline() {

    // Assign Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        logarithmicDepthBuffer: true,
    })
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5

    // General-use rendering pass for chaining
    const renderScene = new RenderPass( scene, camera )

    // Rendering pass for bloom
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
    bloomPass.strength = BLOOM_PARAMS.bloomStrength
    bloomPass.radius = BLOOM_PARAMS.bloomRadius

    // bloom composer
    bloomComposer = new EffectComposer(renderer)
    bloomComposer.renderToScreen = false
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

    // overlay composer
    overlayComposer = new EffectComposer(renderer)
    overlayComposer.renderToScreen = false
    overlayComposer.addPass(renderScene)

    // Shader pass to combine base layer, bloom, and overlay layers
    const finalPass = new ShaderPass(
        new THREE.ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture },
                overlayTexture: { value: overlayComposer.renderTarget2.texture }
            },
            vertexShader: CompositionShader.vertex,
            fragmentShader: CompositionShader.fragment,
            defines: {}
        } ), 'baseTexture'
    );
    finalPass.needsSwap = true;

    // base layer composer
    baseComposer = new EffectComposer( renderer )
    baseComposer.addPass( renderScene )
    baseComposer.addPass(finalPass)
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

async function render() {
    console.log("Rendering frame"); // Log de diagnóstico


    orbit.update()

    // fix buffer size
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // fix aspect ratio
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    galaxy.updateScale(camera)

    // Run each pass of the render pipeline
    renderPipeline()

    requestAnimationFrame(render)

}

function renderPipeline() {

    // Render bloom
    camera.layers.set(BLOOM_LAYER)
    bloomComposer.render()

    // Render overlays
    camera.layers.set(OVERLAY_LAYER)
    overlayComposer.render()

    // Render normal
    camera.layers.set(BASE_LAYER)
    baseComposer.render()

}

initThree()
let axes = new THREE.AxesHelper(5.0)
scene.add(axes)

let galaxy = new Galaxy(scene)

requestAnimationFrame(render)
