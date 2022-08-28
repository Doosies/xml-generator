import { TTableColumns, TTableData } from "../components/Table";

  const makeRows = (json: any, ids: string[])=>{
    const r: TTableData[] = [];
    const datas = json.map((data: {children: any}) => {
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
            tmpData['ADR2'] = fullAddress[0];
            tmpData['ADR3'] = fullAddress[1];
            tmpData['ADR4'] = fullAddress[2];
            tmpData['ADR5'] = fullAddress.slice(3).join(" ");
          }
        }
      });
      return tmpData;
    });
    
    datas.forEach( (data:any, idx: number) => {
      const colums: TTableColumns[] = [
        {key:`CUST_NM${data["ORD_NO"]}`, render: data["CUST_NM"]},
        {key:`MOPH_NO${data["ORD_NO"]}`, render: data["MOPH_NO"]},
        {key:`ADR${data["ORD_NO"]}`, render: data["ADR"]},
        {key:`PRDT_NM${data["ORD_NO"]}`, render: data["PRDT_NM"]}
      ];
      r.push({id: `${data["ORD_NO"]}${idx}`, columns: colums});
    });
    return r;
  }

  export default makeRows;