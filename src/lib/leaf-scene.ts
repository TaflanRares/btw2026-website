type LeafDefinition = {
	id: number;
	path: string;
	size: number;
	color: string;
	start: number;
	end: number;
	rotation: number;
};

const leafDefinitions: LeafDefinition[] = [
	{
		id: 1,
		path: 'M 50 680 C 140 540, 230 420, 310 320 S 520 120, 820 120',
		size: 28,
		color: '#d97706',
		start: 0,
		end: 0.92,
		rotation: 18
	},
	{
		id: 2,
		path: 'M 220 720 C 360 560, 460 430, 530 270 S 760 80, 1010 170',
		size: 24,
		color: '#b45309',
		start: 0,
		end: 0.94,
		rotation: -16
	},
	{
		id: 3,
		path: 'M 110 740 C 220 610, 320 500, 390 340 S 590 90, 880 140',
		size: 26,
		color: '#f59e0b',
		start: 0,
		end: 0.9,
		rotation: 12
	},
	{
		id: 4,
		path: 'M 400 760 C 520 630, 620 470, 720 280 S 900 80, 1080 220',
		size: 20,
		color: '#f97316',
		start: 0,
		end: 0.86,
		rotation: -22
	},
	{
		id: 5,
		path: 'M 60 620 C 190 500, 300 360, 420 260 S 660 110, 930 180',
		size: 30,
		color: '#ea580c',
		start: 0,
		end: 0.94,
		rotation: 22
	},
	{
		id: 6,
		path: 'M 180 710 C 310 610, 390 480, 500 330 S 700 100, 980 120',
		size: 18,
		color: '#c2410c',
		start: 0,
		end: 0.84,
		rotation: -12
	},
	{
		id: 7,
		path: 'M 260 760 C 420 640, 560 470, 660 300 S 910 80, 1140 210',
		size: 24,
		color: '#fbbf24',
		start: 0,
		end: 0.88,
		rotation: 16
	},
	{
		id: 8,
		path: 'M 130 640 C 250 520, 360 390, 470 260 S 760 90, 1020 160',
		size: 22,
		color: '#dc2626',
		start: 0,
		end: 0.86,
		rotation: -28
	}
];

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function createLeafScene(root: HTMLElement) {
	const leaves = Array.from(root.querySelectorAll<HTMLElement>('[data-leaf-index]'));
	const documentHeight = () =>
		Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 1);

	function updateLeaf(leaf: HTMLElement, index: number) {
		const definition = leafDefinitions[index % leafDefinitions.length];
		const startOffset = root.offsetTop;
		const range = Math.max(documentHeight() - startOffset - window.innerHeight * 0.35, 1);
		const currentScroll = clamp(
			window.scrollY - startOffset + window.innerHeight * 0.05,
			0,
			range * 1.3
		);
		const travelProgress = clamp(currentScroll / (range * 1.3), 0, 1);
		const eased = definition.start + (definition.end - definition.start) * travelProgress;

		leaf.style.setProperty('opacity', String(eased > 0 && eased < 0.98 ? '1' : '0'));
		leaf.style.setProperty('offset-distance', `${eased * 100}%`);
		leaf.style.setProperty('transform', `rotate(${definition.rotation + travelProgress * 260}deg)`);
		leaf.style.setProperty('width', `${definition.size}px`);
		leaf.style.setProperty('height', `${definition.size * 1.35}px`);
	}

	function update() {
		leaves.forEach((leaf, index) => updateLeaf(leaf, index));
	}

	leaves.forEach((leaf, index) => {
		const definition = leafDefinitions[index % leafDefinitions.length];
		leaf.style.setProperty('offset-path', `path("${definition.path}")`);
		leaf.style.setProperty('offset-rotate', 'auto');
		leaf.style.setProperty(
			'background',
			`linear-gradient(135deg, ${definition.color}, rgba(255,255,255,0.8))`
		);
		leaf.style.setProperty('opacity', '1');
	});

	update();

	const onScroll = () => requestAnimationFrame(update);
	const onResize = () => requestAnimationFrame(update);

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize);

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onResize);
	};
}
