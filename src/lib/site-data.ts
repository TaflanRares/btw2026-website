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
	dateLabel: '17–21 November 2026',
	countdownTarget: '2026-11-17T14:00:00+02:00',
	description:
		'A week-long educational event for and by students of Transilvania University. Join us for 12 training sessions over 5 days.'
};

export const zborHubLocation = {
	venue: 'Zbor Hub Brașov',
	street: 'Str. Mureșenilor nr. 27',
	mapUrl: 'https://maps.app.goo.gl/cqhtJJs9WPe4frdj6'
};

// training titles have to be distinct inside a session
export const scheduleDays = [
	{
		label: '17.11.2026',
		title: 'Day 1',
		location: zborHubLocation,
		summary: 'Starting off on tuesday with 3 amazing trainings, and a lot of fun!',
		sessions: [
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: '14:00-16:00',
				title: 'Preh',
				description: 'A hands-on workshop about automotive electronic systems architecture. gain practical insights into hardware development, as well as the roles of Hardware Architect and Hardware Developer!',
				location: zborHubLocation,
				trainer: 'Barbu Adrian',
				trainerSocial: { url: 'https://ro.linkedin.com/in/adrian-barbu-77b595213', label: 'Trainer LinkedIn' },
				trainerPhoto: withBase('/images/trainers/PrehTrain.jpg')	
			},
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: '16:00-18:00',
				title: 'LEADERS Foundation ',
				description: 'You will discover how to improve the management of your physical and mental energy so that you can achieve your goals and face specific challenges.',
				sessionLogo: withBase('/images/logos/LeadersFoundation.png'),
			},
			{
				date: '2026-11-17 12:00 Europe/Bucharest',
				time: '18:00-20:00',
				title: 'Radio Campus Transilvania',
				description: 'An interactive training session about using your voice to communicate effectively, discover how to convey clear, powerful, and memorable ideas.',
				location: zborHubLocation,
				trainer: 'Constantinescu Sebastian',
				trainerSocial: { url: 'https://ro.linkedin.com/in/constantinescu-sebi-b76493278', label: 'Trainer LinkedIn' },
				trainerPhoto: withBase('/images/trainers/RCTTrain.jpg')
			}
		]
	},
	{
		label: '18.11.2026',
		title: 'Day 2',
		location: zborHubLocation,
		summary: 'Discover how to take advantage of the job market, better manage your time, build your personal brand.',
		sessions: [
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: '14:00-16:00',
				title: 'BCR - Career School',
				description: 'In this interactive workshop, you will explore career options tailored to your interests, learn about essential skills for the job market, and receive practical tips for creating an attractive CV and acing your job interviews!',
				location: zborHubLocation,
				trainer: 'Andrada Ascate',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: '16:00-18:00',
				title: 'Essential Time Management',
				description: 'Have you ever felt like you have run out of time? That important things get left to the last minute or cant even be finished on time? Whether your answer is yes or no, join us for a discussion on time management and prioritization.',
				location: zborHubLocation,
				trainer: 'Ștefan Dima',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-18 12:00 Europe/Bucharest',
				time: '18:00-20:00',
				title: 'Personal Branding Strategy',
				description: 'Social media isn\'t just about scrolling and posting. It can be the place where you build your personal brand, share your passion, and create opportunities.',
				trainers: [
					{
						name: 'Claudia Stoica',
						social: {
							url: 'https://www.linkedin.com/search/results/people/?keywords=Claudia%20Stoica',
							label: 'Claudia Stoica LinkedIn search'
						},
						photo:
							'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
					},
					{
						name: 'Patricia Dorobanțu',
						social: {
							url: 'https://www.linkedin.com/search/results/people/?keywords=Patricia%20Dorobantu',
							label: 'Patricia Dorobanțu LinkedIn search'
						},
						photo:
							'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
					}
				]
			}
		]
	},
	{
		label: '19.11.2026',
		title: 'Day 3',
		location: zborHubLocation,
		summary: 'Learn to build your professional profile and use both hard and soft skillls to your advantage.',
		sessions: [
			{
				date: '2026-11-19 12:00 Europe/Bucharest',
				time: '16:00-18:00',
				title: 'Personal Branding for Students',
				description: 'How do recruiters see you? How do you highlight your potential when you\'re at the beginning of your journey? Join a practical workshop where you learn to transform your university projects and volunteer work into an attractive professional profile.',
				location: zborHubLocation,
				trainer: 'Amalia Popescu',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-19 12:00 Europe/Bucharest',
				time: '18:00-20:00',
				title: 'Nuclearelectrica - Career in the Nuclear Industry',
				description: 'What skills do you need to develop and how do you build a successful career in one of the most complex and innovative industries? In this interactive workshop, you will explore the technical expertise (hard skills), interpersonal abilities (soft skills), and professional mindset essential for an environment driven by safety, performance, and responsibility',
				location: zborHubLocation,
				trainer: 'Raluca Andreea Nedelcu',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto: withBase('/images/trainers/AndreeaNedelcu.png')
			}
		]
	},
	{
		label: '20.11.2026',
		title: 'Day 4',
		location: zborHubLocation,
		summary: 'Take the next step in both financial and leadership skills.',
		sessions: [
			{
				date: '2026-11-20 12:00 Europe/Bucharest',
				time: '14:00-15:00',
				title: 'BCR - Your Financial Health Starts Today',
				description: 'A practical training session designed to help you manage your money better, make smart financial decisions, and stay safe from online fraud.',
				location: zborHubLocation,
				trainer: 'Andrada Ascate',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
			},
			{
				date: '2026-11-20 12:00 Europe/Bucharest',
				time: '16:00-18:00',
				title: 'InnoEduLab',
				description: 'In this interactive leadership workshop, we skip the cheesy motivational quotes and overcomplicated theories for two hours of practical exercises and honest conversations.',
				location: zborHubLocation,
				trainer: 'Nume Trainer',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
			}
		]
	},
	{
		label: '21.11.2026',
		title: 'Day 5',
		location: zborHubLocation,
		summary: 'On the last day, learn to manage conflicts and start your journey towards fighting for what you believe in.',
		sessions: [
			{
				date: '2026-11-21 12:00 Europe/Bucharest',
				time: '14:00-16:00',
				title: 'Conflict: How do we turn it from an argument into a dialogue?',
				description: 'Because misunderstandings are inevitable, the focus isn\'t on avoiding them, but on how we react. We will explore practical de-escalation techniques and win-win strategies to turn difficult conversations from exhausting confrontations into real opportunities for collaboration.',
				location: zborHubLocation,
				trainer: 'Rareș Soltuz',
				trainerSocial: { url: '', label: 'Trainer social media' },
				trainerPhoto: ''
			},
			{
				date: '2026-11-21 12:00 Europe/Bucharest',
				time: '16:00-18:00',
				title: 'How a simple idea can turn the world around',
				description: 'This interactive workshop will immerse you in the power of advocacy. Learn the principles, develop your strategic thinking and turn your desire for change into an actual campaign!',
				location: zborHubLocation,
				trainer: 'Ana Florea',
				trainerSocial: { url: 'https://linktr.ee/zborhub.brasov', label: 'Zbor Hub Brasov linktree' },
				trainerPhoto: withBase('/images/logos/Sponsor4-zbor.jpg')
			}
		]
	}
];

