export function currencyFormatterD(num: any) {
   if (typeof num === 'string') {
      const convert = parseInt(num);
      return convert.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export function currencyFormatterNGN(num: any) {
   if (typeof num === 'string') {
      const convert = parseInt(num);
      return convert.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }