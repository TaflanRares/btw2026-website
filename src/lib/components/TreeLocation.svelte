<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import * as THREE from 'three';
	import { GLTFLoader, OrbitControls } from 'three-stdlib';

	let host: HTMLDivElement | undefined;
	let canvasEl: HTMLCanvasElement | undefined;
	let showPreview = $state(true);
	let previewFailed = $state(false);

	onMount(() => {
		if (!host || !canvasEl) {
			return;
		}

		const isTouchViewport =
			window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(max-width: 960px)').matches;

		const leavesVS = /* glsl */ `
			uniform sampler2D uNoiseMap;
			uniform vec3 uBoxMin, uBoxSize, uRaycast;
			uniform float uTime;
			varying vec3 vObjectPos, vNormal, vWorldNormal;
			varying float vCloseToGround;

			vec4 getTriplanar(sampler2D tex){
				vec4 xPixel = texture(tex, (vObjectPos.xy + uTime) / 3.);
				vec4 yPixel = texture(tex, (vObjectPos.yz + uTime) / 3.);
				vec4 zPixel = texture(tex, (vObjectPos.zx + uTime) / 3.);
				vec4 combined = (xPixel + yPixel + zPixel) / 6.0;
				combined.xyz = combined.xyz * vObjectPos;
				return combined;
			}

			void main(){
				mat4 mouseDisplace = mat4(1.);
				vec3 vWorldPos = vec3(modelMatrix * instanceMatrix * mouseDisplace * vec4(position, 1.));
				vCloseToGround = clamp(vWorldPos.y, 0., 1.);
				float offset = clamp(0.8 - distance(uRaycast, instanceMatrix[3].xyz), 0., 999.);
				offset = (pow(offset, 0.8) / 2.0) * vCloseToGround;
				mouseDisplace[3].xyz = vec3(offset);
				vNormal = normalMatrix * mat3(instanceMatrix) * mat3(mouseDisplace) * normalize(normal);
				vWorldNormal = vec3(modelMatrix * instanceMatrix * mouseDisplace * vec4(normal, 0.));
				vObjectPos = ((vWorldPos - uBoxMin) * 2.) / uBoxSize - vec3(1.0);
				vec4 noiseOffset = getTriplanar(uNoiseMap) * vCloseToGround;
				vec4 newPos = instanceMatrix * mouseDisplace * vec4(position, 1.);
				newPos.xyz = newPos.xyz + noiseOffset.xyz;
				gl_Position = projectionMatrix * modelViewMatrix * newPos;
			}
		`;

		const leavesFS = /* glsl */ `
			#include <common>
			#include <lights_pars_begin>
			uniform vec3 uColorA, uColorB, uColorC;
			varying vec3 vObjectPos, vNormal, vWorldNormal;
			varying float vCloseToGround;

			vec3 mix3 (vec3 v1, vec3 v2, vec3 v3, float fa){
				vec3 m;
				fa > 0.7 ? m = mix(v2, v3, (fa - .5) * 2.) : m = mix(v1, v2, fa * 2.);
				return m;
			}

			float getPosColors(){
				float p = 0.;
				p = smoothstep(0.2, 0.8, distance(vec3(0.), vObjectPos));
				p = p * (-(vWorldNormal.g / 2.) + 0.5) * (- vObjectPos.y / 9. + 0.5);
				return p;
			}

			float getDiffuse(){
				float intensity = 0.;
				for (int i = 0; i < directionalLights.length(); i++){
					intensity = dot(directionalLights[i].direction, vNormal);
					intensity = smoothstep(0.55, 1., intensity) * 0.2
						+ pow(smoothstep(0.55, 1., intensity), 0.5);
				}
				return intensity;
			}

			void main(){
				float gradMap = (getPosColors() + getDiffuse()) * vCloseToGround / 2.;
				vec4 c = vec4(mix3(uColorA, uColorB, uColorC, gradMap), 1.0);
				gl_FragColor = vec4(pow(c.xyz, vec3(0.454545)), c.w);
			}
		`;

		const scene = new THREE.Scene();
		const loader = new GLTFLoader();
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			alpha: true,
			antialias: !isTouchViewport,
			powerPreference: 'high-performance'
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouchViewport ? 1.2 : 1.5));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.toneMappingExposure = 1.24;

		const camera = new THREE.PerspectiveCamera(35, 1, 0.001, 1000);
		const controls = new OrbitControls(camera, renderer.domElement);
		const dummy = new THREE.Object3D();
		const matrix = new THREE.Matrix4();
		const pointer = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();
		const dlight01 = new THREE.DirectionalLight(0xcccccc, 2.05);
		const fillLight = new THREE.HemisphereLight(0xffe2b8, 0xb8834f, 0.62);
		const rayPlane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1));
		const treeOffset = new THREE.Vector3(-1.95, 0.6, 0);
		const cameraStart = new THREE.Vector3(-7.1, 1.6, -10.9);
		const cameraTarget = new THREE.Vector3(1.55, 3.05, 0);
		const pumpkinGroup = new THREE.Group();

		const noiseMap = new THREE.TextureLoader().load(
			'https://raw.githubusercontent.com/ceramicSoda/treeshader/main/assets/noise.png'
		);
		const tree = {
			group: new THREE.Group(),
			crown: undefined as THREE.Object3D | undefined,
			pole: undefined as THREE.Object3D | undefined,
			leaves: undefined as THREE.InstancedMesh | undefined,
			leavesCount: 0,
			deadID: [] as number[]
		};

		const leavesMat = new THREE.ShaderMaterial({
			lights: true,
			side: THREE.DoubleSide,
			uniforms: {
				...THREE.UniformsLib.lights,
				uTime: { value: 0 },
				uColorA: { value: new THREE.Color(0xb45252) },
				uColorB: { value: new THREE.Color(0xd3a068) },
				uColorC: { value: new THREE.Color(0xede19e) },
				uBoxMin: { value: new THREE.Vector3(0, 0, 0) },
				uBoxSize: { value: new THREE.Vector3(10, 10, 10) },
				uRaycast: { value: new THREE.Vector3(0, 0, 0) },
				uNoiseMap: { value: noiseMap }
			},
			vertexShader: leavesVS,
			fragmentShader: leavesFS
		});

		noiseMap.wrapS = THREE.RepeatWrapping;
		noiseMap.wrapT = THREE.RepeatWrapping;

		dlight01.position.set(3, 6, -3);
		dlight01.lookAt(cameraTarget);
		rayPlane.visible = false;
		camera.position.copy(cameraStart);
		controls.target.copy(cameraTarget);
		controls.minPolarAngle = Math.PI * 0.22;
		controls.maxPolarAngle = Math.PI * 0.68;
		controls.minAzimuthAngle = -2.75;
		controls.maxAzimuthAngle = -2.1;
		controls.minDistance = 10.8;
		controls.maxDistance = 12.6;
		controls.enableDamping = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.2;
		controls.rotateSpeed = 0.42;
		controls.zoomSpeed = 0.45;
		controls.enablePan = false;
		controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

		if (isTouchViewport) {
			camera.position.set(-7.35, 1.72, -11.35);
			controls.target.set(1.5, 2.95, 0);
			controls.enableRotate = false;
			controls.enableZoom = false;
			controls.enableDamping = false;
			controls.autoRotate = false;
		}
		tree.group.position.copy(treeOffset);
		scene.add(dlight01, fillLight, tree.group, pumpkinGroup, rayPlane);

		let frameId = 0;
		let killTimer: ReturnType<typeof setTimeout> | undefined;
		let disposed = false;

		function resize() {
			if (!host) return;
			const width = host.clientWidth;
			const height = host.clientHeight;
			if (!width || !height) return;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		}

		const observer = new ResizeObserver(resize);
		observer.observe(host);
		resize();

		function killRandom() {
			if (disposed) return;
			if (tree.leavesCount > 0 && Math.random() > 0.25) {
				tree.deadID.push(Math.floor(Math.random() * tree.leavesCount));
			}
			killTimer = setTimeout(killRandom, 3800 + Math.random() * 2000);
		}

		function createPumpkinStylizedMaterial(material: THREE.Material) {
			const stylizedMaterial = material.clone();

			stylizedMaterial.onBeforeCompile = (shader) => {
				shader.uniforms.uPumpkinShadeA = { value: new THREE.Color(0xbf4e18) };
				shader.uniforms.uPumpkinShadeB = { value: new THREE.Color(0xe27a2a) };
				shader.uniforms.uPumpkinShadeC = { value: new THREE.Color(0xffba58) };

				shader.fragmentShader = `
					uniform vec3 uPumpkinShadeA;
					uniform vec3 uPumpkinShadeB;
					uniform vec3 uPumpkinShadeC;
					vec3 boostSaturation(vec3 color, float amount) {
						float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
						return mix(vec3(luma), color, amount);
					}
				` + shader.fragmentShader;

				shader.fragmentShader = shader.fragmentShader.replace(
					'#include <output_fragment>',
					`
						float lightness = clamp(dot(outgoingLight, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
						float ramp = smoothstep(0.05, 0.95, pow(lightness, 0.78));
						vec3 stylizedWarm = mix(uPumpkinShadeA, uPumpkinShadeB, smoothstep(0.0, 0.62, ramp));
						stylizedWarm = mix(stylizedWarm, uPumpkinShadeC, smoothstep(0.5, 1.0, ramp));
						outgoingLight = mix(outgoingLight, stylizedWarm, 0.46);
						outgoingLight = boostSaturation(outgoingLight, 0.82);
						outgoingLight += vec3(0.03, 0.022, 0.0);
						#include <output_fragment>
					`
				);
			};

			stylizedMaterial.customProgramCacheKey = () => 'pumpkin-stylized-v1';
			return stylizedMaterial;
		}

		async function addPumpkins() {
			try {
				const pumpkinAsset = await loader.loadAsync(`${base}/objects/pumpkin-5f977e.glb`);
				if (disposed) {
					return;
				}

				const pumpkinSource = pumpkinAsset.scene;
				const sourceBox = new THREE.Box3().setFromObject(pumpkinSource);
				const sourceSize = sourceBox.getSize(new THREE.Vector3());
				const sourceHeight = Math.max(sourceSize.y, 0.001);
				const baseScale = 0.42 / sourceHeight;
				const baseCenter = new THREE.Vector3(treeOffset.x + 0.32, 0.52, treeOffset.z + 0.28);
				const pumpkinPlacements = [
					{ offset: [-0.92, 0.03, 0.62], scale: 0.92, rotationY: 0.35, rotationZ: -0.03 },
					{ offset: [1.1, 0.04, 0.26], scale: 1.05, rotationY: 2.4, rotationZ: 0.02 },
					{ offset: [0.24, 0.01, -0.9], scale: 0.84, rotationY: 4.65, rotationZ: -0.02 },
					{ offset: [-0.28, 0.05, 1.08], scale: 1.12, rotationY: 5.5, rotationZ: 0.04 }
				];

				for (const placement of pumpkinPlacements) {
					const pumpkin = pumpkinSource.clone(true);

					pumpkin.traverse((node) => {
						if (!(node instanceof THREE.Mesh)) {
							return;
						}

						if (Array.isArray(node.material)) {
							node.material = node.material.map((material) =>
								createPumpkinStylizedMaterial(material)
							);
						} else {
							node.material = createPumpkinStylizedMaterial(node.material);
						}
					});

					pumpkin.scale.setScalar(baseScale * placement.scale);
					pumpkin.position.set(
						baseCenter.x + placement.offset[0],
						baseCenter.y + placement.offset[1],
						baseCenter.z + placement.offset[2]
					);
					pumpkin.rotation.y = placement.rotationY;
					pumpkin.rotation.z = placement.rotationZ;

					pumpkinGroup.add(pumpkin);
				}
			} catch {
				// keep rendering tree.
			}
		}

		function pointerMove(e: MouseEvent) {
			if (!host) return;
			const rect = host.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			if (x < 0 || x > 1 || y < 0 || y > 1) return;
			pointer.set(x * 2 - 1, -(y * 2) + 1);
			raycaster.setFromCamera(pointer, camera);
			const targets: THREE.Object3D[] = [];
			if (tree.leaves) targets.push(tree.leaves);
			targets.push(rayPlane);
			const intersects = raycaster.intersectObjects(targets);
			if (!intersects[0]) return;
			rayPlane.position.copy(intersects[0].point);
			rayPlane.position.multiplyScalar(0.9);
			rayPlane.lookAt(camera.position);
			leavesMat.uniforms.uRaycast.value = intersects[0].point;
			if (
				typeof intersects[0].instanceId === 'number' &&
				Math.random() * 5 > 3 &&
				tree.leavesCount > 0
			) {
				tree.deadID.push(intersects[0].instanceId);
			}
		}

		host.addEventListener('mousemove', pointerMove);

		loader
			.loadAsync('https://raw.githubusercontent.com/ceramicSoda/treeshader/main/assets/tree.glb')
			.then((obj) => {
				if (disposed) return;
				showPreview = false;

				tree.pole = obj.scene.getObjectByName('Pole') ?? undefined;
				if (tree.pole && (tree.pole as THREE.Mesh).material) {
					const pole = tree.pole as THREE.Mesh;
					const sourceMaterial = pole.material as THREE.MeshStandardMaterial;
					pole.material = new THREE.MeshToonMaterial({ map: sourceMaterial.map ?? null });
				}

				tree.crown = obj.scene.getObjectByName('Leaves') ?? undefined;
				const leafMesh = obj.scene.getObjectByName('Leaf') as THREE.Mesh | null;
				if (!tree.crown || !leafMesh) return;

				const crownMesh = tree.crown as THREE.Mesh;
				const crownGeometry = crownMesh.geometry;
				const positionAttr = crownGeometry.attributes.position;
				const normalAttr = crownGeometry.attributes.normal;
				if (!positionAttr || !normalAttr) return;

				const bbox = new THREE.Box3().setFromObject(crownMesh);
				leavesMat.uniforms.uBoxMin.value.copy(bbox.min);
				leavesMat.uniforms.uBoxSize.value.copy(bbox.getSize(new THREE.Vector3()));

				tree.leavesCount = Math.ceil(positionAttr.count * 0.65);
				tree.deadID = [];
				tree.leaves = new THREE.InstancedMesh(leafMesh.geometry, leavesMat, tree.leavesCount);

				for (let leafIndex = 0; leafIndex < tree.leavesCount; leafIndex++) {
					const sourceIndex = Math.floor((leafIndex * positionAttr.count) / tree.leavesCount);
					dummy.position.set(
						positionAttr.array[sourceIndex * 3],
						positionAttr.array[sourceIndex * 3 + 1],
						positionAttr.array[sourceIndex * 3 + 2]
					);
					dummy.lookAt(
						dummy.position.x + normalAttr.array[sourceIndex * 3],
						dummy.position.y + normalAttr.array[sourceIndex * 3 + 1],
						dummy.position.z + normalAttr.array[sourceIndex * 3 + 2]
					);
					dummy.scale.setScalar(Math.random() * 0.2 + 0.8);
					dummy.updateMatrix();
					tree.leaves.setMatrixAt(leafIndex, dummy.matrix);
				}

				for (let i = 0; i < 8; i++) {
					tree.deadID.push(Math.floor(Math.random() * tree.leavesCount));
				}

				tree.group.add(...([tree.pole, tree.leaves].filter(Boolean) as THREE.Object3D[]));
				tree.group.position.copy(treeOffset);
				void addPumpkins();
				killRandom();
			})
			.catch(() => {
				previewFailed = true;
			});

		function animate() {
			frameId = requestAnimationFrame(animate);
			leavesMat.uniforms.uTime.value += 0.0025;

			if (tree.leaves && tree.deadID.length > 0) {
				tree.deadID = tree.deadID.filter((i) => {
					tree.leaves!.getMatrixAt(i, matrix);
					matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
					if (dummy.position.y <= 0) {
						return false;
					}
					dummy.position.y -= 0.04;
					dummy.position.x += Math.random() / 5 - 0.11;
					dummy.position.z += Math.random() / 5 - 0.11;
					dummy.rotation.x += 0.2;
					dummy.updateMatrix();
					tree.leaves!.setMatrixAt(i, dummy.matrix);
					return true;
				});
				tree.leaves.instanceMatrix.needsUpdate = true;
			}

			controls.update();
			renderer.render(scene, camera);
		}

		animate();

		return () => {
			disposed = true;
			if (killTimer) clearTimeout(killTimer);
			cancelAnimationFrame(frameId);
			observer.disconnect();
			host?.removeEventListener('mousemove', pointerMove);
			controls.dispose();
			renderer.dispose();
			noiseMap.dispose();
			leavesMat.dispose();
			scene.clear();
		};
	});
</script>

<div class="tree-card">
	<div bind:this={host} class="tree-host">
		<canvas bind:this={canvasEl} class="tree-canvas"></canvas>
	</div>
	{#if showPreview}
		<div class="tree-preview" class:tree-preview--failed={previewFailed}></div>
	{/if}
</div>

<style>
	.tree-card {
		position: relative;
		height: 100%;
		min-height: 100%;
		overflow: hidden;
		border-radius: 0;
		background: linear-gradient(180deg, #eed5b4 0%, #f0d8b9 20%, #f4dfc5 42%, #faebd7 68%);
	}

	.tree-host,
	.tree-preview,
	.tree-canvas {
		position: absolute;
		inset: 0;
	}

	.tree-canvas {
		display: block;
		width: 100%;
		height: 100%;
		touch-action: pan-y;
	}

	.tree-preview {
		background-image: url('https://raw.githubusercontent.com/ceramicSoda/treeshader/main/assets/preview.png');
		background-size: cover;
		background-position: center;
	}

	.tree-preview--failed {
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		.tree-card {
			height: 100%;
			min-height: 100%;
		}
	}
</style>
