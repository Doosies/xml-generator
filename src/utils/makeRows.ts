const getOnlyAddress = (address: string) => {
  const regex = /(([가-힣A-Za-z·\d~\-\.]+((읍|[가-힣A-Za-z·\d~\-\.] 산|리|로|길|산)(\s|| {2}))([\d-]+)))/g;
  return address.match(regex);
}

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
          const fullAddress = tmpData[nowId].replace('번지',' ').split(' ');
          const sliceAddress = fullAddress.slice(3).join(" ");
          const onlyAddress = getOnlyAddress(sliceAddress);
          const searchAddress = [...new Set(onlyAddress)];
          
          tmpData['ADR1'] = fullAddress[1];
          tmpData['ADR2'] = fullAddress[2];
          tmpData['ADR3'] = searchAddress[0];
          tmpData['ADR4'] = searchAddress[1];
          tmpData['ADR5'] = sliceAddress?.replaceAll(searchAddress[0], '').replaceAll(searchAddress[1], '') as string;
        }
        delete tmpData['ADR'];
      }
    });
    return tmpData;
  });
}

  export default makeRows;