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
import { gaussianRandom, spiral } from './utils.js'; // Adjust the path if necessary


let canvas, renderer, camera, scene, orbit, baseComposer, bloomComposer, overlayComposer

// Declarações globais
let raycaster = new THREE.Raycaster();
raycaster.params.Sprite = { threshold: 0.1 };
let mouse = new THREE.Vector2();
let starGroup; // Declaração global de starGroup
let starsPositions = [];


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

function onClick(event) {
    const starInfo = document.getElementById('starInfo'); 
    const starCoordinates = document.getElementById('starCoordinates');

    starCoordinates.textContent = ``;

    starInfo.style.display = 'none';

    // Transformar as coordenadas do clique do mouse em coordenadas normalizadas do espaço de visualização (-1 a +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Atualizar o raycaster com a posição do mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcular objetos que intersectam o raio do clique do mouse
    const intersects = raycaster.intersectObjects(galaxy.starGroup.children, true);

    if (intersects.length > 0) {
        const intersectedStar = intersects[0].object;

        const starId = intersectedStar.id;
        const starPosition = intersectedStar.position;
        
        console.log(`Estrela clicada com ID: ${starId}, coordenadas: x=${starPosition.x}, y=${starPosition.y}, z=${starPosition.z}`);
                
        // Aqui você pode adicionar a lógica para mostrar as coordenadas em sua interface
        // Por exemplo, atualizar o texto em um elemento HTML com as coordenadas da estrela
    } else {
        // Convertendo a posição do mouse para coordenadas do espaço do mundo
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);

        // Verificar se a posição do clique está próxima de alguma estrela conhecida
        for (const position of starsPositions) {
            if (vector.distanceTo(position) < 20) {
                // Obter o elemento HTML do dropdown
                const starInfo = document.getElementById('starInfo');
                const starCoordinates = document.getElementById('starCoordinates');
        
                // Atualizar o conteúdo do dropdown
                starCoordinates.textContent = `Coordenadas: x=${position.x}, y=${position.y}, z=${position.z}`;
        
                // Converter a posição da estrela para coordenadas de tela
                const screenPosition = position.clone();
                screenPosition.project(camera);
        
                // Converter as coordenadas normalizadas (-1 a +1) para coordenadas do viewport
                const x = (screenPosition.x *  .5 + .5) * canvas.clientWidth;
                const y = (screenPosition.y * -.5 + .5) * canvas.clientHeight;
        
                // Posicionar e mostrar o dropdown
                starInfo.style.left = `${x}px`;
                starInfo.style.top = `${y}px`;
                starInfo.style.display = 'block';
        
                return;
            }
        }

        const starInfo = document.getElementById('starInfo');
        if (starInfo) {
            starInfo.style.display = 'none';
        }
        console.log("Nenhuma estrela foi clicada");
    }
}

function addStar(position) {
    let star = new Star(position);
    star.toThreeObject(starGroup); 
    starsPositions.push(position.clone()); 
    console.log(`Nova estrela criada na posição: x=${position.x}, y=${position.y}, z=${position.z}`);
}

function initThree() {

    // grab canvas
    canvas = document.querySelector('#canvas');

    // Inicializando a cena
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

    // Agora adicionamos o starGroup depois de a cena ter sido criada
    starGroup = new THREE.Group();
    scene.add(starGroup);



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
        // Generate a random position for each star
        let x = gaussianRandom(/* mean, stdev */);
        let y = gaussianRandom(/* mean, stdev */);
        let z = gaussianRandom(/* mean, stdev for the z-axis if different */);

        // Apply the spiral transformation to the position
        let position = spiral(x, y, z, /* offset, possibly based on i or other factors */);

        let star = new Star(position);
        star.toThreeObject(scene);
        console.log(`Star ID: ${star.id}, Position: x=${star.position.x}, y=${star.position.y}, z=${star.position.z}`);
    }

        fourInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (this.value.trim() === '') {
                alert('Por favor, insere um pequeno texto para o motivo de tal emoção.');
            } else {
                fourText.style.display = 'none';
                document.getElementById('introBackground').style.display = 'none';
    
                // Criar uma nova estrela em uma posição aleatória
                let randomPosition = new THREE.Vector3(
                    (Math.random() - 0.5) * 1000,
                    (Math.random() - 0.5) * 1000,
                    (Math.random() - 0.5) * 1000
                );
    
                addStar(randomPosition);
            }
        }
    }); 

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
window.addEventListener('click', onClick, false);
window.addEventListener('dblclick', onDoubleClick, false);
let axes = new THREE.AxesHelper(5.0)
scene.add(axes)

let galaxy = new Galaxy(scene)

requestAnimationFrame(render)
