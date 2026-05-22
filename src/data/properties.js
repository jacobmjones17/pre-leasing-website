import heroImage from '../../images/Render.png';
import frontImage from '../../images/Front.png';
import kitchenImage from '../../images/Kitchen Render.png';
import bathroomImage from '../../images/Bathroom Render.png';
import floorPlanImage from '../../images/floor plan.png';

/** @typedef {'available' | 'leased' | 'coming-soon'} PropertyStatus */

/**
 * Central property registry — edit this file to update availability,
 * add new locations, or change details across the site.
 *
 * status:
 *   'available'    — units open for lease
 *   'leased'       — fully occupied
 *   'coming-soon'  — under construction, pre-leasing open
 */
export const properties = [
    {
        id: 'pilot-station-place',
        slug: 'pilot-station-place',
        name: 'Pilot Station Place',
        tagline: 'Fully leased — tenants moved in',
        address: '100–106 Pilot Station Drive, Goldsboro, NC 27534',
        city: 'Goldsboro, NC',
        status: 'leased',
        totalUnits: 8,
        availableUnits: 0,
        unitType: '2 bed / 2 bath duplex',
        sqft: 900,
        startingRent: 1400,
        earlyBirdRent: null,
        yearBuilt: 2025,
        expectedCompletion: null,
        mapQuery: '35.288056,-77.895',
        heroImage,
        description:
            'All 8 duplex homes at Pilot Station Place are leased and occupied. Tenants moved in after a successful pre-leasing period. Join the waitlist if you would like to be contacted when a unit becomes available.',
        features: [
            'Large covered front porch',
            'Private exterior storage room',
            'Energy-efficient construction',
        ],
        photos: [
            {
                title: 'Front exterior',
                description: 'Street view of the duplex homes.',
                src: frontImage,
                alt: 'Front exterior of Pilot Station Place duplex homes',
                fit: 'cover',
            },
            {
                title: 'Kitchen and living area',
                description: 'Open kitchen and living space with modern finishes.',
                src: kitchenImage,
                alt: 'Interior view of the kitchen and living area',
                fit: 'cover',
            },
            {
                title: 'Bathroom finishes',
                description: 'Bathroom with modern fixtures and clean finishes.',
                src: bathroomImage,
                alt: 'Interior bathroom finishes',
                fit: 'cover',
            },
            {
                title: 'Floor plan',
                description: '2 bed / 2 bath layout for each duplex home.',
                src: floorPlanImage,
                alt: 'Floor plan of the 2 bed 2 bath duplex home',
                fit: 'cover',
            },
        ],
        nearby: [
            {
                label: 'Seymour Johnson Air Force Base',
                detail: 'Convenient commute via US-70 and local connectors.',
            },
            {
                label: 'Shopping & dining',
                detail: 'Close to Berkeley Blvd retailers, groceries, and restaurants.',
            },
            {
                label: 'Schools & everyday services',
                detail: 'Area schools, medical offices, and daily conveniences within a short drive.',
            },
        ],
    },
    {
        id: 'pilot-station-phase-ii',
        slug: 'pilot-station-phase-ii',
        name: 'Pilot Station Phase II',
        tagline: '12 new homes — coming October 2026',
        address: 'Goldsboro, NC — exact address coming soon',
        city: 'Goldsboro, NC',
        status: 'coming-soon',
        totalUnits: 12,
        availableUnits: 12,
        unitType: '2 bed / 2 bath duplex',
        sqft: 900,
        startingRent: 1400,
        earlyBirdRent: null,
        yearBuilt: null,
        expectedCompletion: 'October 2026',
        mapQuery: '35.288056,-77.895',
        heroImage,
        description:
            'We are building six brand-new duplex buildings — 12 homes total — to the same standards as Pilot Station Place. Construction is underway with an expected completion of October 2026. Join the pre-leasing list now for early access before move-in.',
        features: [
            'Same 2 bed / 2 bath floor plan',
            'Modern finishes throughout',
            'Energy-efficient new construction',
        ],
        photos: [
            {
                title: 'Coming soon',
                description: 'Renderings and photos will be posted as construction progresses.',
                src: heroImage,
                alt: 'Pilot Station Phase II coming soon',
                fit: 'cover',
            },
        ],
        nearby: [
            {
                label: 'Seymour Johnson Air Force Base',
                detail: 'Convenient commute via US-70 and local connectors.',
            },
            {
                label: 'Shopping & dining',
                detail: 'Close to Berkeley Blvd retailers, groceries, and restaurants.',
            },
            {
                label: 'Near Pilot Station Place',
                detail: 'Same area and build quality as our first Goldsboro community.',
            },
        ],
    },
];

export const company = {
    name: 'FJPB Holdings',
    location: 'Goldsboro, NC',
    phone: '252-521-7965',
    phoneHref: 'tel:12525217965',
    email: 'Fjpbholdings.ben@gmail.com',
};

export function getPropertyBySlug(slug, list = properties) {
    return list.find((p) => p.slug === slug) ?? null;
}

export function getStatusLabel(property) {
    if (property.status === 'available') {
        const count = property.availableUnits;
        return count === 1 ? '1 unit available' : `${count} units available`;
    }
    if (property.status === 'leased') return 'Fully leased';
    if (property.status === 'coming-soon') {
        return property.expectedCompletion
            ? `Coming ${property.expectedCompletion}`
            : 'Coming soon';
    }
    return '';
}

export function acceptsInterest(property) {
    return property.status === 'available' || property.status === 'coming-soon';
}
