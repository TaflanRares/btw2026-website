import { base } from '$app/paths';

const withBase = (path: string) => `${base}${path}`;

export const navItems: Array<{ label: string; href: `/#${string}` }> = [
	{ label: 'Home', href: '/#home' },
	{ label: 'About', href: '/#about' },
	{ label: 'Schedule', href: '/#schedule' },
	{ label: 'Partners', href: '/#sponsors' },
	{ label: 'Organizers', href: '/#organizers' }
];

export const eventInfo = {
	name: 'BEST Training Week 2026',
	label: 'Autumn Edition',
	location: 'Brașov, Romania',
	dateLabel: '17–20 November 2026',
	countdownTarget: '2026-11-17T09:00:00+02:00',
	description:
		'A week-long educational event for and by students of Transilvania University. XX Trainers for 4 days.'
};

// training titles have to be distinct inside a session
export const scheduleDays = [
	{
		label: '17.11.2026',
		title: 'Day 1',
		summary: 'O scurta descriere a zilei',
		sessions: [
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu A',
				description: 'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: 'https://www.instagram.com/', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu B',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu C',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
			}
		]
	},
	{
		label: '18.11.2026',
		title: 'Day 2',
		summary: 'O scurta descriere a zilei',
		sessions: [
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu D',
				description: 'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer diferit',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu E',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer diferit',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu F',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer diferit',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
			}
		]
	},
	{
		label: '19.11.2026',
		title: 'Day 3',
		summary: 'O scurta descriere a zilei',
		sessions: [
			{
				date: '2026-11-19 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu G',
				description: 'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-19 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu H',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-19 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu I',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
			}
		]
	},
	{
		label: '20.11.2026',
		title: 'Day 4',
		summary: 'O scurta descriere a zilei',
		sessions: [
			{
				date: '2026-11-20 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu J',
				description: 'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-20 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu K',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-20 12:00 Europe/Bucharest',
				time: 'XX:XX',
				title: 'Titlu ETC',
				description:
					'Descriere',
				location: 'Locatie',
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
			}
		]
	},
];

export const sponsors = [
	{
		name: 'UniTBv',
		logo: withBase('/images/logos/Sponsor1-UniTBv.png'),
		alt: 'Transilvania University of Brașov logo'
	},
	{
		name: 'Sponsor2',
		logo: withBase('/images/logos/Sponsor2.png'),
		alt: 'Sponsor 2 logo'
	},
	{
		name: 'Sponsor3',
		logo: withBase('/images/logos/Sponsor3.png'),
		alt: 'Sponsor 3 logo'
	},
	{
		name: 'Sponsor4',
		logo: withBase('/images/logos/Sponsor4.png'),
		alt: 'Sponsor 4 logo'
	},
	{
		name: 'Sponsor5',
		logo: withBase('/images/logos/Sponsor5.png'),
		alt: 'Sponsor 5 logo'
	},
	{
		name: 'Sponsor6',
		logo: withBase('/images/logos/Sponsor6.png'),
		alt: 'Sponsor 6 logo'
	}
];

export const organizers = [
	{
		name: 'Bianca Nicoleta Crăciun',
		title: 'Main Organiser',
		photo: withBase('/images/BESTies/BiancaMO.webp')
	},
	{
		name: 'Dănuț Boloca',
		title: 'Fundraising Responsible',
		photo: withBase('/images/BESTies/DanutFR.webp')
	},
	{
		name: 'Florin Deicu',
		title: 'Public Relations Responsible',
		photo: withBase('/images/BESTies/FlorinPR.webp')
	},
	{
		name: 'Bianca Milea',
		title: 'Participants Experience Responsible',
		photo: withBase('/images/BESTies/BiancaPAX.webp')
	},
	{
		name: 'Miruna Ungureanu',
		title: 'Graphic Design Responsible',
		photo: withBase('/images/BESTies/MirunaGD.webp')
	},
	{
		name: 'Rareș Taflan',
		title: 'IT Responsible',
		photo: withBase('/images/BESTies/RaresIT.webp')
	},
	{
		name: 'Matei Voaideș',
		title: 'Logistics Responsible',
		photo: withBase('/images/BESTies/MateiLog.webp')
	}
];

export const socialLinks = [
	{ label: 'Instagram', url: 'https://www.instagram.com/bestbrasov/', kind: 'instagram' },
	{ label: 'Facebook', url: 'https://www.facebook.com/BESTBrasov', kind: 'facebook' },
	{ label: 'LinkedIn', url: 'https://www.linkedin.com/company/best-brasov/', kind: 'linkedin' },
	{ label: 'Tiktok', url: 'https://www.tiktok.com/@bestbrasov', kind: 'tiktok' },
	{ label: 'Email', url: 'mailto:bv-board@best-eu.org', kind: 'email' }
];
