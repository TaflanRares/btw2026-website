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
		path: 'M 70 690 C 200 560, 320 430, 430 310 S 650 120, 900 145',
		size: 26,
		start: 0,
		end: 0.92,
		rotation: 18
	},
	{
		id: 2,
		path: 'M 240 740 C 380 600, 500 455, 610 305 S 830 105, 1060 180',
		size: 24,
		start: 0,
		end: 0.94,
		rotation: -16
	},
	{
		id: 3,
		path: 'M 140 760 C 280 645, 420 505, 540 340 S 760 90, 990 150',
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

	const documentHeight = () =>
		Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 1);

	function recalcLayout() {
		startOffset = root.offsetTop;
		range = Math.max(documentHeight() - startOffset - window.innerHeight * 0.35, 1);
	}

	function updateLeaf(leaf: HTMLElement, index: number, currentScroll: number, totalRange: number) {
		const definition = leafDefinitions[index % leafDefinitions.length];
		const variant = Math.floor(index / leafDefinitions.length);
		const travelProgress = clamp(currentScroll / (totalRange * 1.3), 0, 1);
		const eased = clamp(
			definition.start + (definition.end - definition.start) * travelProgress + variant * 0.07,
			0,
			1
		);

		leaf.style.setProperty('opacity', String(eased > 0 && eased < 0.98 ? '1' : '0'));
		leaf.style.setProperty('offset-distance', `${eased * 100}%`);
		leaf.style.setProperty(
			'transform',
			`rotate(${definition.rotation + travelProgress * 260 + variant * 18}deg)`
		);
	}

	function update() {
		const currentScroll = clamp(
			window.scrollY - startOffset + window.innerHeight * 0.05,
			0,
			range * 1.3
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
