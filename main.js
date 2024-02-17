import * as THREE from 'three';

const xmlData = `
<mujoco>
    <worldbody>
        <geom type="cylinder" material="crib" size="0.02 0.4" pos="0 0 0" euler="90 0 0"/>
        <geom type="cylinder" material="crib" size="0.01 0.2" pos="0 0 -0.2" euler="0 0 0"/>
        <geom type="cylinder" material="crib" size="0.01 0.2" pos="0 -0.2 -0.2" euler="0 0 0"/>
        <geom type="cylinder" material="crib" size="0.01 0.2" pos="0 0.2 -0.2" euler="0 0 0"/>
        <geom type="cylinder" material="crib" size="0.01 0.2" pos="0 -0.4 -0.2" euler="0 0 0"/>
        <geom type="cylinder" material="crib" size="0.01 0.2" pos="0 0.4 -0.2" euler="0 0 0"/>
        <geom type="sphere" material="crib" size="0.022" pos="0 -0.4 0" euler="0 0 0"/>
        <geom type="sphere" material="crib" size="0.022" pos="0 0.4 0" euler="0 0 0"/>
    </worldbody>
</mujoco>
`;

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: ""
};

const parser = new fxp.XMLParser(options);
const data = parser.parse(xmlData);
const geoms = data.mujoco.worldbody.geom;
// console.log(data);
// console.log(geoms);

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(8, 0, 15);
camera.zoom = 2;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体并添加到场景中
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

geoms.forEach((geom, index) => {
    const type = geom.type;
    const size = geom.size.split(' ').map(Number);
    const pos = geom.pos.split(' ').map(Number);
    const euler = geom.euler.split(' ').map(Number);

    addGeom(type, size, pos, euler);
    console.log(type);
});

function addGeom(type, size, pos, euler) {
    let geometry, material, mesh;
    switch (type) {
        case "cylinder":
            geometry = new THREE.CylinderGeometry(10 * size[0], 10 * size[0], 10 * 2 * size[1], 32);
            break;
        case "sphere":
            geometry = new THREE.SphereGeometry(10 * size[0]);
            break;
        default:
            break;
    }
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(10 * pos[0], 10 * pos[1], 10 * pos[2]);
    mesh.rotation.set(euler[0], euler[1], euler[2]);
    scene.add(mesh);
}

function setScale(geo, size) {
    if (size.length == 3) {
        geo.scale.set(size[0], size[1], size[2]);
    } else if (size.length == 2) {
        geo.scale.set(size[0], size[1], 0);
    } else {
        geo.scale.set(size[0], size[0], size[0]);
    }
}

// function addGeoms(type,size,pos){
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
// }

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// 获取当前场景的所有物体
const objectsInScene = scene.children;

// 遍历所有物体
objectsInScene.forEach(object => {
    console.log(object); // 输出每个物体的信息
});