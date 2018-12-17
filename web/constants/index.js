import { Calendar } from 'styled-icons/feather/Calendar.cjs'
import { Users } from 'styled-icons/feather/Users.cjs'

export const SITE_ROOT = 'http://localhost:3000';
export const API_ROOT = SITE_ROOT + '/api/v/1/'

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