import * as THREE from 'three';

// ----- 주제: ex05. 애니메이션 requestAnimationFrame(), setAnimationLoop()
// setAnimationLoop은 VR쓸때 씀

// const clock = new THREE.clock() // 경과된 시간을 갖고 있다.
// const time = clock.getElapsedTime()

export default function example() {

	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha:true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// devicePixelRatio > 픽셀 고해상도로 표현할 때 사용,
	// 픽셀과 같은 1:1 해상도면 그대로 사용, 아니면 두배로 해상도 높이기
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.setClearAlpha(1);
	// renderer.setClearColor(0x00ff00);
	// renderer.setClearColor('#00ff00');
	// renderer.setClearAlpha(0.5);


	// Scene => 랜더러 위에 씬이 있기 때문에, 씬에 색을 넣으면 랜더러의 색이 의미가 없어진다.
	const scene = new THREE.Scene();
	// scene.background = new THREE.Color('blue');

	// Camera
	// Perspective Camera(원근 카메라)
	const camera = new THREE.PerspectiveCamera(
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	// camera.position.x = 1;
	// camera.position.x = 2;
	camera.position.y = 2;
	camera.position.z = 5;
	scene.add(camera);
	
	// 04 조명
	const light = new THREE.DirectionalLight(0xffffff, 1); // 숫자 => 빛 세기
	light.position.x = 1;
	light.position.z = 2;
	scene.add(light);
	// light.position.z = 2;

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const material = new THREE.MeshStandardMaterial({ 
	// const material = new THREE.MeshBasicMaterial({  // MeshBasicMaterial => 빛에 반응안함
		// color: 0xff0000
		// color: '#ff0000'
		color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);


	const clock = new THREE.clock() // 경과된 시간을 갖고 있다.
	function draw(){
		// console.log(clock.getElapsedTime())
		const time = clock.getElapsedTime()

		// 각도는 Radian을 사용
		// 360도는 2파이
		// mesh.rotation.y += 0.1;
		// mesh.rotation.y += THREE.MathUtils.degToRad(1);
		mesh.rotation.y = 2 * time;
		mesh.position.y += 0.01;
		if (mesh.position.y > 3) {
			mesh.position.y = 0;
		}

		renderer.render(scene, camera);

		// window.requestAnimationFrame(draw);
		renderer.setAnimationLoop(draw);
	}draw();


	//
	function setSize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
	window.addEventListener('resize', setSize);
}