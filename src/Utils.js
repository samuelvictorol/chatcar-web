
const Utils = {
    toBRLFixedStr: (input, fallback = '')=> {
      if (input === null || input === undefined) return fallback;
      const s = String(input).trim();
      if (s === '') return fallback;
    
      // separa inteiro e decimal
      let [intRaw, decRaw = '00'] = s.split('.');
    
      // trata sinal e mantém só dígitos
      const sign = intRaw.startsWith('-') ? '-' : '';
      const intDigits = intRaw.replace('-', '').replace(/\D/g, '');
      const decDigits = decRaw.replace(/\D/g, '').padEnd(2, '0').slice(0, 2);
    
      // milhares com ponto
      const intBR = (intDigits || '0').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
      return `${sign}${intBR},${decDigits}`;
    }

}

export { Utils }