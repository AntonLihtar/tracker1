export const setBackgroundColor = (state) => {
    switch (state){
        case 'Продан':
            return '#fccdce'
        case 'Продается':
            return '#95f898'
        default :
            return  '#cff2fd'
    }
}