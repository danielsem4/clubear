import assets from './assets.json';

const clubsList = [
    {
        id: 0,
        name: 'Atlanta',
        url: assets.Atlanta,
        city: 'Tel Aviv',
        onPrees: () => {console.log(clubsList[0].id)}
    },
    {
        id: 1,
        name: 'Port Elizabeth',
        url: assets.Port_Elizabeth,
        city: 'Rishon Lezion',
        onPrees: () => {console.log(this)}
    },
    {
        id: 2,
        name: 'Ku',
        url: assets.Ku,
        city: 'Tel Aviv',
        onPrees: () => {console.log(this)}
    },
    {
        id: 3,
        name: 'KuliAlma',
        url: assets.KuliAlma,
        city: 'Tel Aviv',
        onPrees: () => {console.log(this)}
    },
    {
        id: 4,
        name: 'Litzman',
        url: assets.Litzman,
        city: 'Tel Aviv',
        onPrees: () => {console.log(this)}
    },
    {
        id: 5,
        name: 'MSG',
        url: assets.MSG,
        city: 'Herzelia',
        onPrees: () => {console.log(this)}
    },
    {
        id: 6,
        name: 'MSG',
        url: assets.MSG,
        city: 'Herzelia',
        onPrees: () => {console.log(this)}
    },
    {
        id: 7,
        name: 'MSG',
        url: assets.MSG,
        city: 'Hod Hasharon',
        onPrees: () => {console.log(this)}
    },
]
export default clubsList