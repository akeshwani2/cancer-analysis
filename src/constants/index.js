import { records, screening, user, apps } from "../assets";



export const navLinks = [
    {
        name: 'dashboard',
        imageUrl: apps,
        link: '/'
    },
    {
        name: 'screening',
        imageUrl: screening,
        link: '/screening-schedules'
    },
    {
        name: 'profile',
        imageUrl: user,
        link: '/profile'
    }
]