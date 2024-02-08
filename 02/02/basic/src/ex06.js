import * as THREE from 'three';

// ----- 주제: 애니메이션 성능 보정
// clock.getElapsedTime() == 점차 늘어나는 값. 실행 시점으로부터 총 경과시간
// clock.getDelta() == 시간간격 값(일정한 값). 마지막으로 이 메소드가 호출된 이후의 시간(초 단위)
// 위의 둘을 같이 쓰면 안된다. 값이 꼬이는지 뭔가 이상하게 동작한다 !!

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 5;
	scene.add(camera);

	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.x = 1;
	light.position.z = 2;
	scene.add(light);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	const clock = new THREE.Clock();
	// console.log(Date.now())

	function draw() {
		// clock.getElapsedTime() == 점차 늘어나는 값. 실행 시점으로부터 총 경과시간
		// clock.getDelta() == 시간간격 값(일정한 값). 마지막으로 이 메소드가 호출된 이후의 시간(초 단위)
		// 위의 둘을 같이 쓰면 안된다. 값이 꼬이는지 뭔가 이상하게 동작한다 !!
		const delta = clock.getDelta();


		// 각도는 Radian을 사용
		// 360도는 2파이
		// mesh.rotation.y += 0.1;
		// mesh.rotation.y += THREE.MathUtils.degToRad(1);
		mesh.rotation.y += 2 * delta;
		mesh.position.y += 3 * delta;
		if (mesh.position.y > 3) {
			mesh.position.y = 0;
		}
		renderer.render(scene, camera);

		// window.requestAnimationFrame(draw);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