export const sponsors = [
	{
		name: 'Universitatea Transilvania din Brașov',
		logo: withBase('/images/logos/Sponsor1-UniTBv.png'),
		alt: 'Transilvania University of Brașov logo'
	},
	{
		name: 'Banca Centrală Română',
		logo: withBase('/images/logos/Sponsor2-BCR.webp'),
		alt: 'Banca Centrală Română logo'
	},
	{
		name: 'Institutul de Cercetare-Dezvoltare al Universității Transilvania din Brașov',
		logo: withBase('/images/logos/Sponsor3-ICDT.webp'),
		alt: 'Institutul de Cercetare-Dezvoltare al Universității Transilvania din Brașov logo'
	},
	{
		name: 'Zbor Hub',
		logo: withBase('/images/logos/Sponsor4-zbor.jpg'),
		alt: 'Zbor Hub logo'
	},
	{
		name: 'Bubble Waffles',
		logo: withBase('/images/logos/Sponsor5-BubbleWaffles.jpg'),
		alt: 'Bubble Waffles logo'
	},
	{
		name: 'Un Trancio e Via',
		logo: withBase('/images/logos/Sponsor6-UnTrancioeVia.webp'),
		alt: 'Un Trancio e Via logo'
	},
	{
		name: 'Captain Bean',
		logo: withBase('/images/logos/Sponsor7-CaptainBean.webp'),
		alt: 'Captain Bean logo'
	}
];

export const organizers = [
	{
		name: 'Bianca Nicoleta Crăciun',
		title: 'Main Organiser',
		email: 'bianca.nicoleta.craciun@BEST-eu.org',
		photo: withBase('/images/BESTies/BiancaMO.webp')
	},
	{
		name: 'Dimitrie Tabacaru',
		title: 'President',
		email: 'bv-board@BEST-eu.org',
		photo: withBase('/images/BESTies/DimitriePresedinte.jpg')
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
