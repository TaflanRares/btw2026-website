type LeafDefinition = {
	id: number;
	path: string;
	size: number;
	start: number;
	end: number;
	rotation: number;
};

const leafDefinitions: LeafDefinition[] = [
	{
		id: 1,
		path: 'M 70 760 C 200 660, 320 555, 430 450 S 650 305, 900 280',
		size: 26,
		start: 0,
		end: 0.92,
		rotation: 18
	},
	{
		id: 2,
		path: 'M 240 805 C 380 700, 500 575, 610 455 S 830 285, 1060 320',
		size: 24,
		start: 0,
		end: 0.94,
		rotation: -16
	},
	{
		id: 3,
		path: 'M 140 830 C 280 735, 420 610, 540 495 S 760 295, 990 300',
		size: 28,
		start: 0,
		end: 0.9,
		rotation: 12
	}
];

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function createLeafScene(root: HTMLElement, leafImageUrls: string[] = []) {
	const leaves = Array.from(root.querySelectorAll<HTMLElement>('[data-leaf-index]'));
	let startOffset = root.offsetTop;
	let range = 1;
	let frameRequested = false;
	let startDelayVh = 0.22;
	let travelWindow = 1.7;
	let travelScale = 0.82;
	let rotationTravel = 160;

	const documentHeight = () =>
		Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 1);

	function applyViewportTuning() {
		const isMobileViewport =
			window.matchMedia('(max-width: 768px)').matches ||
			window.matchMedia('(orientation: portrait) and (max-width: 960px)').matches;

		if (isMobileViewport) {
			startDelayVh = 0.34;
			travelWindow = 2.25;
			travelScale = 0.56;
			rotationTravel = 96;
			return;
		}

		startDelayVh = 0.22;
		travelWindow = 1.7;
		travelScale = 0.7;
		rotationTravel = 160;
	}

	function recalcLayout() {
		applyViewportTuning();
		startOffset = root.offsetTop;
		range = Math.max(documentHeight() - startOffset - window.innerHeight * 0.35, 1);
	}

	function updateLeaf(leaf: HTMLElement, index: number, currentScroll: number, totalRange: number) {
		const definition = leafDefinitions[index % leafDefinitions.length];
		const variant = Math.floor(index / leafDefinitions.length);
		const travelProgress = clamp(currentScroll / (totalRange * travelWindow), 0, 1);
		const eased = clamp(
			definition.start + (definition.end * travelScale - definition.start) * travelProgress + variant * 0.05,
			0,
			1
		);

		leaf.style.setProperty('opacity', '1');
		leaf.style.setProperty('offset-distance', `${eased * 100}%`);
		leaf.style.setProperty(
			'transform',
			`rotate(${definition.rotation + travelProgress * rotationTravel + variant * 12}deg)`
		);
	}

	function update() {
		const currentScroll = clamp(
			window.scrollY - startOffset - window.innerHeight * startDelayVh,
			0,
			range * travelWindow
		);
		leaves.forEach((leaf, index) => updateLeaf(leaf, index, currentScroll, range));
		frameRequested = false;
	}

	function scheduleUpdate() {
		if (frameRequested) {
			return;
		}
		frameRequested = true;
		requestAnimationFrame(update);
	}

	leaves.forEach((leaf, index) => {
		const definition = leafDefinitions[index % leafDefinitions.length];
		const variant = Math.floor(index / leafDefinitions.length);
		const leafImageUrl = leafImageUrls[index % Math.max(leafImageUrls.length, 1)];
		leaf.style.setProperty('offset-path', `path("${definition.path}")`);
		leaf.style.setProperty('offset-rotate', 'auto');
		leaf.style.setProperty('opacity', '1');
		if (leafImageUrl) {
			leaf.style.setProperty('background-image', `url("${leafImageUrl}")`);
		}
		const spriteScale = 3.2;
		leaf.style.setProperty('width', `${definition.size * (1 - variant * 0.12) * spriteScale}px`);
		leaf.style.setProperty(
			'height',
			`${definition.size * (1 - variant * 0.12) * 1.35 * spriteScale}px`
		);
	});

	recalcLayout();
	update();

	const onScroll = () => scheduleUpdate();
	const onResize = () => {
		recalcLayout();
		scheduleUpdate();
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize);

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onResize);
	};
}
