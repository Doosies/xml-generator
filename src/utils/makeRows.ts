const makeRows = (json: any, ids: string[])=>{
  return json.map((data: {children: any}) => {
    const tmpData: {[idx:string]: string} = {};

    data.children.forEach((data: any) => {
      const nowId = data.attributes.id;
      if (ids.some(id => id === nowId)) {
        tmpData[nowId] = data.value.replaceAll('&#32;', ' ');
        if (nowId === 'CUST_NM') {
          tmpData[nowId] = tmpData[nowId].replace('(개인)', '').replace('(법인)', '');
        }
        if (nowId === 'MOPH_NO') {
          tmpData[nowId] = tmpData[nowId].replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        }
        if (nowId === 'ADR') {
          const fullAddress = tmpData[nowId].split(' ');
          // tmpData['ADR2'] = fullAddress[0];
          tmpData['ADR1'] = fullAddress[1];
          tmpData['ADR2'] = fullAddress[2];
          tmpData['ADR3'] = fullAddress.slice(3).join(" ");
        }
        delete tmpData['ADR'];
      }
    });
    return tmpData;
  });
}

  export default makeRows;