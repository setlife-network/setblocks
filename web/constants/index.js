import { Calendar } from 'styled-icons/feather/Calendar.cjs'
import { Users } from 'styled-icons/feather/Users.cjs'

export const SITE_ROOT = process.env.NODE_ENV == 'production' ? 'https://www.setblocks.com' : 'http://localhost:3000';
export const API_ROOT = SITE_ROOT + '/api/v/1/'

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const OAUTH_REDIRECT_URI = 'https://www.setblocks.com/api/github-oauth'

export const NAVIGATION = {
    items: [
        {
            text: 'Team',
            key: 'Team',
            route: '/team',
            icon: Users
        },
        {
            text: 'Schedule',
            key: 'Schedule',
            route: '/schedule',
            icon: Calendar
        }
    ]
}

export const DEFAULT_SETBLOCKS = [
    { blockTime: 'Setblock 1 (12am - 4am)', blockFraction: 0.0, description: '' },
    { blockTime: 'Setblock 2 (4:30am - 8:30am)', blockFraction: 0.0, description: '' },
    { blockTime: 'Setblock 3 (9am - 1pm)', blockFraction: 0.0, description: '' },
    { blockTime: 'Setblock 4 (1:30pm - 5:30pm)', blockFraction: 0.0, description: '' },
    { blockTime: 'Setblock 5 (6pm - 10pm)', blockFraction: 0.0, description: '' }
];

export const TEAM_NAME_ID_MAP = {
    'Oscar Lafarga': 'recGVSamjigJbZoJ8',
    'Quinn Pruitt': 'rec0akTPTocs76bQU',
    'David Lafarga': 'recaUadUZZ7qomfLM',
    'Victoria Lafarga': 'reczBZOIamQbd1Anq'
}

export const USER_PROPS = `
    id,
    name,
    weeklySetblocks {
      id,
      date,
      blockTime,
      blockFraction,
      description
    }
`